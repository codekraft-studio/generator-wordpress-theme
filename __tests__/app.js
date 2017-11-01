'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-wordpress-starter:app', () => {
  beforeEach(() => {
    this.runContext = helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({projectName: 'my-theme'})
      .withOptions({
        'skip-welcome-message': true,
        'skip-message': true
      });
  });

  // Testing the default template option
  describe('generator default case:', () => {
    beforeEach(done => {
      this.runContext.on('end', done);
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

  describe('generator non existing template continue', () => {
    beforeEach(done => {
      this.runContext
        .withPrompts({continue: true})
        .withOptions({template: 'Non Existing'})
        .on('error', done)
        .on('end', done);
    });
    it('reset the template option to proceed', () => {
      assert.equal(this.runContext.generator.options.template, false);
    });
    it('render the files from the default template', () => {
      assert.file([
        'src/functions.php',
        'src/index.php',
        'src/screenshot.png'
      ]);
    });
  });

  // Test without a project manager
  describe('without project manager', () => {
    beforeEach(() => {
      return this.runContext
        .withPrompts({projectManager: ''})
        .toPromise();
    });
    it('copy only the template files', () => {
      assert.file([
        'src/functions.php',
        'src/index.php'
      ]);
    });
    it('doesn\'t copy any project manager file', () => {
      assert.noFile([
        'src/Gruntfile.js',
        'src/gulpfile.js',
        'src/webpack.config.js'
      ]);
    });
  });
});
