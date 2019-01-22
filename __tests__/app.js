'use strict';

const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-wordpress-theme:app', () => {
  describe('default execution', () => {
    const themeName = 'my-theme'
    const themePrefix = 'my_theme'

    beforeAll(() => {
      jest.setTimeout(10000)
      return helpers.run(path.join(__dirname, '../generators/app'))
        .withPrompts({projectName: themeName})
        .toPromise();
    });

    it('create a folder named like the projectName', () => {
      assert.equal(path.basename(process.cwd()), themeName);
    });

    it('creates mandatory wordpress files', () => {
      assert.file([
        'src/index.php',
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

    it('create the package.json file', () => {
      assert.fileContent('package.json', `"name": "${themeName}"`)
    });

    it('create the theme screenshot file', () => {
      assert.file('src/screenshot.png');
    });

    it('prefix functions with theme slug', () => {
      assert.fileContent('src/functions/template-functions.php', `function ${themePrefix}_pagination() {`)
    });
  });

  describe('without project manager', () => {
    beforeAll(() => {
      return helpers.run(path.join(__dirname, '../generators/app'))
        .withPrompts({projectManager: ''})
        .withOptions({
          'skip-screenshot': true
        })
        .toPromise();
    });

    it('creates mandatory wordpress files', () => {
      assert.file([
        'src/index.php',
        'src/functions.php',
        'src/style.css'
      ]);
    });

    it('does not copy any project manager file', () => {
      assert.noFile([
        'package.json',
        'Gruntfile.js',
        'gulpfile.js',
        'webpack.config.js'
      ]);
    });
  });

  describe('non existing template', () => {
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
});
