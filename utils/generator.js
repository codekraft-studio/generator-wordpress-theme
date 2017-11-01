'use strict';

const banner = require('./banner.js');
const chalk = require('chalk');
const path = require('path');
const mkdirp = require('mkdirp');
const fs = require('fs');
const Generator = require('yeoman-generator');

module.exports = class WPGenerator extends Generator {
  // Init generator with custom options
  constructor(args, opts) {
    super(args, opts);

    // Add template option for use custom templates
    this.option('template', {
      description: 'Generate the project using a custom template.',
      type: String,
      alias: 't'
    });
  }

  // Inizialize the generator by checking the options
  initializing() {
    this.log(chalk.cyan('\n[i] The generator has started the build process...'));
    let done = this.async();

    // If custom template is specified
    if (this.options.template && this.options.template !== '') {
      this.log(
        chalk.cyan('[i] A custom template named', chalk.bold.blue(this.options.template), 'will be used for generate the project.')
      );

      // The home directory
      let home = require('os').homedir();

      // Build the template path based on home directory
      let templateDirectory = path.join(home, '.wordpress-starter', this.options.template);

      // Show the custom template folder path
      this.log(
        chalk.cyan('[i] Trying to locate and use the template in the folder:'),
        chalk.underline.bold(templateDirectory)
      );

      // Check if the template folder exists and is not empty
      if (!fs.existsSync(templateDirectory) || !fs.readdirSync(templateDirectory).length) {
        this.log(chalk.bold.yellow('[!] The selected template directory does not exists, is empty or it does not contain a valid template.\n'));

        // Ask to the user if he still want continue with the default action
        this.prompt([
          {
            type: 'confirm',
            name: 'continue',
            message: 'Do you want to continue using the default theme instead?'
          }
        ]).then(function (props) {
          // Exit if user wants it
          if (!props.continue) {
            // Alter default exception function so the following error isn't showd
            process.on('uncaughtException', () => {
              this.log(chalk.cyan('\n[i] The generator is quitting, thank you for using it!\n'));
            });

            // Exit with error
            done(true);
            return;
          }

          // Inform the use that the default template will be used
          this.log(chalk.cyan('\n[i] The generator will use the default template.'));
          this.options.template = false;
          done();
        }.bind(this));
      } else {
        this.sourceRoot(templateDirectory);
        this.log(chalk.cyan('[i] The template was found and the source root has been updated.'));
        done();
      }
    } else {
      this.log(chalk.cyan('[i] The default template will be used to generate the project.'));
      done();
    }
  }

  prompting() {
    // Show the banner
    this.log(banner);

    // Get the questions
    const prompts = require('./prompts.js').prompt(this);

    // Run it
    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  configuring() {
    // Create the project folder if not matching current working directory
    if (path.basename(this.destinationPath()) !== this.props.projectName) {
      // Create recursively the folder
      mkdirp(this.props.projectName);
      // Set the new destination root
      this.destinationRoot(this.destinationPath(this.props.projectName));
      // Inform that the folder will be created
      this.log(
        chalk.yellow('\n[!] Missing project folder named ' + this.props.projectName + ' created.\n')
      );
    }

    switch (this.props.projectManager) {
      case 'gulp':
        this.log(chalk.cyan('\n[i] Building the project with', chalk.bold('gulp.')));

        this.fs.copyTpl(
          this.templatePath('gulp/package.json'),
          this.destinationPath('package.json'),
          this.props
        );

        this.fs.copy(
          this.templatePath('gulp/gulpfile.js'),
          this.destinationPath('gulpfile.js')
        );
        break;
      case 'grunt':
        this.log(chalk.cyan('\n[i] Building the project with', chalk.bold('grunt.')));
        this.fs.copyTpl(
          this.templatePath('grunt/package.json'),
          this.destinationPath('./package.json'),
          this.props
        );

        this.fs.copy(
          this.templatePath('grunt/Gruntfile.js'),
          this.destinationPath('./Gruntfile.js')
        );
        break;
      default:
        this.log(chalk.cyan('\n[i] Building the project without a build system.'));
        break;
    }
  }

  install() {
    if (!this.options.skipInstall) {
      this.log(chalk.cyan('\n[i] Starting to install the project dependencies.\n'));
      this.installDependencies({
        bower: false
      });
    }
  }

  end() {
    this.log('\nYour project is', chalk.bold.yellow('ready'), 'to go.', 'We hope you liked to use our generator.\n');
  }
};
