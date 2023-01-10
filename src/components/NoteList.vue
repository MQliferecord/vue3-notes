<template>
    <div class="list-box" ref="refListBox">
        <div 
        class="list-left"
        ref="leftDom"
        @click="onClickItem"
        >
            <!--左边列表-->
            <div class="list-item" v-for="item in leftList" :key="item.id">
                <div class="item-content">
                    <p class="item-text">
                        {{item.content}}
                    </p>
                </div>
                <div class="item-bottom">
                    <p>
                        {{item.dates}}
                    </p>
                </div>
                <div class="click-model" :id="item.id"></div>
            </div>
        </div>
        <div 
        class="list-right"
        ref="rightDom"
        @click="onClickItem"
        >
            <!--右边列表-->
            <div class="list-item" v-for="item in rightList" :key="item.id">
                <div class="item-content">
                    <p class="item-text">
                        {{item.content}}
                    </p>
                </div>
                <div class="item-bottom">
                    <p>
                        {{item.dates}}
                    </p>
                </div>
                <div class="click-model" :id="item.id"></div>
            </div>
        </div>
        <!--初次渲染获取高度-->
        <div class="init-list">
            <div 
            class="list-item"
            :ref="(el)=>{if(el!=null) items.push(el)}"
            v-for="item in notes"
            :key="item.id"
            >
                <div class="item-content">
                    <p class="item-text">
                        {{item.content}}
                    </p>
                </div>
                <div class="item-bottom">
                    <p>
                        {{item.dates}}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent,nextTick,onBeforeUpdate,onMounted,onUnmounted,PropType,reactive,ref,toRef,watch,toRefs } from 'vue';
import * as Typing from "../store/typings/index";
import useLoadMore from "../hooks/useLoadMore";
import useLongTouch from "../hooks/useLongTouch";

export default defineComponent({
    name:"NoteList",
    props:{
        notes:{
            type:Array as PropType<Typing.Note[]>
        }
    },
    setup (props,context) {
        const items = ref<null | HTMLElement[]>([]);
        const refListBox = ref<null|HTMLElement>(null);
        useLoadMore(refListBox,context)
        const noteListState:Typing.noteListState = {
            leftList:[],
            rightList:[]
        }
        const notes = toRef(props,'notes');
        console.log(notes)
        const state = reactive(noteListState);
        console.log(state)
        const initList = ()=>{
            let leftHeightSum = 0;
            let rightHeightSum = 0;
            let leftArr:any[] = [];
            let rightArr:any[] = [];
            nextTick(()=>{
                items.value!.forEach((item:any,index)=>{
                    if(leftHeightSum<=rightHeightSum){
                        leftArr.push(props.notes![index])
                        leftHeightSum += item?.clientHeight;
                    }else{
                        rightArr.push(props.notes![index]);
                        rightHeightSum += item?.clientHeight;
                    }
                })
                state.leftList = leftArr.reverse();
                state.rightList = rightArr.reverse();
            })
        }
        const onClickItem = (e:any)=>{
            if(e.target.className == "click-model"){
                console.log(e.target.id)
                context.emit("ToAddNote",e.target.id as number);
            }
        }
        const leftDom = ref<null|HTMLElement>(null);
        const rightDom = ref<null|HTMLElement>(null);
        useLongTouch([leftDom,rightDom],(id:number)=>{
            context.emit("longTouch",id)
        })
        onMounted(()=>{
            initList();
        })
        onUnmounted(()=>{
            items.value = []
        })
        onBeforeUpdate(()=>{
      // 更新前要清空ref的数组
            items.value = []; 
        })
        watch(props!,()=>{
            notes.value = props.notes!;
            console.log("watch")
            initList();
        })
        return {
            ...toRefs(state),
            items,
            refListBox,
            leftDom,
            rightDom,
            notes,
            onClickItem
        }
    }
})
</script>

<style lang="scss" scoped>
.flip-list-move {
  transition: transform 0.8s ease;
}
.flip-list {
  width: 100%;
}
    .list-box{
        width:100%;
        height:100%;
        overflow:auto;
        &::-webkit-scrollbar{
            display: none;
        }
        &::-webkit-scrollbar-thumb{
            background-color: rgba(0,0,0,0.2);
            border-radius: 6px;
        }
        &::-webkit-scrollbar-track{
            background-color: #eee;
            border-radius: 6px;
        }
        .list-left{
            width:50%;
            float:left;
            padding-bottom:50px;
            padding-left:5px;
        }
        .list-right{
            width:50%;
            float:left;
            display:flex;
            flex-flow:column wrap;
            align-items:flex-end;
            padding-bottom:50px;
            padding-left:5px;
        }
        .init-list{
            width:50%;
            background-color: rgb(122,129,127);
            position:absolute;
            visibility:hidden;
            height:2rem;
            overflow:hidden;
        }
        .list-item{
            box-sizing: border-box;
            width:95%;
            max-height:2rem;
            background-color: rgb(245,245,245);
            border-radius:0.15rem;
            margin-top:0.1rem;
            padding:0.2rem;
            position:relative;
            box-shadow: 2px 2px 9px #ccc;
            .item-content{
                max-height:1.25rem;
                font-size:0.16rem;
                line-height:0.25rem;
                overflow:hidden;
                display:-webkit-box; 
                -webkit-box-orient: vertical;
                -webkit-line-clamp:5;
                color:rgb(99,99,99);
                .item-text:first-line{
                    color:rgb(27,27,27);
                    font-weight:600;
                }
            }
            .item-bottom{
                height:0.35rem;
                color:rgb(151,151,151);
                display:flex;
                align-items:flex-end;
            }
            .click-model{
                position:absolute;
                top:0;
                right:0;
                bottom:0;
                left:0;
                -webkit-touch-callout:none;
                -webkit-user-select:none;
                -khtml-user-select:none;
                -moz-user-select:none;
                -ms-user-select:none;
                user-select:none;
            }
        }
    }
</style>