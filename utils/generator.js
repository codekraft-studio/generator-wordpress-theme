var banner = require('./banner.js');
var chalk = require('chalk');
var path = require('path');
var mkdirp = require('mkdirp');
var Generator = require('yeoman-generator');

module.exports = Generator.extend({

  constructor: function () {
    Generator.apply(this, arguments);
  },

  prompting: function () {
    // Show the banner
    this.log(banner);

    // Get the questions
    var prompts = require('./prompts.js')(this);

    // Run it
    return this.prompt(prompts).then(function (props) {
      this.props = props;
    }.bind(this));
  },

  configuring: function () {
    // Create the project folder if not matching current working directory
    if (path.basename(this.destinationPath()) !== this.props.projectName) {
      this.log(chalk.yellow('\n! Missing project folder named ' + this.props.projectName + ' created.\n'));
      mkdirp(this.props.projectName);
      this.destinationRoot(this.destinationPath(this.props.projectName));
    }

    switch (this.props.projectManager) {
      case 'gulp':
        this.fs.copyTpl(
          this.templatePath('gulp/_package.json'),
          this.destinationPath('package.json'),
          this.props
        );

        this.fs.copy(
          this.templatePath('gulp/_gulpfile.js'),
          this.destinationPath('gulpfile.js')
        );
        break;
      default:
        this.fs.copyTpl(
          this.templatePath('grunt/_package.json'),
          this.destinationPath('./package.json'),
          this.props
        );

        this.fs.copy(
          this.templatePath('grunt/_Gruntfile.js'),
          this.destinationPath('./Gruntfile.js')
        );
        break;
    }
  },

  install: function () {
    this.installDependencies({
      bower: false
    });
  },

  end: function () {
    this.log('\nYour project is ready, everything was installed successfully. Ciao!');
  }

});
