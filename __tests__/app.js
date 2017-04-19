'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-wordpress-starter:app', () => {
  beforeEach(() => helpers.run(path.join(__dirname, '../generators/app'))
    .withPrompts({projectName: 'my-theme'})
    .toPromise()
  );

  it('creates and move in a folder named like the projectName', () => {
    assert.equal(path.basename(process.cwd()), 'my-theme');
  });

  it('creates files from template', () => {
    assert.file([
      'package.json',
      'Gruntfile.js',
      'src/assets/src/scss/base/banner.scss',
      'src/functions.php'
    ]);
  });

  it('should have set theme name in banner', () => {
    assert.fileContent('src/assets/src/scss/base/banner.scss', 'Theme Name: My Theme');
  });

  it('should have set text domain in banner', () => {
    assert.fileContent('src/assets/src/scss/base/banner.scss', 'Text Domain: my-theme');
  });
});
