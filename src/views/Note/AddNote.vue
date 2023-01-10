<template>
  <div class="add-note-box">
    <van-nav-bar left-arrow @click-left="onClickLeft">
      <template #right>
        <van-icon name="success" size="18" />
      </template>
    </van-nav-bar>
    <van-field
      class="field"
      v-model="note.content"
      rows="1"
      autosize
      type="textarea"
      placeholder="请输入内容"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import useNoteStore from "../../hooks/useNoteState";
import { GlobalState } from "../../store/index";
import { toRefs } from "vue";
import { Result, Note } from "../../store/typings";
import * as NoteAPI from "../../Api/notes";

export default defineComponent({
  name: "AddNote",
  setup() {
    let store = useStore<GlobalState>();
    let { addNote, deleteNote, updateNote } = useNoteStore(store);
    const router = useRouter();
    const route = useRoute();
    const date = new Date();

    const state = reactive({
      note: {
        content:"",
        dates: "",
      },
      id:0,
      oldContent:"",
    });
    const getNoteReposit = () => {
      console.log("getnotereposit")
      const notes = store.state.note.notes;
      const id_ = route.query.id;
      if (typeof id_ === "string") {
        const id = parseInt(id_);
        console.log(id);
        if (id===0) return;
        notes.forEach((item) => {
          console.log(111)
          if (item.id === id) {
            state.note.content = item.content;
            state.oldContent = item.content;
            state.id = id;
          }
        });
        console.log(state.note.content)
        if (!state.note.content) {
          NoteAPI.getNoteById<Result<Note[]>>(id).then((data) => {
            console.log(222)
            console.log(data.data[0].id)
            state.note.content = data.data[0].content;
            state.oldContent = data.data[0].content;
            state.id = data.data[0].id!;
            console.log(state)
          });
        }
      }else{
        console.log("正在创建新的notes")
      }
    };
    const onClickLeft = async () => {
      console.log(state)
      console.log(state.note.content)
      if (state.note.content==undefined||state.note.content=="") {
        if (state.id!==0) {
          console.log(state.id)
          console.log("delete")
          await deleteNote(state.id);
        }
        router.go(-1);
        return;
      }
      state.note.dates = `${date.getFullYear()}年${
        date.getMonth() + 1
      }月${date.getDate()}日`;
    if (state.id!==0) {
        console.log("update")
        if (state.oldContent !== state.note.content) {
          console.log(state.note)
          await updateNote({
            id: state.id,
            note: state.note,
          });
        }
      } else {
        console.log("addnote")
        console.log(state.note)
        await addNote(state.note);
      }
      router.go(-1);
    };
    onMounted(() => {
      getNoteReposit();
    });
    return {
      onClickLeft,
      ...toRefs(state),
    };
  },
});
</script>

<style lang="scss" scoped>
.add-note-box {
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  flex: 1;
  background-color: #fff;
}
.field {
  font-size: 0.22rem;
}
</style>