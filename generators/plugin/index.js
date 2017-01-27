'use strict';

var WPGenerator = require('../../utils/generator.js');

var pascalCase = function (g0, g1, g2) {
  return g1.toUpperCase() + g2.toLowerCase();
};

module.exports = WPGenerator.extend({

  prompting: WPGenerator.prototype.prompting,

  configuring: WPGenerator.prototype.configuring,

  writing: function () {
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
  },

  install: WPGenerator.prototype.install,

  end: WPGenerator.prototype.end

});
