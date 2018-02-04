// @flow
/* eslint-disable import/first */
import debug from 'debug';

const log = debug('log|test|bootstrap:jest');

log('Importing Babel Polyfill');
import '@babel/polyfill';

log('Importing Livescript Polyfill');
import 'livescript';

log('Importing Chai Configuration');
import './chai';

log('Importing Enzyme Configuration');
import './enzyme';
