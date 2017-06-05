'use strict';
var assert = require('yeoman-assert');
var prompts = require('../utils/prompts.js')({
  appname: 'test',
  user: {
    git: {
      name: () => 'codekraft-studio'
    }
  }
});

describe('generator-wordpress-starter: Prompts', () => {
  it('should be a object', () => {
    assert.equal(typeof prompts, 'object');
  });

  it('should have a projectName prompt object', () => {
    assert.equal(prompts[0].name, 'projectName');
  });
});
