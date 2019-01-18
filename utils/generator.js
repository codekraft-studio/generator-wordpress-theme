'use strict';

const pkg = require('../package.json');
const banner = require('./banner.js');
const chalk = require('chalk');
const fs = require('fs');
const os = require('os');
const path = require('path');
const mkdirp = require('mkdirp');
const updateNotifier = require('update-notifier');
const Generator = require('yeoman-generator');

const wpToolsDir = path.join(os.homedir(), '.wptools');
const templatesDir = path.join(wpToolsDir, 'themes');

// Check for package updates
updateNotifier({
  pkg
}).notify({
  defer: false,
  isGlobal: true
});

module.exports = class BaseGenerator extends Generator {
  constructor(args, opts) {
    super(args, opts);
    if (!fs.existsSync(wpToolsDir)) {
      mkdirp.sync(templatesDir);
    }

    this.log(banner);
    this.genName = path.basename(path.dirname(this.resolved));
    this.sourceRoot(path.join(__dirname, '../generators/templates', this.genName));
    this.argument('name', {
      type: String,
      required: false
    });
  }

  // Setup the destination path by creating folder if not exists
  setupDestination() {
    let projectName = this.props.projectName;
    if (path.basename(this.destinationPath()) !== projectName) {
      mkdirp(projectName);
      this.destinationRoot(this.destinationPath(projectName));
    }
  }

  // Setup the template source path
  setupTemplate() {
    let done = this.async();
    let template = this.props.projectTemplate;

    // If no template just use the default
    // or custom template has errored
    if (!template || template === '') {
      this.props.projectTemplate = '';
      return done();
    }

    // Get and set the custom template
    let templateDirectory = path.join(templatesDir, template);
    this.sourceRoot(templateDirectory);
    done();
  }

  // Setup the project manager configuration files
  setupProjectManager() {
    const pm = this.props.projectManager
    const ignores = []

    switch (pm) {
      case 'grunt':
      case 'gulp':
      case 'webpack':
        ignores.push('node_modules', 'dist');
        this.fs.copyTpl(
          this.templatePath(`${pm}/package.json`),
          this.destinationPath('./package.json'),
          this.props
        );
        this.fs.copy(
          [
            this.templatePath(`${pm}/*`),
            "!**/package.json"
          ],
          this.destinationPath()
        );
        break;
      default:
        break;
    }

    this.fs.write(
      this.destinationPath('.gitignore'),
      ignores.join('\n')
    )
  }

  install() {
    this.spawnCommandSync('git', ['init', '--quiet']);
    if (!this.options.skipInstall && this.props.projectManager !== '') {
      this.log('\nInstalling the project dependencies');
      this.installDependencies({
        bower: false,
        npm: true
      });
    }
  }

  end() {
    this.log('\nYour project is', chalk.bold.yellow('ready'), 'to go!');
  }
};
