'use strict';

const chalk = require('chalk');
const WPGenerator = require('../../utils/generator.js');
const Jimp = require('jimp');

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

  // Init generator with custom options
  constructor(args, opts) {
    super(args, opts);

    // Option to skip the dinamic custom screenshot creation
    // mainly for internal use since the tests fail with multiple jimp instances
    this.option('skipScreenshot', {
      description: 'Skip the dinamic screenshot creation.',
      type: Boolean,
      hide: true
    });
  }

  initializing() {
    super.initializing();
  }

  prompting() {
    return super.prompting();
  }

  configuring() {
    super.configuring();
  }

  writing() {
    this.log(chalk.cyan('[i] Starting to copy the template files into folder.\n'));

    // Copy and compile all the theme source files
    // related with the web development
    this.fs.copyTpl(
      this.templatePath('theme/**/*.{md,txt,js,coffee,ts,html,manifest,php,asp,css,scss,sass}'),
      this.destinationPath('src/'),
      this.props
    );

    try {
      // Copy all other assets file that probably don't need interpolation
      // related with the web commonly used assets formats
      this.fs.copy(
        this.templatePath('theme/**/*.{ico,gif,png,jpg,jpeg,svg,webp,woff,woff2,otf,ttf}'),
        this.destinationPath('src/')
      );
    } catch (e) { }
  }

  // Create the theme screenshot image
  createScreenshot() {

    // Optionally skip this section
    if(this.options.skipScreenshot) {
      return;
    }

    var self = this;
    var callback = self.async();

    // The screenshot measures
    var measures = {
      width: 1200,
      height: 900
    };

    // TODO: Derive the screenshot backgorund color from the projectName in range of colors
    // Get the screenshot background color
    var bgColor = 0x4286f4;

    // Load the font to write text
    Jimp.loadFont(Jimp.FONT_SANS_32_WHITE, function(err, font) {

      if( err ) {
        callback();
        return;
      }

      self.log(chalk.cyan(`[i] Creating a [${measures.width}x${measures.height}] png file.`));

      // Create a new image from nothing
      var image = new Jimp(measures.width, measures.height, bgColor, function(err, image) {

        if( err ) {
          self.log(chalk.red('[e] The png file creation failed, skipping this step.'));
          callback();
          return;
        }

        let text = self.props.projectName.toUpperCase();

        // Get the text total width
        let totalWidth = measureText(font, text);

        // Get the item position
        let position = {
          width: Math.floor((measures.width / 2) - (totalWidth / 2)),
          height: Math.floor(measures.height / 2 - 16)
        };

        // Build the output file path
        let outputFile = self.destinationPath('src/screenshot.png');

        self.log(chalk.cyan(`[i] Printing the project name: ${text} on image.`));

        // Print the text on the screenshot
        image.print(font, position.width, position.height, text);

        self.log(chalk.cyan(`[i] Saving image to: 'src/screenshot.png'.`));

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
