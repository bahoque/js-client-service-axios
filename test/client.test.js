const axios = require('axios');

const base = 'https://jsonplaceholder.typicode.com/';
const timeout = 3000;

describe('create client', () => {
    const client = axios.create({
        baseURL: base,
        timeout
    });
    const client2 = axios.create({
        baseURL: 'https://www.google.com.co',
        timeout
    });

    it('inspect client', async function (done) {
        console.log(client.defaults.baseURL);
        console.log(client2.defaults.baseURL);
        done();
    });
});
