'use strict';

var chalk = require('chalk');
var WPGenerator = require('../../utils/generator.js');

module.exports = WPGenerator.extend({

  initializing: WPGenerator.prototype.initializing,

  prompting: WPGenerator.prototype.prompting,

  configuring: WPGenerator.prototype.configuring,

  writing: function () {
    this.log(chalk.cyan('[i] Starting to copy the template files into folder.\n'));

    // Copy and compile all the theme files
    this.fs.copyTpl(
      this.templatePath('theme/**/*'),
      this.destinationPath('src/'),
      this.props
    );

    // Copy and compile the banner file
    this.fs.copyTpl(
      this.templatePath('_banner.scss'),
      this.destinationPath('src/assets/src/scss/base/banner.scss'),
      this.props
    );
  },

  install: WPGenerator.prototype.install,

  end: WPGenerator.prototype.end

});
