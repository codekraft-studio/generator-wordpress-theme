const BaseGenerator = require('../utils/generator');
const assert = require('yeoman-assert');

describe('generator-wordpress-theme:base-generator', () => {
  it('has a initializing method to check command line options', () => {
    assert.implement(BaseGenerator, 'initializing');
  });

  it('has a prompting method to get project variables', () => {
    assert.implement(BaseGenerator, 'prompting');
  });

  it('has a configuring method to check prompt results', () => {
    assert.implement(BaseGenerator, 'configuring');
  });

  it('has a install method to optionally install dependencies', () => {
    assert.implement(BaseGenerator, 'install');
  });

  it('has a end method to say goodbye', () => {
    assert.implement(BaseGenerator, 'end');
  });
});
