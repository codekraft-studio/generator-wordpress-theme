const {
  validateSlug,
  validateRequired,
  validateVersion
} = require('../utils/validators');

describe('utils.validators', () => {
  it('validate required input', () => {
    expect(validateRequired()).toEqual('This field is required, please enter a valid value')
    expect(validateRequired('foo')).toEqual(true)
  })

  it('validate version number', () => {
    expect(validateVersion('x.6qq-8')).toEqual('You should enter a valid semver version')
    expect(validateVersion('0.0.0.0.0')).toEqual('You should enter a valid semver version')
    expect(validateVersion('0.x')).toEqual('You should enter a valid semver version')
    expect(validateVersion('0.1.0')).toEqual(true)
    expect(validateVersion('1.12.0')).toEqual(true)
  })

  it('validate slug name', () => {
    expect(validateSlug('my theme')).toEqual('You should follow the WordPress plugin name standard')
    expect(validateSlug('My_Theme')).toEqual('You should follow the WordPress plugin name standard')
    expect(validateSlug('MyTheme')).toEqual('You should follow the WordPress plugin name standard')
    expect(validateSlug('my-theme')).toEqual(true)
    expect(validateSlug('my-long-theme-name')).toEqual(true)
  })
})
