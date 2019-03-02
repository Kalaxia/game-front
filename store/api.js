import Cookie from 'js-cookie';

export const state = () => ({
    auth: false,
    headers: {
        'Content-Type': 'application/json',
    },
    token: null,
});

export const mutations = {
    logout() {
        Cookie.remove('security_token');
        state.token = null;
        if (process.client) {
            window.location = `${this.$env.portalUrl}/dashboard`;
        }
    },

    authenticate(state, isAuthenticated) {
        state.isAuthenticated = isAuthenticated;
    },

    addHeader(state, header) {
        state.headers[header.name] = header.value;
    },

    setToken(state, token) {
        state.token = token;
    }
};

export const actions = {
    storeToken({ commit }, token) {
        commit('setToken', token);
        commit('addHeader', { name: 'Authorization', value: `Bearer ${token}` });
        if (process.client) {
            Cookie.set('security_token', token);
        }
    }
};