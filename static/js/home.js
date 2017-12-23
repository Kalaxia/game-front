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
  if (response.status === 401) {
    window.location = `${config.portalUrl}/dashboard`;
    return Promise.reject("unauthorized");
  }
  if (response.ok) {
    return response.json();
  }
})
.then(data => {
  document.querySelector("#player-data h3").innerText = data.pseudo
}).catch(error => console.log(error));
