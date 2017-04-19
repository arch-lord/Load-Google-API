/* global auth, gapi */

import LoadGoogleAPI from '../lib/load-google-api.min.js';

import options from '../auth.json';

const contacts = new LoadGoogleAPI(options);
const user = {
  status: null
};
const app = document.getElementById('app');
const apiExamples = {
  contacts: '/m8/feeds/contacts/default/full?alt=json&max-results=50'
}

app.innerHTML = `
<strong>Load Google API</strong>
<p>
  <div><strong>Scopes: </strong></div><div>${options.scope.join('<br/>')}</div>
</p>
<p>
  <div><strong>Authorization: </strong></div><div id="userStatus">${user.status}</div>
</p>
<div id="menu">
    <button id="login">Login to Google</button>
    <button id="logout">Log Out</button>
    <button id="getContacts">Get Contacts</button>
</div>
<div style="border:1px solid blue; width:500px; overflow:scroll; height:500px;" id="outputDiv"></div>`;

/**
 * Listens for changes in authentication state and
 * executes when changed.
 */
function updateSignInStatus() {
  const scope = options.scope.join(' ');

  user.google = auth.currentUser.get();
  user.status = user.google.hasGrantedScopes(scope) === true;
  document.getElementById('userStatus').innerHTML = user.status;
}

/**
 * Display an error message in a div.
 *
 * @param {String} An error message.
 */
function errorMsg(error) {
  document.getElementById('outputDiv').innerHTML = error;
}

/**
 * Sends an API request and displays contents in a div.
 *
 * @param {String} A Google API request string.
 */
function makeApiRequest(request) {
  if (user.status) {
    const token = window.gapi.client.getToken();

    gapi.client.request({path: request, token: token})
      .then(
          result => { document.getElementById('outputDiv').innerHTML = result.body; },
          result => { document.getElementById('outputDiv').innerHTML = result.result.error.message; }
      );
  } else {
    document.getElementById('outputDiv').innerHTML = 'Login required.';
  }
}

/**
 * Attach events to buttons on our sample page.
 *
 */
function attachEvents() {
  var getContactsButton = document.getElementById('getContacts');
  var outputDiv = document.getElementById('outputDiv');

  auth.attachClickHandler(
        'login', {scope: options.scope.join(' ')}, updateSignInStatus, errorMsg
        );
  document.getElementById('logout').addEventListener('click', () => {
    outputDiv.innerHTML = 'Logged out.';
    auth.signOut();
  });
  getContactsButton.addEventListener('click', () => {
    outputDiv.innerHTML = 'Loading...';
    makeApiRequest(apiExamples.contacts);
  })
}

/**
 * Launch the sample application page.
 *
 */
function main() {
  updateSignInStatus();
  attachEvents();
}

/**
 * Use library to inject Google API Client library, initialize
 * the client and wait for sign in status to change. Hand execution
 * to main function.
 */
contacts.loadGoogleAPI().then(() => {
  contacts.init().then(() => {
    window.auth = window.gapi.auth2.getAuthInstance();
    auth.isSignedIn.listen(updateSignInStatus);
  }).then(() => {
    main();
  });
})
