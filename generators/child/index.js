'use strict';

const path = require('path')
const chalk = require('chalk')
const mkdirp = require('mkdirp')
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
  }

  prompting() {
    const prompts = require('./../../utils/prompts.js').childPrompt(this);

    return this.prompt(prompts).then(props => {
      this.props = props;
      this.log('\nStarting to create the project');
    });
  }

  setupDestination() {
    let projectName = `${this.props.parentTemplate}-child`;
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

  configuring() {
    this.setupDestination();

    this.fs.copyTpl(
      this.templatePath('**/*'),
      this.destinationPath(''),
      this.props
    );

    // Init an empty repository
    this.spawnCommandSync('git', ['init', '--quiet']);
  }

  end() {
    this.log('\nYour project is', chalk.bold.yellow('ready'), 'to go', 'We hope you liked to use our generator\n');
  }
};
