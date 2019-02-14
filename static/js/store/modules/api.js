import '../../../../config/config';

export default {
    namespaced: true,
    
    state: {
        headers: {
            'Content-Type': 'application/json',
        },
    },

    mutations: {
        auth(state) {
            const urlParams = new URLSearchParams(window.location.search);
            if (!urlParams.has('jwt') && localStorage.getItem('security.jwt') === null) {
                window.location = `${config.portalUrl}/dashboard`;
                return;
            } else if (urlParams.has('jwt')) {
                localStorage.setItem('security.jwt', urlParams.get('jwt'));
                window.location = '/';
                return;
            }
            state.headers['Authorization'] =  `Bearer ${localStorage.getItem('security.jwt')}`;
        },

        logout() {
            localStorage.removeItem('security.jwt');
            localStorage.removeItem('current_planet');
            window.location = `${config.portalUrl}/dashboard`;
        },
    },
    
    actions: {
        async responseMiddleware({ commit }, payload) {
            if (payload.response.status === 401) {
                commit('logout');
            }
            if (payload.response.ok && payload.response.status !== 204) {
                payload.data = await payload.response.json();
            }
        }
    }
};