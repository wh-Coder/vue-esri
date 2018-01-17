let isDev = false && /^(192|0|127|localhost)/.test(location.hostname)

const ENV = require("json-loader!yaml-loader!./env.yml")

const domain = ENV.domain || 'http://192.168.1.8:8081'

const baseURL = isDev
    ? 'http://rap.fpi-inc.site/mockjsdata/24'
    : `${domain}/agms/web/api/v1`

module.exports = {
    isDev,
    domain,
    baseURL,
    layers: ENV.layers,
    ENV
}