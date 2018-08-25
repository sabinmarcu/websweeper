/* eslint-disable */

const debug = require('debug');
const log = debug('log:init');
const debugLog = debug('debug:init');

require('@babel/register');
require('@babel/polyfill');

require('require-middleware').use(function (req, next) {
    if (req.request.indexOf(".") < 0) {
        try {
            const pkg = require(req.request + "/package.json");
            if (pkg.module) {
                const alias = req.request + "/" + pkg.module;
                log(`Aliasing ${req.request} to ${alias}`);
                try {
                    return require(alias);
                } catch (e) {
                    log(`Alias failed (${req.request})!`);
                    debugLog(req.request, e);
                }
            }
        } catch (e) { }
    }
    next();
});
