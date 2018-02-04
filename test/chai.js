// @flow
/* eslint-disable prefer-arrow-callback */

import debug from 'debug';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import chaiSnapshot from 'chai-jest-snapshot';

const log = debug('log|test|bootstrap:chai');

log('Adding ChaiEnzyme');
chai.use(chaiEnzyme());

log('Adding ChaiSnapshot');
chai.use(chaiSnapshot);

log('Done');
export default chai;
