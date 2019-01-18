'use strict';

const _ = require('lodash');
const Jimp = require('jimp');
const chalk = require('chalk');
const {
  validateSlug,
  validateRequired,
  validateVersion
} = require('../../utils/validators');
const getTemplates = require('../../utils/get-templates');
const measureText = require('../../utils/measure-text');
const BaseGenerator = require('../../utils/generator');

const defaultProjectManager = 'webpack';
const projectManagers = [{
  name: 'Nothing',
  value: ''
}, {
  name: 'Grunt',
  value: 'grunt'
}, {
  name: 'Gulp',
  value: 'gulp'
}, {
  name: 'Webpack',
  value: 'webpack'
}];

module.exports = class extends BaseGenerator {
  constructor(args, opts) {
    super(args, opts);

    // Option to skip the dinamic custom screenshot creation
    // mainly for internal use since the tests fail with multiple jimp instances
    this.option('skipScreenshot', {
      description: 'Skip the dinamic screenshot creation',
      type: Boolean,
      hide: true
    });

    // Add template option for use custom templates
    this.option('template', {
      description: 'Generate the project using a custom template',
      type: String,
      alias: 't'
    });
  }

  prompting() {
    const templates = [{
      name: 'Default',
      value: ''
    }];
    const customTemplates = getTemplates();
    const templateChoices = customTemplates ? templates.concat(customTemplates) : templates;

    this.props = {};
    return this.prompt([{
      type: 'text',
      name: 'projectName',
      message: 'What slug do you want to use for this project?',
      default: () => _.kebabCase(this.options ? this.options.name : this.appname),
      validate: validateSlug
    }, {
      name: 'projectTitle',
      message: 'What is the full name for this project?',
      default: ({
        projectName
      }) => _.startCase(_.toLower(projectName)),
      validate: validateRequired
    }, {
      type: 'text',
      name: 'projectDescription',
      message: 'What is the project description?',
      default: ({
        projectTitle
      }) => `This is the ${projectTitle} description`
    }, {
      type: 'list',
      name: 'projectTemplate',
      message: 'Which template do you want to use?',
      default: () => {
        let template = this.options.template;
        if (!template) {
          return '';
        }
        let index = templateChoices.indexOf(template);
        return (index > -1) ?
          template :
          '';
      },
      choices: templateChoices,
      // Show this prompt only if any custom template exists
      // otherwise it will be useless and probably cause bugs
      when: function() {
        return customTemplates && customTemplates.length;
      }
    }, {
      type: 'list',
      name: 'projectManager',
      message: 'What do you want to use as project manager?',
      choices: projectManagers,
      default: defaultProjectManager
    }, {
      type: 'text',
      name: 'projectVersion',
      message: 'The version to initialize this project',
      default: '0.0.1',
      validate: validateVersion
    }, {
      type: 'text',
      name: 'projectAuthor',
      message: 'The name of the author for this project?',
      default: this.user.git.name() || ''
    }, {
      type: 'text',
      name: 'projectLicense',
      message: 'What license do you want to use?',
      default: 'GPL-2.0',
      validate: validateRequired
    }]).then(props => {
      this.props = props;
    });
  }

  // Setup project
  configuring() {
    this.setupDestination();
    this.setupTemplate();
    this.setupProjectManager();
  }

  writing() {
    // Copy and compile all the theme source files
    // related with the web development
    this.fs.copyTpl(
      this.templatePath('theme/**/*.{md,txt,js,coffee,ts,html,manifest,php,asp,css,scss,sass}'),
      this.destinationPath('src/'),
      this.props
    );

    // Copy all other assets file that probably don't need interpolation
    // related with the web commonly used assets formats
    try {
      this.fs.copy(
        this.templatePath('theme/**/*.{ico,gif,png,jpg,jpeg,svg,webp,woff,woff2,otf,ttf}'),
        this.destinationPath('src/')
      );
    } catch (e) {
      // continue regardless of error
    }
  }

  // Create the theme screenshot image
  createScreenshot() {
    if (this.options.skipScreenshot) {
      return;
    }

    const self = this;
    const callback = self.async();

    // The screenshot measures
    const measures = {
      width: 1200,
      height: 900
    };

    // TODO: Derive the screenshot backgorund color from the projectName in range of colors
    // Get the screenshot background color
    const bgColor = 0x4286f4;

    // Load the font to write text
    Jimp.loadFont(Jimp.FONT_SANS_32_WHITE, function(err, font) {
      if (err) {
        callback();
        return;
      }

      // Create a new image from nothing
      new Jimp(measures.width, measures.height, bgColor, function(err, image) {
        if (err) {
          self.log('The png file creation', chalk.red('failed'), 'skipping this step');
          callback();
          return;
        }

        // Prepare text to write on png
        let text = self.props.projectName.toUpperCase();
        let totalWidth = measureText(font, text);
        let position = {
          width: Math.floor((measures.width / 2) - (totalWidth / 2)),
          height: Math.floor(measures.height / 2 - 16)
        };

        // Writo text into file center
        let outputFile = self.destinationPath('src/screenshot.png');
        image.print(font, position.width, position.height, text);

        // Write the image to disk
        image.write(outputFile, function() {
          callback();
        });
      });
    });
  }

  install() {
    super.install();
  }

  end() {
    super.end();
  }
};
