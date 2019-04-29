const state = () => ({
    notifications: []
});

const mutations = {
    add: (state, notification) => state.notifications.push(notification)
};