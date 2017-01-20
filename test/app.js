'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-wordpress-starter:app', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({projectName: 'my-plugin'})
      .toPromise();
  });

  it('creates files from template', function () {
    assert.file([
      'package.json',
      'Gruntfile.js',
      'src/assets/src/scss/base/banner.scss',
      'src/functions.php'
    ]);
  });
});
