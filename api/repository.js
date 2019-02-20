const fetch = require('node-fetch');

class Repository {
    constructor(store) {
        this.store = store;
    }

    async call(method, url, body) {
        const callData = {
            method: method,
            headers: this.getHeaders()
        };
        if (typeof body === 'object') {
            callData.body = JSON.stringify(body);
        }
        const response = await fetch((process.client) ? url : process.env.API_URL + url, callData);
        return await this.processResponse(response);
    }

    async processResponse(response) {
        let result = { data: {}, error: null };
        if (response.status === 401) {
            await this.store.commit('api/logout');
            return;
        }
        if (response.ok && response.status !== 204) {
            result.data = await response.json();
        } else if (!response.ok) {
            result.error = response.error();
        }
        return result;
    }

    getHeaders() {
        return this.store.state.api.headers;
    }
};

export default Repository;