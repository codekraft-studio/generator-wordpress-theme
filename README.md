# generator-wordpress-starter 
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> A simple yeoman generator for Wordpress projects.

## Installation

First, install [Yeoman](http://yeoman.io) and generator-wordpress-starter using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-wordpress-starter
```

To generate a new project just type:

```bash
yo wordpress-starter
```

It will be made a bit of questions then you will have your project ready to go.

You can also generate plugins, by typing:
```bash
yo wordpress-starter:plugin
```

---

## Generate a custom theme
The project allow you to generate custom WordPress themes from templates located in 	`~/.wordpress-starter/` folder.
You **should create** the folder if doesn't exist and place your themes inside like in this example:
```bash
tree ~/.wordpress-starter/
├───Simple
└───Advanced
```

Every theme folder must follow simple rules in order to been generated correctly:
```bash
tree ~/.wordpress-starter/Simple
└───theme
```
In this example the Simple theme has only the __theme__ directory where you should put all the theme files like in the [default theme](https://github.com/codekraft-studio/generator-wordpress-starter/tree/master/generators/app/templates/theme) that comes with the generator.

Optionally you can also generate more complex projects, that uses build systems, for now the generator will support only [gulp](http://gulpjs.com/) and [grunt](https://gruntjs.com/), if you are not familiar with them, be sure to check out the __Getting Started__ guides.
In order to archive this result you must follow this structure:
```bash
tree ~/.wordpress-starter/Simple
├───grunt
├───gulp
└───theme
```
You can take a look at the [example](https://github.com/codekraft-studio/generator-wordpress-starter/tree/master/generators/app/templates) which is the default theme generated if you don't specify a custom one.

Inside the __theme__ folder you will always put all the themes related files (scripts, templates, assets, ...) while in the gulp/grunt folder you should put only the files that are related with your project build system configuration.

In the grunt/gulp folder, you __must place only two files__: `package.json` and `gulpfile.js` or `Gruntfile.js`, any other file __will be ignored__.

The `package.json` file will be rendered with [EJS interpolation](http://www.embeddedjs.com/), while the other file will be simply copied.

---

## Development
To develop this package you must clone it with Git and than link it to your global npm modules by typing:
```bash
npm link
```
Than you can start editing the package by following the contribuing guidelines below and than testing with: `yo wordpress-starter`, if you have any troubles please follow [this](http://yeoman.io/authoring/) guide, "__Running the generator__".

---

## Contributing

1. Create an issue and describe your idea
2. Fork the project (https://github.com/codekraft-studio/generator-wordpress-starter/fork)
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

[npm-image]: https://badge.fury.io/js/generator-wordpress-starter.svg
[npm-url]: https://npmjs.org/package/generator-wordpress-starter
[travis-image]: https://travis-ci.org/codekraft-studio/generator-wordpress-starter.svg?branch=master
[travis-url]: https://travis-ci.org/codekraft-studio/generator-wordpress-starter
[daviddm-image]: https://david-dm.org/codekraft-studio/generator-wordpress-starter.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/codekraft-studio/generator-wordpress-starter
[coveralls-image]: https://coveralls.io/repos/codekraft-studio/generator-wordpress-starter/badge.svg
[coveralls-url]: https://coveralls.io/r/codekraft-studio/generator-wordpress-starter
