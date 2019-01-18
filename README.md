![banner](banner.jpg)

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url] [![Slack Chat](https://img.shields.io/badge/wordpress_slack-@codekraft--studio-blue.svg?style=flat)](https://wordpress.slack.com)

# generator-wordpress-theme

> Yeoman generator for WordPress themes, childs and custom templates

## Installation

First, install [Yeoman](http://yeoman.io) and __generator-wordpress-theme__ using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g @wptools/generator-theme
```

To generate a new project just type the string below, the generator will create the folder for you if not exists:

```bash
yo @wptools/theme "My Theme"
yo @wptools/theme:child "My Child Theme"
```

It will ask few questions then it will setup a new project for your in seconds.

---

## Creating a custom template

The generator allows you to generate WordPress themes from custom templates located in 	`~/.wptools/themes` folder, so you don't have to write a generator by yourself.

+ Create the `.wptools/themes` directory on your profile home `mkdir -p ~/.wptools/themes`.
+ Place your custom theme templates inside that folder to make them accessible in the generator execution.
+ When your template is ready you can use it with `--template TemplateName` or choose it from the prompt question options.

You **must create** the folder if doesn't exist and place your themes inside like in this example:

```bash
tree ~/.wptools/themes/
├───Simple
└───Advanced
```

Every theme folder __must follow__ simple rules in order to been generated correctly.

```bash
tree ~/.wptools/themes/Simple
└───theme
```

In this example the Simple theme has only the __theme__ directory where you should put all the theme files like in the [default theme](https://github.com/codekraft-studio/generator-wordpress-theme/tree/master/generators/app/templates/theme) that comes with the generator.

Optionally you can also generate more complex projects, that uses build systems, to archive this result you __must follow this project directory structure__:

```bash
tree ~/.wptools/themes/Simple
├───grunt
├───gulp
├───webpack
└───theme
```

The generator will search for your project manager template files inside the folder named like it, take a look on how the [default theme](https://github.com/codekraft-studio/generator-wordpress-theme/tree/master/generators/app/templates) handle multiple setups.

Inside your custom templates you have access to variables during the rendering process, here the list of all the variables used and available right now during rendering:

* __projectName__: The project name as slug
* __projectTitle__: The full project title as it appears on WordPress repositories
* __projectDescription__: A short project description
* __projectTemplate__: The name of the template that is being used
* __projectManager__: The name of the selected build system
* __projectVersion__: The version when the project has started
* __projectAuthor__: The project author name
* __projectLicense__: The project license name

And only for the child theme generator, all the above plus:

* __parentTemplate__: The name of the parent template theme

Simply use it like this: `<%= projectName %>` inside your files to have it rendered with the value, if you are not familiar with it take a loot at [EJS interpolation](http://www.embeddedjs.com/).

Inside the __theme__ folder you will always put all the themes related files (scripts, templates, assets, ...) while in the other folders you should put only the files that are related with your project build system configuration and package dependencies.


---

## Development

To develop this package you must clone it with Git and than link it to your global npm modules by typing:

```bash
npm link
```

Than you can start editing the package by following the contribuing guidelines below and than testing with: `yo @wptools/theme`, if you have any troubles please follow [this](http://yeoman.io/authoring/) guide, "__Running the generator__".

---

## Contributing

1. Create an issue and describe your idea
2. Fork the project (https://github.com/codekraft-studio/generator-wordpress-theme/fork)
3. Create your feature branch (`git checkout -b my-new-feature`)
4. Commit your changes (`git commit -am 'Add some feature'`)
5. Publish the branch (`git push origin my-new-feature`)
6. Add some test for your new feature
7. Create a new Pull Request

---

## Getting To Know Yeoman

 * Yeoman has a heart of gold.
 * Yeoman is a person with feelings and opinions, but is very easy to work with.
 * Yeoman can be too opinionated at times but is easily convinced not to be.
 * Feel free to [learn more about Yeoman](http://yeoman.io/).

## License

Apache-2.0 © [codekraft-studio]()

[npm-image]: https://badge.fury.io/js/generator-wordpress-theme.svg
[npm-url]: https://npmjs.org/package/generator-wordpress-theme
[travis-image]: https://travis-ci.org/codekraft-studio/generator-wordpress-theme.svg?branch=master
[travis-url]: https://travis-ci.org/codekraft-studio/generator-wordpress-theme
[daviddm-image]: https://david-dm.org/codekraft-studio/generator-wordpress-theme.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/codekraft-studio/generator-wordpress-theme
[coveralls-image]: https://coveralls.io/repos/codekraft-studio/generator-wordpress-theme/badge.svg
[coveralls-url]: https://coveralls.io/r/codekraft-studio/generator-wordpress-theme
