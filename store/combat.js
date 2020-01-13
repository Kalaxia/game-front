import Squadron from '~/model/fleet/squadron';

export const state = () => ({
    combats: {},
    currentCombatId: 0,
    selectedRound: null,
    currentAction: null,
    currentActionIndex: 0,
    actionDuration: 1000,
    isCombatEnded: false,
    timer: null,
});

export const mutations = {
    setCurrentCombatId(state, id) {
        state.currentCombatId = id;
    },

    addCombat(state, combat) {
        state.combats[`combat-${combat.id}`] = combat;
    },

    addCombatRound(state, payload) {
        const index = state.combats[`combat-${payload.combat.id}`].rounds.findIndex(r => r.id === payload.round.id);
        if (index > -1) {
            state.combats[`combat-${payload.combat.id}`].rounds[index] = payload.round;
        } else {
            state.combats[`combat-${payload.combat.id}`].rounds.push(payload.round);
        }
    },

    resetSquadrons(state) {
        state.combats[`combat-${state.currentCombatId}`].attacker.squadrons = new Array();
        state.combats[`combat-${state.currentCombatId}`].defender.squadrons = new Array();
    },

    loadSquadrons(state) {
        for (const s of state.selectedRound.squadrons) {
            const side = (s.fleet.id === state.combats[`combat-${state.currentCombatId}`].attacker.id) ? 'attacker' : 'defender';
            if (s.action) {
                s.action.squadron = s;
            }
            state.combats[`combat-${state.currentCombatId}`][side].squadrons.push(new Squadron(s));
        }
    },

    clearTimer(state) {
        if (state.timer !== null) {
            clearTimeout(state.timer);
        }
    },

    setTimer(state, callback) {
        this.timer = setTimeout(callback, state.actionDuration);
    },

    selectRound(state, round) {
        state.selectedRound = round;
    },

    setCurrentActionIndex(state, index) {
        state.currentActionIndex = index;
    },

    combatEnding(state, isEnded) {
        state.isCombatEnded = isEnded;
    }
};

export const actions = {
    initCombat({ commit, dispatch }, combat) {
        commit('clearTimer');
        commit('addCombat', combat);
        commit('setCurrentCombatId', combat.id);
        commit('combatEnding', false);
        dispatch('selectRound', combat.rounds[0]);
    },

    addCombat({ commit }, combat) {
        commit('addCombat', combat);
        commit('user/addAlert', {
            message: 'combat_start',
            data: combat.formatNotificationData()
        }, { root: true });
    },

    addCombatRound({ commit, dispatch, state }, payload) {
        commit('addCombatRound', payload);

        if (state.currentCombatId === payload.combat.id) {
            dispatch('selectRound', payload.round);
        }
    },

    selectRound({ commit, dispatch }, round) {
        commit('clearTimer');
        commit('selectRound', round);
        commit('setCurrentActionIndex', 0);

        dispatch('loadSquadrons');
        dispatch('playNextAction');
    },

    loadSquadrons({ commit }) {
        commit('resetSquadrons');
        commit('loadSquadrons');
    },

    playNextAction({ commit, dispatch, state, getters }) {
        commit('setTimer', () => {
            const newIndex = state.currentActionIndex + 1;
            if (newIndex === getters.actions.length) {
                return dispatch('playNextRound');
            }
            commit('setCurrentActionIndex', newIndex);
            dispatch('playNextAction');
        });
    },

    playNextRound({ getters, commit, dispatch}) {
        if (getters.currentRoundIndex + 1 === getters.currentCombat.rounds.length) {
            commit('combatEnding', true);
            return commit('setCurrentActionIndex', -1);
        }
        dispatch('selectRound', getters.currentCombat.rounds[getters.currentRoundIndex + 1]);
    }
};

export const getters = {
    currentCombat: state => (typeof state.combats[`combat-${state.currentCombatId}`] !== 'undefined') ? state.combats[`combat-${state.currentCombatId}`] : null,

    actions: state => state.selectedRound.squadrons.map(s => s.action),

    currentAction: (state, getters) => getters.actions[state.currentActionIndex],

    currentRoundIndex: (state, getters) => getters.currentCombat.rounds.findIndex(r => r.id === state.selectedRound.id)
};