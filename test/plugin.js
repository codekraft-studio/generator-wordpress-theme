'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-wordpress-starter:plugin', function () {
  describe('with default options', function () {
    var prompts = {
      projectName: 'my-plugin'
    };

    before(function () {
      return helpers.run(path.join(__dirname, '../generators/plugin'))
        .withPrompts(prompts)
        .toPromise();
    });

    it('should create the plugin project files', () => {
      assert.file([
        prompts.projectName + '.php',
        'package.json',
        'include/class-main.php'
      ]);
    });

    it('has the project name set on package.json', () => assert.fileContent('package.json', '"name": "' + prompts.projectName + '"'));

    it('should have the text-domain set with project name value', () => {
      assert.fileContent(prompts.projectName + '.php', '* Text Domain: ' + prompts.projectName);
    });
  });

  describe('with grunt project manager mode', function () {
    before(function () {
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
      ['clean', 'jshint', 'uglify', 'sass', 'makepot'].map(task => assert.fileContent('Gruntfile.js', task + ': '));
    });
  });

  describe('with gulp project manager mode', function () {
    before(function () {
      return helpers.run(path.join(__dirname, '../generators/plugin'))
        .withPrompts({projectManager: 'gulp'})
        .toPromise();
    });

    it('should have a valid Gulpfile', function () {
      assert.file('gulpfile.js');
    });

    it('should have gulp as dependency', () => assert.fileContent('package.json', '"gulp"'));

    it('should have all the gulp dev-dependencies', () => {
      [
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
        'babel-preset-es2015'
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
