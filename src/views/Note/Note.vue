<template>
    <div class="note-box">
        <van-search
        v-model="searchValue"
        placeholder="搜索便签"
        input-align="center"
        @change="handleSearch"
        />
        <note-list
        :notes="notes"
        @ToAddNote="onClickItem"
        @longTouch="longTouch"
        @loadMore="loadMore"
        ></note-list>
        <van-popup v-model:show="show" position="bottom" :style="{height:'10%'}">
            <div class="delete-box" @click="handleDel">
                删除
            </div>
        </van-popup>
        <div class="loading-box">
            <van-loading size="24px" v-show="isLoading" vertical>加载中</van-loading>
        </div>
        <van-button
        round
        icon="plus"
        class="button"
        type="primary"
        @click="onClickAdd"
        ></van-button>
    </div>
</template>

<script lang="ts">
import {GlobalState} from "../../store/index"
import { defineComponent, reactive, ref, toRefs, watch } from 'vue'
import NoteList from '../../components/NoteList.vue'
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'
import useNoteState from "../../hooks/useNoteState"
import * as Types from "../../store/action-types"
import {throttle} from "../../utils/utils"

export default defineComponent({
    name:"Note",
    components: { NoteList },
    setup (props,context) {
        let store = useStore<GlobalState>();
        let {notes,isLoading,getNotesByPage,deleteNote,searchNoteByContent} = useNoteState(store);
        let router = useRouter()
        const show = ref(false);
        const state = reactive({
            searchValue:"",
            page:1,
            size:15,
            delId:1
        })
        if(store.state.note.notes.length === 0){
            getNotesByPage({
                page:state.page,
                size:state.size
            })
        }
        const onClickAdd=()=>{
            router.push({ path:"/addNote" })
        }
        const onClickItem=(id:number)=>{
            router.push({ path:"/addNote",query:{id}})
        }
        const longTouch = async(id:number)=>{
            show.value = true;
            state.delId = id;
        }
        const handleDel = async()=>{
            await deleteNote(state.delId);
            show.value = false;
        }
        const loadMore = async()=>{
            store.commit(`note/${Types.SET_LOADIBG}`,true);
            state.page++;
            getNotesByPage({
                page:state.page,
                size:state.size
            })
            store.commit(`note/${Types.SET_LOADIBG}`,false);
        }
        const handleSearch = async()=>{
            if(!state.searchValue.trim()){
                getNotesByPage({
                    page:1,
                    size:15
                })
            }else{
                await searchNoteByContent(state.searchValue)
            }
        }
        let handleMutilSearch = throttle(handleSearch,3000)
        watch(
            ()=>state.searchValue,
            handleMutilSearch
        )
        return {
            show,
            notes,
            isLoading,
            ...toRefs(state),
            onClickAdd,
            onClickItem,
            longTouch,
            handleDel,
            loadMore,
            handleSearch,
        }
    }
})
</script>

<style lang="scss" scoped>
.note-box {
  width: 100%;
  overflow: hidden;
  flex: 1;
  padding:0 0.1rem;
  box-sizing: border-box;
  .van-search {
    padding: 0;
    ::v-deep .van-search__content {
      background-color: rgb(237, 237, 237);
      border-radius: 0.15rem;
    }
    background-color: rgb(247, 247, 247);
  }
  .delete-box{
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #1989fa;
    font-size: 0.23rem;
  }
  .button {
    position: fixed;
    bottom: 0.2rem;
    right: 0.2rem;
  }
  .van-button {
    width: 0.44rem;
    height: 0.44rem;
  }
  .loading-box{
    width: 100%;
    height: 30px;
    position: fixed;
    bottom: 0rem;
  }
}
</style>