import Vue from 'vue';

export const state = () => ({
    offers: []
});

export const mutations = {
    offers(state, offers) {
        state.offers = offers;
    },

    addOffer(state, offer) {
        state.offers.push(offer);
    },

    refreshOffer(state, payload) {
        Vue.set(state.offers, payload.index, payload.offer);
    },

    removeOffer(state, index) {
        state.offers.splice(index, 1);
    },

    updateQuantity(state, payload) {
        state.offers[payload.index].quantity = payload.quantity;
    }
};

export const actions = {
    updateOffer({ commit, getters }, offer) {
        const i = getters['offerIndex'](offer.id);
        if (i === null) {
            return;
        }
        if (offer.quantity > 0) {
            commit('refreshOffer', { index: i, offer });
            return;
        }
        commit('removeOffer', i);
    },

    removeOffer({ commit, getters }, offer) {
        const i = getters['offerIndex'](offer.id);
        if (i !== null) {
            commit('removeOffer', i);
        }
    },

    decreaseQuantity({ state, commit, getters }, payload) {
        const i = getters['offerIndex'](payload.offer.id);
        if (i === null) {
            return;
        }
        commit('updateQuantity', { index: i, quantity: state.offers[i].quantity - payload.quantity });
    }
};

export const getters = {
    offers: state => state.offers,

    offerIndex: state => id => {
        for (const i in state.offers) {
            const o = state.offers[i];
            if (o.id === id) {
                return i;
            }
        }
        return null;
    }
};