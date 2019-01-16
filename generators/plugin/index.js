'use strict';

const WPGenerator = require('../../utils/generator.js');

const pascalCase = function (g0, g1, g2) {
  return g1.toUpperCase() + g2.toLowerCase();
};

module.exports = class extends WPGenerator {
  constructor(args, opts) {
    super(args, opts);

    // Add template option for use custom templates
    this.option('template', {
      description: 'Generate the project using a custom template',
      type: String,
      alias: 't'
    });
  }

  prompting() {
    return super.prompting('pluginPrompt');
  }

  // Setup project
  configuring() {
    this.setupDestination();
    this.setupTemplate();
    this.setupProjectManager();
  }

  writing() {
    // Set the class name for the plugin
    this.props.className = this.props.projectName.replace(/(\w)(\w*)/g, pascalCase).replace(/-/g, '_');
    this.props.definePrefix = this.props.className.toUpperCase();

    // Copy all the plugin assets
    this.fs.copy(
      this.templatePath('plugin/assets/**/*'),
      this.destinationPath('assets')
    );

    // Copy the main class file
    this.fs.copyTpl(
      this.templatePath('plugin/include/class-main.php'),
      this.destinationPath('include/class-main.php'),
      this.props
    );

    // Copy the main plugin file
    this.fs.copyTpl(
      this.templatePath('plugin/_plugin.php'),
      this.destinationPath(this.props.projectName + '.php'),
      this.props
    );

    // Copy and compile all the files in plugin root directory
    this.fs.copyTpl(
      this.templatePath('plugin/[^_]*'),
      this.destinationPath(),
      this.props
    );
  }

  install() {
    super.install();
  }

  end() {
    super.end();
  }
};
