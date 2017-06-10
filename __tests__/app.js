'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-wordpress-starter:app', () => {
  beforeEach(() => {
    this.generator = helpers.run(path.join(__dirname, '../generators/app'))
    .withPrompts({projectName: 'my-theme'})
    .withOptions({
      'skip-welcome-message': true,
      'skip-message': true
    });
  });
  // Testing the default template option
  describe('generator default case:', () => {
    beforeEach(done => {
      this.generator.on('end', done);
    });

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
  // Testing the custom template option
  describe('generator custom template:', () => {
    beforeEach(done => {
      this.generator
      .withPrompts({continue: false})
      .withOptions({template: 'Test'})
      .on('error', done)
      .on('end', done);
    });

    it('wont create any file if template not exists', () => {
      assert.noFile([
        'src/functions.php',
        'src/index.php',
        'src/style.css'
      ]);
    });
  });
});
