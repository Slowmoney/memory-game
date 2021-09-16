import { createStore } from 'vuex'
import { variants, size, gameTime } from '../config';
import { getRandomInt } from '../utils';

let closeAllTimeout
export const store = createStore({
    state() {
        return {
            layout: [],
            scoreboard: [],
            time: "",
            timeEnd: null,
            timerInterval: null
        }
    },
    getters: {
        score(state) {
            return state.layout.filter(e => e.deleted).length / 2
        },
        time(state) {
            return state.time
        }
    },
    mutations: {
        delete(state, iconName) {
            state.layout = state.layout.map(e => {
                if (e.icon == iconName) {
                    e.deleted = true
                }
                return e
            })
        },
        closeAll({ layout }) {
            layout.forEach(e => {
                e.isShowen = false
            })
        },
        
    },
    actions: {
        start({ dispatch, state, commit }) {
            state.started = true
            dispatch('generate')
            state.timeEnd = new Date(Date.now() + gameTime)
            dispatch("updateClock")
            clearInterval(state.timerInterval)
            state.timerInterval = setInterval(() => {
                dispatch("updateClock")
            }, 500);
        },
        stop({ state, getters }) {
            
            state.started = false
            clearInterval(state.timerInterval)
            const time = new Date(gameTime - ((state.timeEnd - Date.now())))
            if (!state.scoreboard) state.scoreboard = []
            state.scoreboard.push({ score: getters.score, time: `${time.getMinutes()}:${time.getSeconds()}` })
            localStorage.setItem("scoreboard", JSON.stringify(state.scoreboard))
            state.layout = []
        },
        updateClock({state, dispatch}) {
            const dtime = new Date(state.timeEnd - Date.now())
            state.time = Intl.DateTimeFormat('en-AU', { minute: 'numeric', second: 'numeric' }).format(dtime)
            if ((dtime) <= 0 || state.layout.every(e => e.deleted)) {
                clearInterval(state.timerInterval)
                dispatch("stop")
            }
        },
        generate(context) {
            const icons = []
            //выбор иконок
            while (icons.length < size * size / 2) {
                let rand = getRandomInt(0, variants.length - 1)
                if (icons.indexOf(rand) !== -1)
                    continue
                icons.push(rand)
            }
            //создание пар
            const items = [...icons, ...icons].sort((a, b) => getRandomInt(-1, 1))
            context.state.layout = items.map((icon, i) => {
                return ({
                    icon: variants[icon],
                    isShowen: false,
                    i,
                })
            })
        },
        openCard({ state, commit }, index) {
            const target = state.layout.find(e => e && e.i == index)
            target.isShowen = true;
            const opened = state.layout.filter(e => e && e.isShowen && !e.deleted)
            if (opened.length == 2) {
                if (opened[0].icon == opened[1].icon) {
                    clearTimeout(closeAllTimeout)
                    setTimeout(() => {
                        commit('delete', opened[0].icon)
                    }, 1000);
                } else {
                    if (closeAllTimeout) {
                        clearTimeout(closeAllTimeout)
                    }
                    closeAllTimeout = setTimeout(() => {
                        commit('closeAll')
                        closeAllTimeout = undefined
                    }, 1000);

                }
            } else if (opened.length == 1) {
                !closeAllTimeout && (closeAllTimeout = setTimeout(() => {
                    commit('closeAll')
                    closeAllTimeout = undefined
                }, 5000))
            } else {
                target.isShowen = false;
            }

        }
    },

})