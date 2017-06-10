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
  it('should return a array', () => {
    assert.equal(prompts instanceof Array, true);
  });

  it('should have all the required prompt properties', () => {
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

  it('should validate the projectName like WordPress slugs', () => {
    let index = prompts.findIndex(o => o.name === 'projectName');
    assert.equal(prompts[index].validate('theme-starter'), true);
    assert.equal(prompts[index].validate('theme-starter-' + new Date().getFullYear()), true);
    assert.equal(prompts[index].validate('theme_starter'), 'You should follow the WordPress plugin name standard.');
  });

  it('should accept only defined build systems', () => {
    let projectManagers = ['', 'grunt', 'gulp'];
    let notSupported = 'webpack';
    let index = prompts.findIndex(o => o.name === 'projectManager');
    for (var i = 0; i < projectManagers.length; i++) {
      assert.equal(prompts[index].validate(projectManagers[i]), true);
    }
    assert.equal(prompts[index].validate(notSupported), 'You must use grunt, gulp or leave it blank.');
  });

  it('should validate projectVersion input against simple semver standard', () => {
    let index = prompts.findIndex(o => o.name === 'projectVersion');
    assert.equal(prompts[index].validate('1.0.0'), true);
    assert.equal(prompts[index].validate('b0.88.1'), 'You should enter a valid version.');
  });
});
