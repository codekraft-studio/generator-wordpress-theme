'use strict';

const chalk = require('chalk');
const WPGenerator = require('../../utils/generator.js');

module.exports = class extends WPGenerator {

  initializing() {
    super.initializing();
  }

  prompting() {
    return super.prompting();
  }

  configuring() {
    super.configuring();
  }

  writing() {
    this.log(chalk.cyan('[i] Starting to copy the template files into folder.\n'));

    // Copy and compile all the theme source files
    // related with the web development
    this.fs.copyTpl(
      this.templatePath('theme/**/*.{md,txt,js,coffee,ts,html,manifest,php,asp,css,scss,sass}'),
      this.destinationPath('src/'),
      this.props
    );

    try {
      // Copy all other assets file that probably don't need interpolation
      // related with the web commonly used assets formats
      this.fs.copy(
        this.templatePath('theme/**/*.{ico,gif,png,jpg,jpeg,svg,webp,woff,woff2,otf,ttf}'),
        this.destinationPath('src/')
      );
    } catch (e) { }
  }

  install() {
    super.install();
  }

  end() {
    super.end();
  }

};
