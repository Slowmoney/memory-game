<script>
import { defineComponent } from "vue";

export default defineComponent({
    data(){
        return {
            pair: 1
        }
    }
});
</script>
<template>
<header class="header">
    <div>
        Найдено пар: {{pair}}
    </div>
</header>
</template>

<style lang="scss" scoped>
    .header{
        background-color: #673ab7;
        color: #fff;
        padding: 0.5rem 0.75rem;
    }
</style>
