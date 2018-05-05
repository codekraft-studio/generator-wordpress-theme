'use strict';

const banner = require('./banner.js');
const chalk = require('chalk');
const path = require('path');
const os = require('os');
const mkdirp = require('mkdirp');
const Generator = require('yeoman-generator');

module.exports = class WPGenerator extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.log(banner);
  }

  // Get the prompt questions by name
  prompting(name = 'defaultPrompt') {
    const prompts = require('./prompts.js')[name](this);
    return this.prompt(prompts).then(props => {
      this.props = props;
      this.log('\nStarting to create the project');
    });
  }

  // Setup the destination path by creating folder if not exists
  setupDestination() {
    let projectName = this.props.projectName;
    if (path.basename(this.destinationPath()) !== projectName) {
      this.log(chalk.yellow(`[!] The project folder for: ${projectName} does not exist.`));
      // Create recursively the folder
      mkdirp(projectName);
      // Set the new destination root
      this.destinationRoot(this.destinationPath(projectName));
      // Inform that the folder will be created
      this.log(
        chalk.yellow('\n[!] Missing project folder named ' + projectName + ' created\n')
      );
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
      this.log('The', chalk.cyan('default'), 'template will be used');
      return done();
    }

    // Get and set the custom template
    let templateDirectory = path.join(os.homedir(), '.wordpress-starter', template);
    this.log('The', chalk.cyan(template), 'custom template will be used');
    this.log('Updating the generator source path to match:', chalk.cyan(templateDirectory));
    this.sourceRoot(templateDirectory);
    done();
  }

  // Setup the project manager configuration files
  setupProjectManager() {
    switch (this.props.projectManager) {
      case 'grunt':
        this.log('Building the project with', chalk.cyan('grunt'), 'as project manager');
        this.fs.copyTpl(this.templatePath('grunt/package.json'), this.destinationPath('./package.json'), this.props);
        this.fs.copy(this.templatePath('grunt/Gruntfile.js'), this.destinationPath('./Gruntfile.js'));
        break;
      case 'gulp':
        this.log('Building the project with', chalk.cyan('gulp'), 'as project manager');
        this.fs.copyTpl(this.templatePath('gulp/package.json'), this.destinationPath('package.json'), this.props);
        this.fs.copy(this.templatePath('gulp/gulpfile.js'), this.destinationPath('gulpfile.js'));
        break;
      default:
        this.log('Building the project without a project manager');
        break;
    }
  }

  install() {
    this.spawnCommandSync('git', ['init', '--quiet']);
    if (!this.options.skipInstall) {
      this.log(chalk.cyan('\n[i] Starting to install the project dependencies\n'));
      this.installDependencies({
        bower: false
      });
    }
  }

  end() {
    this.log('\nYour project is', chalk.bold.yellow('ready'), 'to go', 'We hope you liked to use our generator\n');
  }
};
