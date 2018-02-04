// @flow

import debug from 'debug';
import enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

const log = debug('log|test|bootstrap:enzyme');

log('Configuring Enzyme with React16 Adapter');
enzyme.configure({ adapter: new Adapter() });

log('Done');
export default enzyme;
