<script>
import { defineComponent } from "vue";
import Layout from "../components/Layout.vue";
import Scoreboard from "../components/Scoreboard.vue";
export default defineComponent({
    components:{
        Layout,
        Scoreboard
    }
});
</script>
<template>
    <Layout></Layout>
    <Scoreboard v-show="$store.state.layout.length == 0"></Scoreboard>
</template>

<style lang="scss" scoped>
    
</style>
