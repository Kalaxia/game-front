export default async ({ app, store }, inject) => {
    if (process.server) {
        return;
    }
    const ws = new WebSocket(`ws://172.19.0.5/ws`);
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
            default:
                console.log(message);
                break;
        }
    }
};