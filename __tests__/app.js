'use strict';

var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-wordpress-starter:app', () => {
  jest.setTimeout(5000);

  // Override process HOME env variable to point to this folder
  process.env.HOME = __dirname;

  // Testing the default template option
  describe('generator default case:', () => {
    beforeAll(() => {
      return helpers.run(path.join(__dirname, '../generators/app'))
        .withPrompts({projectName: 'my-theme'})
        .withOptions({
          'skip-welcome-message': true,
          'skip-message': true,
          'skip-screenshot': true
        }).toPromise();
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

  // Describe the generation with a non existing custom template input
  describe('generator non existing template continue', () => {
    let context = null;

    beforeAll(done => {
      context = helpers.run(path.join(__dirname, '../generators/app'))
        .withPrompts({
          projectName: 'my-theme',
          continue: true
        })
        .withOptions({
          'skip-screenshot': true,
          template: 'Non Existing'
        })
        .on('end', done);
    });

    it('ensure the projectTemplate property is set to empty', () => {
      assert.equal(context.generator.props.projectTemplate, '');
    });

    it('render the files from the default template', () => {
      assert.file([
        'src/functions.php',
        'src/index.php'
      ]);
    });
  });

  // Describe the generation with custom existing template
  describe('generator existing template', () => {
    beforeAll(() => {
      return helpers.run(path.join(__dirname, '../generators/app'))
        .withPrompts({projectName: 'my-theme'})
        .withOptions({
          'skip-screenshot': true,
          template: 'Example'
        })
        .toPromise();
    });

    it('render the files from the custom template', () => {
      assert.file([
        'src/functions.php',
        'src/index.php',
        'src/style.css'
      ]);
    });
  });

  // Test without a project manager
  describe('without project manager', () => {
    beforeAll(() => {
      return helpers.run(path.join(__dirname, '../generators/app'))
        .withPrompts({projectManager: ''})
        .withOptions({
          'skip-screenshot': true
        })
        .toPromise();
    });

    it('copy only the template files', () => {
      assert.file([
        'src/functions.php',
        'src/index.php'
      ]);
    });

    it('does not copy any project manager file', () => {
      assert.noFile([
        'src/Gruntfile.js',
        'src/gulpfile.js',
        'src/webpack.config.js'
      ]);
    });
  });
});
