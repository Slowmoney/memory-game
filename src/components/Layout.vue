<script>
import { defineComponent } from "vue";
import { mapActions } from "vuex";
import Card from "./Card.vue";
export default defineComponent({
    components: { Card },
    methods:{
        ...mapActions(["openCard"]),
    }
});
</script>
<template>

  <div class="layout">
      <Card @open="openCard" class="layout__cell" v-for="(e,i) in $store.state.layout" :key="i" :data="e"></Card>
  </div>
</template>

<style lang="scss" scoped>
.layout {
    display: grid;
    grid-template-columns: repeat(6, auto);
    grid-template-rows: repeat(6, auto);
    grid-gap: 1%;
    max-width: calc(100vh - 90px);
    margin: auto;
    &__cell {
        aspect-ratio: 1/1;
    }
}
</style>
