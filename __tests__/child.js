const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-wordpress-starter:child', function() {
  describe('with default prompt', function() {
    beforeAll(function() {
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

    it('set the child theme properties', () => {
      assert.fileContent('style.css', `Theme Name:   Wordpress Starter Child`);
      assert.fileContent('style.css', `Description:  This is the Wordpress Starter Child description.`);
      assert.fileContent('style.css', `Template:     wordpress-starter`);
      assert.fileContent('style.css', `Version:      0.0.1`);
      assert.fileContent('style.css', `Text Domain:  wordpress-starter-child`);
      assert.fileContent('style.css', `License:      GPL-2.0`);
    });
  });

  describe('with custom prompt', function() {
    const prompts = {
      parentTemplate: 'test-template',
      projectVersion: '0.1.0',
      projectLicense: 'GPL'
    };

    beforeAll(function() {
      return helpers.run(path.join(__dirname, '../generators/child'))
        .withPrompts(prompts)
        .toPromise();
    });

    it('create a folder named like the parent template', () => {
      assert.equal(path.basename(process.cwd()), `${prompts.parentTemplate}-child`);
    });

    it('create the child theme mandatory files', () => {
      assert.file([
        'style.css',
        'functions.php'
      ]);
    });

    it('set the child theme properties', () => {
      assert.fileContent('style.css', `Theme Name:   Test Template Child`);
      assert.fileContent('style.css', `Description:  This is the Test Template Child description.`);
      assert.fileContent('style.css', `Template:     ${prompts.parentTemplate}`);
      assert.fileContent('style.css', `Version:      ${prompts.projectVersion}`);
      assert.fileContent('style.css', `Text Domain:  ${prompts.parentTemplate}-child`);
      assert.fileContent('style.css', `License:      ${prompts.projectLicense}`);
    });
  });
});
