window.setCurrentFleet = id => localStorage.setItem('current_fleet', id);

window.getCurrentFleet = () => {
    let currentFleet;
    if (typeof (currentFleet = localStorage.getItem('current_fleet')) === 'undefined') {
        window.location = '/views/fleet/fleet-all.html';
        return;
    }
    return currentFleet;
};
