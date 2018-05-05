'use strict';

const _ = require('lodash');
const WPGenerator = require('../../utils/generator.js');

module.exports = class extends WPGenerator {
  prompting() {
    return super.prompting('childPrompt');
  }

  // Setup project
  configuring() {
    this.setupDestination();
  }

  writing() {
    this.props.functionPrefix = _.snakeCase(this.props.projectName);
    this.fs.copyTpl(
      this.templatePath('**/*'),
      this.destinationPath(''),
      this.props
    );
  }

  install() {
    super.install();
  }

  end() {
    super.end();
  }
};
