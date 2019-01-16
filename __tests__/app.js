'use strict';

const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-wordpress-starter:app', () => {
  // Override process HOME env constiable to point to this folder
  // so we can use the .wordpress-starter folder for mocked templates
  process.env.HOME = __dirname;

  describe('generator with default case:', () => {
    const themeName = 'my-theme'

    beforeAll(() => {
      return helpers.run(path.join(__dirname, '../generators/app'))
        .withPrompts({projectName: themeName})
        .withOptions({
          'skip-screenshot': true
        }).toPromise();
    });

    it('create a folder named like the projectName', () => {
      assert.equal(path.basename(process.cwd()), 'my-theme');
    });

    it('creates mandatory files from template', () => {
      assert.file([
        'package.json',
        'src/functions.php',
        'src/style.css'
      ]);
    });

    it('init a empty git repository', () => {
      assert.file('.git/HEAD');
    });

    it('set properties in theme banner', () => {
      assert.fileContent('src/style.css', 'Theme Name: My Theme');
      assert.fileContent('src/style.css', 'Text Domain: my-theme');
    });

    it('set the project on package.json', () => {
      assert.fileContent('package.json', '"name": "' + themeName + '"')
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

    it('render the mandatory theme files', () => {
      assert.file([
        'src/functions.php',
        'src/index.php',
        'src/style.css'
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
