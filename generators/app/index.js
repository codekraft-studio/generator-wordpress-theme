'use strict';

var chalk = require('chalk');
var WPGenerator = require('../../utils/generator.js');

module.exports = WPGenerator.extend({

  initializing: WPGenerator.prototype.initializing,

  prompting: WPGenerator.prototype.prompting,

  configuring: WPGenerator.prototype.configuring,

  writing: function () {
    this.log(chalk.cyan('[i] Starting to copy the template files into folder.\n'));

    // Copy and compile all the theme source files
    // related with the web development
    this.fs.copyTpl(
      this.templatePath('theme/**/*.{md,txt,js,coffee,ts,html,manifest,php,asp,css,scss,sass}'),
      this.destinationPath('src/'),
      this.props
    );

    // Copy all other assets file that probably don't need interpolation
    // related with the web commonly used assets formats
    this.fs.copy(
      this.templatePath('theme/**/*.{ico,gif,png,jpg,jpeg,svg,webp,woff,woff2,otf,ttf}'),
      this.destinationPath('src/')
    );
  },

  install: WPGenerator.prototype.install,

  end: WPGenerator.prototype.end

});
