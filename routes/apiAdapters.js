// api adapters digunakan oleh API Gateway untuk mengakses service-service di bawahnya

const axios = require('axios');

const { TIMEOUT } = process.env;

module.exports = (baseUrl) => {
    return axios.create({
        baseUrl: baseUrl,
        timeout: TIMEOUT
    })
}