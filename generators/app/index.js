'use strict';

var WPGenerator = require('../../utils/generator.js');

module.exports = WPGenerator.extend({

  prompting: WPGenerator.prototype.prompting,

  configuring: WPGenerator.prototype.configuring,

  writing: function () {
    // Copy all the theme files
    this.fs.copy(
      this.templatePath('theme/**/*'),
      this.destinationPath('src/')
    );

    // Copy the theme function file
    this.fs.copyTpl(
      this.templatePath('_functions.php'),
      this.destinationPath('src/functions.php'),
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
