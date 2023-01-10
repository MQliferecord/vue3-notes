import { debounce } from "@/utils/utils";
import {Ref,onMounted,SetupContext} from 'vue';

let useLoadMore = function(element:Ref<null|HTMLElement>,ctx:SetupContext<Record<string,any>>){
    function loadMore(){
        let containerHeight = element.value?.clientHeight;
        let scrollTop = element.value?.scrollTop;
        let scrollHeight = element.value?.scrollHeight;
        if(containerHeight!+scrollTop!+20>=scrollHeight!){
            ctx.emit('loadMore')
        }
    }
    onMounted(()=>{
        element.value?.addEventListener('scroll',debounce(loadMore,1000));
    })
}

export default useLoadMore