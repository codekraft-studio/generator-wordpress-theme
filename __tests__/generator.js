'use strict';
var WPGenerator = require('../utils/generator.js');
var assert = require('yeoman-assert');

describe('generator-wordpress-starter:utils:generator', () => {
  describe('has default methods', () => {
    it('has a initializing method to check command line options', () => {
      assert.implement(WPGenerator, 'initializing');
    });

    it('has a prompting method to get project variables', () => {
      assert.implement(WPGenerator, 'prompting');
    });

    it('has a configuring method to check prompt results', () => {
      assert.implement(WPGenerator, 'configuring');
    });

    it('has a install method to optionally install dependencies', () => {
      assert.implement(WPGenerator, 'install');
    });

    it('has a end method to say goodbye', () => {
      assert.implement(WPGenerator, 'end');
    });
  });
});
