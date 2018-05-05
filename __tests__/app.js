'use strict';

const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-wordpress-starter:app', () => {
  // Override process HOME env constiable to point to this folder
  // so we can use the .wordpress-starter folder for mocked templates
  process.env.HOME = __dirname;

  describe('generator with default case:', () => {
    beforeAll(() => {
      return helpers.run(path.join(__dirname, '../generators/app'))
        .withPrompts({projectName: 'my-theme'})
        .withOptions({
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

    it('init a empty git repository', () => {
      assert.file('.git/HEAD');
    });

    it('set theme name in banner', () => {
      assert.fileContent('src/assets/src/scss/base/banner.scss', 'Theme Name: My Theme');
    });

    it('set text domain in banner', () => {
      assert.fileContent('src/assets/src/scss/base/banner.scss', 'Text Domain: my-theme');
    });
  });

  describe('generator with non existing template continue', () => {
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

    it('render the theme files', () => {
      assert.file([
        'src/functions.php',
        'src/index.php',
        'src/assets/src/scss/base/banner.scss'
      ]);
    });
  });

  describe('generator with existing template', () => {
    beforeAll(() => {
      return helpers.run(path.join(__dirname, '../generators/app'))
        .withPrompts({projectName: 'my-theme'})
        .withOptions({
          'skip-screenshot': true,
          template: 'Example'
        })
        .toPromise();
    });

    it('render the theme files', () => {
      assert.file([
        'src/functions.php',
        'src/index.php',
        'src/style.css'
      ]);
    });
  });

  describe('generator without project manager', () => {
    beforeAll(() => {
      return helpers.run(path.join(__dirname, '../generators/app'))
        .withPrompts({projectManager: ''})
        .withOptions({
          'skip-screenshot': true
        })
        .toPromise();
    });

    // TODO: Style file is missing
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
