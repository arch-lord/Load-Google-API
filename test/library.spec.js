/* global describe, it, before */

import chai from 'chai';
import Library from '../lib/google-api-helper.js';

import options from './auth.json';

const lib = new Library(options);

chai.expect();

const expect = chai.expect;

describe('Given an instance of my library', () => {
  // before(() => {
  //  lib = new Library(options);
  // });
  describe('when I need the name', () => {
    it('should return the name', () => {
      expect(lib.name).to.be.equal('google-api-helper');
    });
  });
});
