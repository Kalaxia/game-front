const cookie = process.server ? require('cookie') : undefined;

export const actions = {
    async nuxtServerInit({ commit, dispatch, rootState }, { app, req, res, route, redirect}) {
        try {
            if (route.query.jwt) {
                await dispatch('api/storeToken', route.query.jwt);
                commit('api/authenticate', true);
                res.setHeader('Set-Cookie', `security_token=${route.query.jwt}`);
            }
            if (!process.server) {
                return;
            }
            if (req.headers.cookie && !route.query.jwt) {
                const parsed = cookie.parse(req.headers.cookie);
                const token = parsed.security_token;
                if (token === null || typeof token === 'undefined') {
                    throw 'missing token';
                }
                await dispatch('api/storeToken', token);
                commit('api/authenticate', true);
            } else if (!rootState.api.isAuthenticated) {
                throw 'missing cookie';
            }
            await dispatch('user/initPlayer', null, { root: true });
            if (!rootState.user.player.isActive) {
                return redirect('/registration');
            }
            await dispatch('user/initPlanet', null, { root: true });
        } catch(error) {
            redirect(`${app.$env.PORTAL_URL}/dashboard`);
        }
    }
};