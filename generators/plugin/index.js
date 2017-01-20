'use strict';
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

var banner = require('../../utils/banner.js');

module.exports = Generator.extend({

  prompting: function () {

    // Show the banner
    this.log(banner);

    // Get the questions
    var prompts = require('../../utils/prompts.js')(this);

    // Run it
    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
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

      // Copy the gruntfile
      this.fs.copy(
        this.templatePath('_Gruntfile.js'),
        this.destinationPath('Gruntfile.js')
      );

    },

    plugin: function() {

      // Copy all the assets files
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
        this.destinationPath( this.props.projectName + '.php' ),
        this.props
      );

    }

  },

  install: function () {
    this.installDependencies({bower: false});
  }

});
