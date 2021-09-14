<script>
import { defineComponent } from "vue";

export default defineComponent({});
</script>
<template>
    <div class="scoreboard">
        <div class="scoreboard__title">
            Счёт
            <div v-show="!$store.state.scoreboard||$store.state.scoreboard&&$store.state.scoreboard.length == 0">Игр пока нет. Нажмите старт что-бы начать.</div>
            </div>
        
        <div class="scoreboard-row" v-for="(e,i) in $store.state.scoreboard" :key="i">
            <div class="scoreboard-inner">
                <div class="scoreboard__index">№ {{ i }}</div>
                <div>Счёт: {{ e.score }}</div>
                <div class="scoreboard-spacer"></div>
                <div v-if="e.time">Время: {{ e.time }}</div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.scoreboard {
    &-row {
        box-shadow: 0px 0px 10px 0px #e0e0e0;
        border-radius: 0.5rem;
        padding: 1em;
        & + & {
            margin-top: 10px;
        }
    }
    &-inner {
        display: flex;
    }
    &-spacer {
        flex: 1;
    }
    &__index {
        margin-right: 2em;
    }
    &__title{
        font-size: large;
        text-align: center;
    }
}
</style>
