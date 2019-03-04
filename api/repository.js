const fetch = (typeof process.env.TESTING === 'undefined') ? require('node-fetch') : require('jest-fetch-mock');

export default class Repository {
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
        if (response.status === 401) {
            await this.store.commit('api/logout');
            return;
        }
        if (response.ok && response.status !== 204) {
            return await response.json();
        } else if (!response.ok) {
            throw response.error;
        }
        return null;
    }

    getHeaders() {
        return this.store.state.api.headers;
    }
};