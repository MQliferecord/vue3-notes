import { debounce } from "@/utils/utils";
import {Ref,onMounted,SetupContext} from 'vue';

/**
* @scrollTop 表示已经向上滑动隐藏的距离
* @clientHeight 表示当前视图的距离
* @scrollHeight 表示每页15条数据加载出来后总的高度
* 一旦srollTop+clientHeight>=scrollHeight，就说明已经拉到了底部
* 需要再次发送分页请求，page++，获得下一页数据
* 这里将请求emit出去
*/
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
