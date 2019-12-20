export default async function({ store }) {
    store.commit('user/screenDimensions', {
        width: window.innerWidth,
        height: window.innerHeight
    });
}