import '../../../../config/config';

export default {
    namespaced: true,
    
    state: {
        headers: {
            'Content-Type': 'application/json',
        },
    },

    mutations: {
        auth: function(state) {
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

        logout: function() {
            localStorage.removeItem('security.jwt');
            localStorage.removeItem('current_planet');
            window.location = `${config.portalUrl}/dashboard`;
        },
    },
    
    actions: {
        responseMiddleware: async function({ commit }, payload) {
            if (payload.response.status === 401) {
                commit('logout');
            }
            if (payload.response.ok) {
                payload.data = await payload.response.json();
            }
        }
    }
};