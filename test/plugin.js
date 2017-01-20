'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

var prompts = {projectName: 'my-plugin'};

describe('generator-wordpress-starter:plugin', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/plugin'))
      .withPrompts(prompts)
      .toPromise();
  });

  it('creates files from template', function () {
    assert.file([
      'package.json',
      'Gruntfile.js',
      'include/class-main.php',
      prompts.projectName + '.php'
    ]);
  });
});
