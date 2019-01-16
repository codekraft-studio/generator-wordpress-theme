'use strict';

const pkg = require('../package.json');
const banner = require('./banner.js');
const chalk = require('chalk');
const path = require('path');
const os = require('os');
const mkdirp = require('mkdirp');
const updateNotifier = require('update-notifier');
const Generator = require('yeoman-generator');

// Check for package updates
updateNotifier({
  pkg
}).notify({
  defer: false,
  isGlobal: true
});

module.exports = class WPGenerator extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.log(banner);

    this.name = path.basename(path.dirname(this.resolved));
    this.sourceRoot(path.join(__dirname, '../generators/templates', this.name));
    this.argument('name', {
      type: String,
      required: false
    });
  }

  // Get the prompt questions by name
  prompting(name = 'defaultPrompt') {
    const prompts = require('./prompts.js')[name](this);
    return this.prompt(prompts).then(props => {
      this.props = props;
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
      this.log('The', chalk.cyan('default'), 'template will be used');
      return done();
    }

    // Get and set the custom template
    let templateDirectory = path.join(os.homedir(), '.wordpress-starter', template);
    this.log('The', chalk.cyan(template), 'custom template will be used');
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
