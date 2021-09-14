<script>
import { defineComponent } from "vue";

export default defineComponent({
    
});
</script>
<template>
<header class="header">
    <slot></slot>
</header>
</template>

<style lang="scss">
    .header{
        background-color: #673ab7;
        color: #fff;
        padding: 0.5rem 0.75rem;
        display: flex;
        align-items: center;
        &-spacer{
            flex: 1
        }
        &-btn{
            background-color: unset;
            border: none;
            color: #fff;
            padding: 10px;
            border-radius: 2em;
            &:hover{
                box-shadow: 0 0 15px 0px #ffffff40;
            }
        }
    }
</style>
