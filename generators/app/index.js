'use strict';

var Generator = require('yeoman-generator');
var banner = require('../../utils/banner.js');

module.exports = Generator.extend({

  prompting: function () {
    // Show the banner
    this.log(banner);

    // Get the questions
    var prompts = require('../../utils/prompts.js')(this);

    // Run it
    return this.prompt(prompts).then(function (props) {
      this.props = props;
    }.bind(this));
  },

  writing: {

    config: function () {
      // Copy and build the package file
      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'),
        this.props
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

      // Copy the gruntfile
      this.fs.copy(
        this.templatePath('_Gruntfile.js'),
        this.destinationPath('Gruntfile.js')
      );
    },

    theme: function () {
      // Copy all the theme files
      this.fs.copy(
        this.templatePath('theme/**/*'),
        this.destinationPath('src/')
      );
    }

  },

  install: function () {
    this.installDependencies({bower: false});
  }

});
