export default class LoadGoogleAPI {

  /**
   * Creates an instance of LoadGoogleAPI.
   * @param {Object} An object of param settings.
   *
   * @memberOf LoadGoogleAPI
   */
  constructor(options) {
    this._callbackName = '__googleApiOnLoadCallback';
    this._clientURL = `https://apis.google.com/js/client.js?onload=${this._callbackName}`;
    this._apiKey = options.apiKey;
    this._clientId = options.clientId;
    this._discoveryDocs = options.discoveryDocs;
    this._scope = options.scope.join(' ');
    this.name = 'load-google-api';
  }

  /**
   * Injects the Google API Client script into the browser and
   * attaches a handler.
   * @returns {Promise} Returns a promise after injection.
   *
   * @memberOf LoadGoogleAPI
   */
  loadGoogleAPI() {
    return new Promise((resolve, reject) => {
      const clientScriptElement = document.createElement('script');

      clientScriptElement.src = this._clientURL;
      window[this._callbackName] = () => {
        resolve();
      }
      document.body.appendChild(clientScriptElement);
    });
  }
  /**
   * After the google api client library is loaded in the browser,
   * this function performs initialization of the client using the
   * credentials from auth file.
   * @returns {Promise} Returns a promise after successful login.
   *
   * @memberOf LoadGoogleAPI
   */
  init() {
    var loadGapiClient = new Promise((resolve, reject) => {
      window.gapi.load('client:auth2', resolve);
    });

    var login = new Promise((resolve, reject) => {
      window.gapi.client.init({
        apiKey: this._apiKey,
        client_id: this._clientId,
        discoveryDocs: this._discoveryDocs,
        scope: this._scope
      }).then(resolve);
    });

    return Promise.all([loadGapiClient, login]);
  }
}
