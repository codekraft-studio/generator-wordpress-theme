var banner = require('./banner.js');

var Generator = require('yeoman-generator');

var gruntConfig = function (generator) {
  generator.fs.copyTpl(
    generator.templatePath('grunt/_package.json'),
    generator.destinationPath('package.json'),
    generator.props
  );

  generator.fs.copy(
    generator.templatePath('grunt/_Gruntfile.js'),
    generator.destinationPath('Gruntfile.js')
  );
};

var gulpConfig = function (generator) {
  generator.fs.copyTpl(
    generator.templatePath('gulp/_package.json'),
    generator.destinationPath('package.json'),
    generator.props
  );

  generator.fs.copy(
    generator.templatePath('gulp/_gulpfile.js'),
    generator.destinationPath('gulpfile.js')
  );
};

module.exports = Generator.extend({

  constructor: function () {
    Generator.apply(this, arguments);
    this.argument('appname', {type: String, required: false, description: 'The project folder name.'});
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
    switch (this.props.projectManager) {
      case 'gulp':
        gulpConfig(this);
        break;
      default:
        gruntConfig(this);
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
