import App from './core/app.js';

App.init().then(() => {
    const link = document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = `/static/images/factions/${App.getCurrentPlayer().faction.banner}`;
    document.getElementsByTagName('head')[0].appendChild(link);


    Array.from(document.getElementsByClassName('not-implemented')).forEach(element => element.addEventListener('click', () => {
        alert(Dictionnary.translations.alerts.not_implemented);
    }));
});

window.setCurrentFleet = id => localStorage.setItem('current_fleet', id);

window.getCurrentFleet = () => {
    let currentFleet;
    if (typeof (currentFleet = localStorage.getItem('current_fleet')) === 'undefined') {
        window.location = '/views/fleet/fleet-all.html';
        return;
    }
    return currentFleet;
};
