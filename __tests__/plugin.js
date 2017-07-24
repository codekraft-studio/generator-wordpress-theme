'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-wordpress-starter:plugin', function () {
  // This test describe the default beheviour
  describe('with default options', function () {
    var prompts = {
      projectTitle: 'My Plugin',
      projectName: 'my-plugin'
    };

    beforeEach(function () {
      return helpers.run(path.join(__dirname, '../generators/plugin'))
        .withPrompts(prompts)
        .toPromise();
    });

    it('creates and move in a folder named like the projectName', () => {
      assert.equal(path.basename(process.cwd()), 'my-plugin');
    });

    it('should create the plugin project files', () => {
      assert.file([
        prompts.projectName + '.php',
        'package.json',
        'include/class-main.php',
        'readme.txt'
      ]);
    });

    it('has the project title set on readme.txt file', () => assert.fileContent('readme.txt', '=== ' + prompts.projectTitle + ' ==='));

    it('has the project name set on package.json', () => assert.fileContent('package.json', '"name": "' + prompts.projectName + '"'));

    it('should have the text-domain set with project name value', () => {
      assert.fileContent(prompts.projectName + '.php', '* Text Domain: ' + prompts.projectName);
    });
  });

  // This test describe the grunt project mode
  describe('with grunt project manager mode', function () {
    beforeEach(function () {
      return helpers.run(path.join(__dirname, '../generators/plugin'))
        .withPrompts({projectManager: 'grunt'})
        .toPromise();
    });

    it('should have a valid Gruntfile', function () {
      assert.file('Gruntfile.js');
    });

    it('should have grunt as dependency', () => assert.fileContent('package.json', '"grunt"'));

    it('should have the watch task', () => assert.fileContent('Gruntfile.js', 'watch:'));
    it('should have the build task', () => assert.fileContent('Gruntfile.js', 'build:'));

    it('should have the development basic tasks', () => {
      ['clean', 'jshint', 'uglify', 'sass', 'makepot', 'copy'].map(task => assert.fileContent('Gruntfile.js', task + ': '));
    });
  });

  // This test describe the gulp project mode
  describe('with gulp project manager mode', function () {
    beforeEach(function () {
      return helpers.run(path.join(__dirname, '../generators/plugin'))
        .withPrompts({projectManager: 'gulp'})
        .toPromise();
    });

    it('should have a valid Gulpfile', () => assert.file('gulpfile.js'));

    it('should have gulp as dependency', () => assert.fileContent('package.json', '"gulp"'));

    it('should have all the gulp dev-dependencies', () => {
      [
        'babel-preset-es2015',
        'gulp',
        'gulp-babel',
        'gulp-concat',
        'gulp-help',
        'gulp-notify',
        'gulp-rename',
        'gulp-sass',
        'gulp-uglify',
        'gulp-watch',
        'gulp-wp-pot',
        'merge-stream',
        'del',
        'run-sequence'
      ].map(
        val => assert.fileContent('package.json', '"' + val + '"')
      );
    });

    it('should have the watch task', () => assert.fileContent('gulpfile.js', 'gulp.task(\'watch'));
    it('should have the build task', () => assert.fileContent('gulpfile.js', 'gulp.task(\'build'));

    it('should have the development basic tasks', () => {
      ['uglify', 'sass', 'makepot'].map(task => assert.fileContent('gulpfile.js', 'gulp.task(\'' + task));
    });
  });
});
