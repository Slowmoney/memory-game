import { createStore } from 'vuex'
const variants = [
    "access-point",
    "account",
    "adjust",
    "air-conditioner",
    "airballoon",
    "airplane",
    "alarm",
    "album",
    "all-inclusive",
    "alpha",
    "alphabetical",
    "altimeter",
    "ambulance",
    "amplifier",
    "anchor",
    "android",
    "clock",
    "currency-eth"
]
const size = 6
const gameTime =  1000 * 60 * 1
let closeAllTimeout
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getTime(dtime) {
    const seconds = Math.floor((dtime / 1000) % 60);
    const minutes = Math.floor((dtime / 1000 / 60) % 60);
    return `${minutes}:${seconds}`
}
export const store = createStore({
    state() {
        return {
            layout: [],
            timeEnd: null,
            scoreboard:[]
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
            state.timeEnd = Date.now() + gameTime
            dispatch("updateClock")
            clearInterval(state.timerInterval)
            state.timerInterval = setInterval(() => {
                dispatch("updateClock")
            }, 500);
        },
        stop({ state, getters }) {
            
            state.started = false
            clearInterval(state.timerInterval)
            state.scoreboard.push({ score: getters.score, time: state.time })
            localStorage.setItem("scoreboard", JSON.stringify(state.scoreboard))
            state.layout = []
            state.time = getTime(gameTime)
        },
        updateClock({state, dispatch}) {
            const dtime = state.timeEnd - Date.now()
            state.time = getTime(dtime)
            if ((dtime) <= 0 || state.layout.every(e => e.deleted)) {
                clearInterval(state.timerInterval)
                dispatch("stop")
            }
        },
        generate(context) {
            const icons = []
            //свыбор иконок
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
        openCard({ state, commit, dispatch }, index) {
            const target = state.layout.find(e => e && e.i == index)
            target.isShowen = true;
            const opened = state.layout.filter(e => e && e.isShowen && !e.deleted)
            if (opened.length == 2) {
                if (opened[0].icon == opened[1].icon) {
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