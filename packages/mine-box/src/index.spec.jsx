// @flow

import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import MineBox, { missingClickHandler } from './index';

describe('Sanity Check: ', () => {
  test('basic maffs', () => {
    expect(2 + 2).to.equal(4);
  });
  test('hashtag logic', () => {
    const two = (4 / 2);
    expect(two === 2).to.equal(true);
  });
});

describe('Mine Box', () => {
  describe('initial render', () => {
    let wrapper: ?MineBox = null;
    beforeEach(() => {
      wrapper = shallow(<MineBox />);
    });
    it('should have a proper default state', () => {
      expect(wrapper).to.have.className('default');
    });
    it('should have a proper error handler', () => {
      expect(wrapper).to.have.prop('onClick');
      expect(wrapper).to.have.prop('onClick').equal(missingClickHandler);
    });
  });
});
