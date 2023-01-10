import {onMounted,onUnmounted,Ref} from 'vue'

export default function(arr:Ref<null|HTMLElement>[],callbacks:Function){
    let timer:any = null;
    let isMoving = false;
    const touchStart = (e:any)=>{
        console.log('start')
        let id = e.targetTouches[0].target.id;
        timer = setTimeout(()=>{
            if(!isMoving){
                callbacks(id);
            }
        },1000)
    }
    const touchEnd = (e:any)=>{
        clearTimeout(timer);
        isMoving = false;
    }
    const touchMove = ()=>{
        isMoving = false;
    }
    onMounted(()=>{
        arr.forEach((item)=>{
            item.value?.addEventListener('touchstart',touchStart);
            item.value?.addEventListener('touchend',touchEnd);
            item.value?.addEventListener('touchmove',touchMove);
        })
    })
    onUnmounted(()=>{
        arr.forEach((item)=>{
            item.value?.removeEventListener('touchstart',touchStart);
            item.value?.removeEventListener('touchend',touchEnd);
            item.value?.removeEventListener('touchmove',touchMove);
        })
    })
}