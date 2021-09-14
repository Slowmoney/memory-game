<script>
import { defineComponent } from "vue";

export default defineComponent({
    setup() {
        return 0;
    },
    data() {
        return { count: 1 };
    },
    props: ["data"],
    methods: {
        onClick() {
            this.$emit("open", this.data.i);
        },
    },
});
</script>
<template>
  <div @click="onClick" class="card" :class="{'card--active': this.data.isShowen, 'card--deleted': this.data.deleted}">
    <div class="card-inner" v-if="this.data">
      <div class="card-front">
          <mdicon v-if="this.data.icon" :name="this.data.icon" />
      </div>
      <div class="card-back">
        <div class="card__icon">
          <mdicon v-if="this.data.icon" :name="this.data.icon" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
    background-color: transparent;
    perspective: 1000px;
    &--deleted &-inner{
        display: none;
    }
    &-inner {
        position: relative;
        width: 100%;
        height: 100%;
        text-align: center;
        transition: transform 0.8s;
        transform-style: preserve-3d;
    }
    &__icon {
        margin: auto;
    }
    &--active &-inner {
        transform: rotateY(180deg);
    }
    &-front,
    &-back {
        position: absolute;
        display: flex;
        width: 100%;
        height: 100%;
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
        box-shadow: 0px 0px 10px 0px #e0e0e0;
        border-radius: 0.5rem;
    }

    &-front {
        &:hover{
            box-shadow: 0px 0px 10px 0px #aaa;
        }
    }

    &-back {
        transform: rotateY(180deg);
    }
}
</style>
