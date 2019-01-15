'use strict';

const Jimp = require('jimp');
const chalk = require('chalk');
const WPGenerator = require('../../utils/generator.js');

const measureText = function(font, text) {
  let x = 0;
  for (let i = 0; i < text.length; i++) {
    if (font.chars[text[i]]) {
      x += font.chars[text[i]].xoffset + (font.kernings[text[i]] && font.kernings[text[i]][text[i + 1]]
        ? font.kernings[text[i]][text[i + 1]]
        : 0) + (font.chars[text[i]].xadvance || 0);
    }
  }
  return x;
};

module.exports = class extends WPGenerator {
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
    return super.prompting('defaultPrompt');
  }

  // Setup project
  configuring() {
    this.setupDestination();
    this.setupTemplate();
    this.setupProjectManager();
  }

  writing() {
    this.log('Starting to copy the template files\n');

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
    } catch (e) {}
  }

  // Create the theme screenshot image
  createScreenshot() {

    // Optionally skip this section
    if(this.options.skipScreenshot) {
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
      if( err ) {
        callback();
        return;
      }

      // Create a new image from nothing
      new Jimp(measures.width, measures.height, bgColor, function(err, image) {
        if( err ) {
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
        image.write(outputFile, function(err) {
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
