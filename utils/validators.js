'use strict';

module.exports.validateRequired = function(value) {
  if (!value || value === '') {
    return 'This field is required, please enter a valid value';
  }
  return true;
};

module.exports.validateVersion = val => {
  if (!/^\bv?(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)$/.test(val)) {
    return 'You should enter a valid semver version';
  }
  return true;
};

module.exports.validateSlug = val => {
  if (!/^(?:[a-z0-9]+-?[a-z0-9]+)+$/g.test(val)) {
    return 'You should follow the WordPress plugin name standard';
  }
  return true;
};
