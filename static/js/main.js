const urlParams = new URLSearchParams(window.location.search);

if (!urlParams.has('jwt') && localStorage.getItem('security.jwt') === null) {
    window.location = `${config.portalUrl}/dashboard`;
} else if (urlParams.has('jwt')) {
    localStorage.setItem('security.jwt', urlParams.get('jwt'));
    window.location = '/';
}

const jwt = localStorage.getItem('security.jwt');
var dictionnary = '';
var player = null;
var headers = new Headers({"Authorization": `Bearer ${jwt}`});

const getCurrentPlayer = () =>
    fetch('/api/me', {
        method: 'GET',
        headers: headers
    }).then(apiResponseMiddleware)
    .then(data => {
        player = data;
    }).catch(error => console.log(error))
;

const logout = () => {
    localStorage.removeItem('security.jwt');
    localStorage.removeItem('current_planet');
    window.location = `${config.portalUrl}/dashboard`;
}

const setCurrentPlanet = id => localStorage.setItem('current_planet', id);

const getCurrentPlanet = () => {
    let currentPlanet;
    if (typeof (currentPlanet = localStorage.getItem('current_planet')) === 'undefined') {
        window.location = '/views/profile';
        return;
    }
    return currentPlanet;
};

const apiResponseMiddleware = response => {
    if (response.status === 401) {
        logout();
        return Promise.reject("unauthorized");
    }
    if (response.ok) {
        return response.json();
    }
};

const createDictionnary = lang => fetch(`/static/translations/${lang}.json`)
  .then(response => response.json())
  .then(data => { dictionnary = data; })
  .catch(error => console.log(error))
;
createDictionnary('fr').then(() => document.querySelectorAll("[data-translate=true]").forEach(element => {
    var keys = element.innerText.trim().split('.');
    var result = dictionnary;
    keys.forEach(key => {
        if (typeof result[key] === 'undefined') {
            result = element.innerText;
            return;
        }
        result = result[key];
    });
    element.innerText = result;
}));

const shadeColor = (color, percent) => {
    var f=parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
    return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
};
