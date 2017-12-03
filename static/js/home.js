const urlParams = new URLSearchParams(window.location.search);

if (!urlParams.has('jwt') && localStorage.getItem('security.jwt') === null) {
  window.location = config.portalUrl;
} else if (urlParams.has('jwt')) {
  localStorage.setItem('security.jwt', urlParams.get('jwt'));
  window.location = '/';
}

const jwt = localStorage.getItem('security.jwt');

var headers = new Headers({"Authorization": `Bearer ${jwt}`});

fetch('/api/me', {
    method: 'GET',
    headers: headers
}).then(response => {
    console.log(response);
});
