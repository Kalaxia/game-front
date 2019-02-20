const cookie = process.server ? require('cookie') : undefined;

export default async function ({ app, store, req, res, route, redirect}) {
    try {
        if (route.query.jwt) {
            await store.dispatch('api/storeToken', route.query.jwt);
            store.commit('api/authenticate', true);
            res.setHeader('Set-Cookie', `security_token=${route.query.jwt}`);
            return;
        }
        if (!process.server) {
            return;
        }
        if (req.headers.cookie) {
            const parsed = cookie.parse(req.headers.cookie);
            const token = parsed.security_token;
            if (token === null || typeof token === 'undefined') {
                throw 'unauthorized';
            }
            await store.dispatch('api/storeToken', token);
            store.commit('api/authenticate', true);
        } else {
            throw 'unauthorized';
        }
    } catch(error) {
        redirect(`${app.$env.PORTAL_URL}/dashboard`);
    }
};