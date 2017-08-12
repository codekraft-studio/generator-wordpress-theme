'use strict';
var assert = require('yeoman-assert');
var validateRequired = require('../utils/prompts.js').validateRequired;
var prompts = require('../utils/prompts.js').prompt({
  appname: 'test',
  user: {
    git: {
      name: () => 'codekraft-studio'
    }
  }
});

var promptProperties = [
  'projectName',
  'projectTitle',
  'projectDescription',
  'projectManager',
  'projectVersion',
  'projectAuthor',
  'projectLicense'
];

describe('generator-wordpress-starter: Prompts', () => {
  it('returns an array of prompt objects', () => {
    assert.equal(prompts instanceof Array, true);
  });

  it('validates required prompt input', () => {
    assert.equal(validateRequired(''), 'This field is required, please enter a valid value.');
    assert.equal(validateRequired('test'), true);
  });

  it('has all the required prompt properties', () => {
    let result = true;
    for (var i = 0; i < promptProperties.length; i++) {
      // Check if prompt name exists in required prompt properties
      let index = prompts.findIndex(o => o.name === promptProperties[i]);
      if (index === -1) {
        result = false;
      }
    }
    assert.equal(result, true);
  });

  it('validate the projectName input like WordPress slugs standard', () => {
    let index = prompts.findIndex(o => o.name === 'projectName');
    assert.equal(prompts[index].validate('theme-starter'), true);
    assert.equal(prompts[index].validate('theme-starter-' + new Date().getFullYear()), true);
    assert.equal(prompts[index].validate('theme_starter'), 'You should follow the WordPress plugin name standard.');
  });

  it('accept only defined build systems', () => {
    let projectManagers = ['', 'grunt', 'gulp'];
    let notSupported = 'webpack';
    let index = prompts.findIndex(o => o.name === 'projectManager');
    for (var i = 0; i < projectManagers.length; i++) {
      assert.equal(prompts[index].validate(projectManagers[i]), true);
    }
    assert.equal(prompts[index].validate(notSupported), 'You must use grunt, gulp or leave it blank.');
  });

  it('validate projectVersion input against simple semver standard', () => {
    let index = prompts.findIndex(o => o.name === 'projectVersion');
    assert.equal(prompts[index].validate('1.0.0'), true);
    assert.equal(prompts[index].validate('b0.88.1'), 'You should enter a valid version.');
  });
});
