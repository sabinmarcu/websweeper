// @flow
/* eslint-disable import/first */
import debug from 'debug';

const log = debug('log|test|bootstrap:jest');

log('Importing Babel Polyfill');
import '@babel/polyfill';

log('Importing Chai Configuration');
import './chai';

log('Importing Enzyme Configuration');
import './enzyme';

// log('Importing init script');
// import '../src/utils/init/init';
