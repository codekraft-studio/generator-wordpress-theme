'use strict';

var chalk = require('chalk');
var WPGenerator = require('../../utils/generator.js');

module.exports = WPGenerator.extend({

  initializing: WPGenerator.prototype.initializing,

  prompting: WPGenerator.prototype.prompting,

  configuring: WPGenerator.prototype.configuring,

  writing: function () {
    this.log(chalk.cyan('[i] Starting to copy the template files into folder.\n'));

    // TODO: The glob pattern needs to be refined with all the scripting possibilities
    // Copy and compile all the theme source files
    this.fs.copyTpl(
      this.templatePath('theme/**/*.{js,php,css,scss}'),
      this.destinationPath('src/'),
      this.props
    );

    // TODO: Find a glob that is the opposite of this: *.{js,php,css,scss}
    // trying to do something more comprehensive
    // Copy all other assets file that probably don't need interpolation
    this.fs.copy(
      this.templatePath('theme/**/*.{png,gif,jpg}'),
      this.destinationPath('src/')
    );
  },

  install: WPGenerator.prototype.install,

  end: WPGenerator.prototype.end

});
