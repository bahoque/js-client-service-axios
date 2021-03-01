"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Service = void 0;
const axios_1 = require("axios");
const client_service_core_1 = require("@bahoque/client-service-core");
class Service extends client_service_core_1.Service {
    constructor(baseURL, url, timeout = 3000) {
        super();
        this.makeClient(baseURL, url, timeout);
    }
    get client() {
        return this._client;
    }
    set client(value) {
        this._client = value;
    }
    get path() {
        return this._client.defaults.url;
    }
    set path(value) {
        this._client.defaults.url = value;
    }
    get timeout() {
        return this._client.defaults.timeout;
    }
    set timeout(value) {
        this._client.defaults.timeout = value;
    }
    get urlBase() {
        return this._client.defaults.baseURL;
    }
    set urlBase(value) {
        this._client.defaults.baseURL = value;
    }
    makeClient(baseURL, url, timeout) {
        this._client = axios_1.default.create({ baseURL, timeout, url });
    }
    raw(method, ...rest) {
        console.log(method, ...rest);
        return null;
    }
}
exports.Service = Service;
//# sourceMappingURL=service.js.map