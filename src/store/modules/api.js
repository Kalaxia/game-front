import config from '../../../config';

export default {
    namespaced: true,
    
    state: {
        auth: false,
        headers: {
            'Content-Type': 'application/json',
        },
    },

    mutations: {
        logout() {
            localStorage.removeItem('security.jwt');
            localStorage.removeItem('current_planet');
            window.location = `${config.portal_url}/dashboard`;
        },

        authenticate(state, isAuthenticated) {
            state.isAuthenticated = isAuthenticated;
        }
    },
    
    actions: {
        async auth({ state, commit }) {
            const urlParams = new URLSearchParams(window.location.search);
            if (!urlParams.has('jwt') && localStorage.getItem('security.jwt') === null) {
                window.location = `${config.portal_url}/dashboard`;
                return;
            } else if (urlParams.has('jwt')) {
                localStorage.setItem('security.jwt', urlParams.get('jwt'));
                window.location = '/';
                return;
            }
            state.headers['Authorization'] = `Bearer ${localStorage.getItem('security.jwt')}`;
            commit('authenticate', true);
        },
        
        async responseMiddleware({ commit }, payload) {
            if (payload.response.status === 401) {
                await commit('logout');
                return;
            }
            if (payload.response.ok && payload.response.status !== 204) {
                payload.data = await payload.response.json();
            }
        }
    }
};