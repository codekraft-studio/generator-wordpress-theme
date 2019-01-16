'use strict';

const _ = require('lodash');
const {
  validateSlug,
  validateRequired,
  validateVersion
} = require('../../utils/validators');
const BaseGenerator = require('../../utils/generator');

module.exports = class extends BaseGenerator {
  prompting() {
    this.props = {};
    return this.prompt([{
      type: 'text',
      name: 'parentTemplate',
      message: 'What is the parent template slug?',
      default: 'wordpress-starter'
    }, {
      type: 'text',
      name: 'projectName',
      message: 'What slug do you want to use for this project?',
      default: ({
        parentTemplate
      }) => _.kebabCase(`${parentTemplate}-child`),
      validate: validateSlug
    }, {
      name: 'projectTitle',
      message: 'What is the full name for this project?',
      default: ({
        parentTemplate
      }) => _.startCase(`${parentTemplate} Child`),
      validate: validateRequired
    }, {
      type: 'text',
      name: 'projectDescription',
      message: 'What is the project description?',
      default: ({
        projectTitle
      }) => `This is the ${projectTitle} description.`
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
