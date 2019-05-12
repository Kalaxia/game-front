export default ({ store }) => {
    if (process.server) {
        return;
    }
    if (store.state.user.player !== null && store.state.user.player.faction !== null) {
        var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
        link.type = 'image/x-icon';
        link.rel = 'shortcut icon';
        link.href = `/images/factions/${store.state.user.player.faction.banner}`;
        document.getElementsByTagName('head')[0].appendChild(link)
    }
};