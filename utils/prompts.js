module.exports = function (base) {
  var validateRequired = function (value) {
    if (value === '') {
      return 'This field is required, please enter a valid value.';
    }
    return true;
  };

  return [
    {
      type: 'text',
      name: 'projectName',
      message: 'What slug do you want to use for this project?',
      default: base.appname.replace(/\s/g, '-').toLowerCase(),
      validate: function (input) {
        if (!/^(?:[a-z]+-[a-z]+)+$/g.test(input)) {
          return 'You should follow the WordPress plugin name standard.';
        }
        return true;
      }
    },
    {
      name: 'projectTitle',
      message: 'What is the full name for this project?',
      default: function (answers) {
        return answers.projectName.replace(/-/g, ' ').replace(/\w\S*/g, function (txt) {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
      },
      validate: validateRequired
    },
    {
      type: 'text',
      name: 'projectDescription',
      message: 'What is the project description?',
      default: function (answers) {
        return 'This is the ' + answers.projectTitle + ' description.';
      }
    },
    {
      type: 'text',
      name: 'projectManager',
      message: 'Do you want to use grunt or gulp as your build system?',
      default: 'grunt',
      validate: function (input) {
        if (['grunt', 'gulp'].indexOf(input) === -1) {
          return 'You must use grunt or gulp.';
        }
        return true;
      }
    },
    {
      type: 'text',
      name: 'projectVersion',
      message: 'The version to initialize this project.',
      default: '0.0.1',
      validate: validateRequired
    },
    {
      type: 'text',
      name: 'projectAuthor',
      message: 'The name of the author for this project?',
      default: base.user.git.name() || ''
    },
    {
      type: 'text',
      name: 'projectLicense',
      message: 'What license do you want to use?',
      default: 'ISC',
      validate: validateRequired
    }
  ];
};
