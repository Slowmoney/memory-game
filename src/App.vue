<script>
import { mapActions } from 'vuex'
import Layout from "./components/Layout.vue";
import Header from "./components/Header.vue";
export default {
    components:{Layout,Header},
    setup() {
        console.log(this);
    },
    mounted(){
        console.log(this);
        this.generate();
        },
    methods:{
        ...mapActions([
            'generate'
        ]),
    }
}
</script>

<template>
<Header></Header>
<main>
    <Layout></Layout>
</main>
</template>

<style>
body{
    margin:0;
}
main{
    padding: 1rem;
}
*{
    font-family: monospace;
}
</style>