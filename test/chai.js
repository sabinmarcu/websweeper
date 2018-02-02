// @flow
/* eslint-disable prefer-arrow-callback */

import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import chaiSnapshot from 'chai-jest-snapshot';

chai.use(chaiEnzyme());
chai.use(chaiSnapshot);

beforeAll(function beforeSnapshotFunction() {
  chaiSnapshot.resetSnapshotRegistry();
});

export default chai;
