'use strict';

const fs = require('fs');
const path = require('path');
const os = require('os');
const _ = require('lodash');

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

const getTemplates = function() {
  let dir = path.join(os.homedir(), '.wordpress-starter');
  if (!fs.existsSync(dir)) {
    return;
  }
  return fs.readdirSync(dir);
};

const validateRequired = function(value) {
  if (value === '') {
    return 'This field is required, please enter a valid value';
  }
  return true;
};

const validateVersion = val => {
  if (!/^\bv?(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)$/.test(val)) {
    return 'You should enter a valid semver version';
  }
  return true;
};

const validateSlug = val => {
  if (!/^(?:[a-z0-9]+-?[a-z0-9]+)+$/g.test(val)) {
    return 'You should follow the WordPress plugin name standard';
  }
  return true;
};

// Export for internal testing
module.exports.validateRequired = validateRequired;
module.exports.validateVersion = validateVersion;
module.exports.validateSlug = validateSlug;

// Theme questions
module.exports.defaultPrompt = function(base) {
  let defaultTemplate = {
    name: 'Default',
    value: ''
  };

  // Try to get any custom existing template
  // in the generator appdata folder on user home directory
  let customTemplates = getTemplates();
  let templateChoices = customTemplates ? [defaultTemplate].concat(customTemplates) : [defaultTemplate];

  return [{
    type: 'text',
    name: 'projectName',
    message: 'What slug do you want to use for this project?',
    default: _.kebabCase(base.options ? base.options.name : base.appname),
    validate: validateSlug
  }, {
    name: 'projectTitle',
    message: 'What is the full name for this project?',
    default: function(answers) {
      return _.startCase(_.toLower(answers.projectName));
    },
    validate: validateRequired
  }, {
    type: 'text',
    name: 'projectDescription',
    message: 'What is the project description?',
    default: function(answers) {
      return 'This is the ' + answers.projectTitle + ' description';
    }
  }, {
    type: 'list',
    name: 'projectTemplate',
    message: 'Which template do you want to use?',
    default: function() {
      let template = base.options.template;
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
    default: function() {
      return (base.options.template) ?
        0 :
        defaultProjectManager;
    }
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
    default: base.user.git.name() || ''
  }, {
    type: 'text',
    name: 'projectLicense',
    message: 'What license do you want to use?',
    default: 'ISC',
    validate: validateRequired
  }];
};

// Plugin questions
module.exports.pluginPrompt = base => ([{
  type: 'text',
  name: 'projectName',
  message: 'What slug do you want to use for this project?',
  default: _.kebabCase(base.options ? base.options.name : base.appname),
  validate: validateSlug
}, {
  name: 'projectTitle',
  message: 'What is the full name for this project?',
  default: function(answers) {
    return _.startCase(_.toLower(answers.projectName));
  },
  validate: validateRequired
}, {
  type: 'text',
  name: 'projectDescription',
  message: 'What is the project description?',
  default: function(answers) {
    return 'This is the ' + answers.projectTitle + ' description';
  }
}, {
  type: 'list',
  name: 'projectManager',
  message: 'What do you want to use as project manager?',
  choices: projectManagers,
  default: 'grunt'
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
  default: base.user.git.name() || ''
}, {
  type: 'text',
  name: 'projectLicense',
  message: 'What license do you want to use?',
  default: 'ISC',
  validate: validateRequired
}]);

// Child theme prompt questions
module.exports.childPrompt = base => ([{
  type: 'text',
  name: 'parentTemplate',
  message: 'What is the parent template slug?',
  default: 'wordpress-starter'
}, {
  type: 'text',
  name: 'projectName',
  message: 'What slug do you want to use for this project?',
  default: answers => _.kebabCase(`${answers.parentTemplate}-child`),
  validate: validateSlug
}, {
  name: 'projectTitle',
  message: 'What is the full name for this project?',
  default: answers => {
    return _.startCase(`${answers.parentTemplate} Child`);
  },
  validate: validateRequired
}, {
  type: 'text',
  name: 'projectDescription',
  message: 'What is the project description?',
  default: answers => {
    return `This is the ${answers.projectTitle} description.`;
  }
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
  default: base.user.git.name() || ''
}, {
  type: 'text',
  name: 'projectLicense',
  message: 'What license do you want to use?',
  default: 'ISC',
  validate: validateRequired
}]);
