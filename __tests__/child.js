'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-wordpress-starter:child', function () {
  describe('with default prompt', function () {
    beforeAll(function () {
      return helpers.run(path.join(__dirname, '../generators/child'))
        .withPrompts()
        .toPromise();
    });

    it('creates and move in a folder named like the projectName', () => {
      assert.equal(path.basename(process.cwd()), 'wordpress-starter-child');
    });

    it('should create the plugin project files', () => {
      assert.file([
        'style.css',
        'functions.php'
      ]);
    });

    it('set the project title', () => assert.fileContent('style.css', `Theme Name:   Wordpress Starter Child`));
    it('set the project description', () => assert.fileContent('style.css', `Description:  This is the Wordpress Starter Child description.`));
    it('set the project parent template', () => assert.fileContent('style.css', `Template:     wordpress-starter`));
    it('set the project version', () => assert.fileContent('style.css', `Version:      0.0.1`));
    it('set the project text-domain', () => assert.fileContent('style.css', `Text Domain:  wordpress-starter-child`));
    it('set the project license', () => assert.fileContent('style.css', `License:      ISC`));
  });

  describe('with custom prompt', function () {
    const prompts = {
      parentTemplate: 'test-template',
      projectVersion: '0.1.0',
      projectLicense: 'GPL'
    };

    beforeAll(function () {
      return helpers.run(path.join(__dirname, '../generators/child'))
        .withPrompts(prompts)
        .toPromise();
    });

    it('creates and move in a folder named like the projectName', () => {
      assert.equal(path.basename(process.cwd()), `${prompts.parentTemplate}-child`);
    });

    it('should create the plugin project files', () => {
      assert.file([
        'style.css',
        'functions.php'
      ]);
    });

    it('set the project title', () => assert.fileContent('style.css', `Theme Name:   Test Template Child`));
    it('set the project description', () => assert.fileContent('style.css', `Description:  This is the Test Template Child description.`));
    it('set the project parent template', () => assert.fileContent('style.css', `Template:     ${prompts.parentTemplate}`));
    it('set the project version', () => assert.fileContent('style.css', `Version:      ${prompts.projectVersion}`));
    it('set the project text-domain', () => assert.fileContent('style.css', `Text Domain:  ${prompts.parentTemplate}-child`));
    it('set the project license', () => assert.fileContent('style.css', `License:      ${prompts.projectLicense}`));
  });
});
