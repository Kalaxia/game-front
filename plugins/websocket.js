import ResourceOffer from '~/model/trade/resource_offer';

export default async ({ env, store }, inject) => {
    if (process.server) {
        return;
    }
    const ws = new WebSocket(`${env.mode === 'prod' ? 'wss' : 'ws'}://${window.location.host}/ws`);
    ws.onopen = () => {
        ws.send(JSON.stringify({
            action: 'authenticate',
            token: store.state.api.token
        }));
    };
    ws.onmessage = ({ data }) => {
        const message = JSON.parse(data);

        switch (message.action) {
            case 'addNotification':
                store.commit('user/addNotification', message.data);
                break;
            case 'updateWallet':
                store.commit('user/wallet', message.data.wallet);
                break;
            case 'addTradeOffer':
                store.commit('trade/addOffer', new ResourceOffer(message.data));
                break;
            case 'updateTradeOffer':
                store.dispatch('trade/updateOffer', new ResourceOffer(message.data));
                break;
            case 'cancelTradeOffer':
                store.dispatch('trade/removeOffer', new ResourceOffer(message.data));
                break;
            default:
                console.log(message);
                break;
        }
    }
};