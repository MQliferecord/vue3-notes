<template>
    <div class="header">
        <div class="h-left">
            <router-link active-class="active" :to="{name:'Note'}">
                便签
            </router-link>
        </div>
        <div class="h-right">
            <router-link active-class="active" :to="{name:'ToDo'}">
                代办
            </router-link>
        </div>
    </div>
</template>

<style lang="scss">
.header{
    height: 0.6rem;
    display: flex;
    font-size: 0.2rem;
    align-items:center;
    padding:0 0.1rem;
    box-sizing:border-box;
    .h-left,
    .h-right{
        width:0.5rem;
        text-align:center;
        a{
            color:#ccc;
            &.active{
                color:rgb(25,25,25)
            }
        }
    }
}
</style>