var urlParams = new URLSearchParams(window.location.search);

if (!urlParams.has('jwt')) {
  alert('DIEEEEEEEEEE');
}

const jwt = urlParams.get('jwt');

var headers = new Headers({"Authorization": `Bearer ${jwt}`});

fetch('/api/me', {
    method: 'GET',
    headers: headers
}).then(response => {
    console.log(response);
});
