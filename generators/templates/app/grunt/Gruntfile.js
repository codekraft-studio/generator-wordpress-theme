const path = require('path');
const sass = require('node-sass');

module.exports = function(grunt) {
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    banner: '/*!\n' +
      '* Package: <%= pkg.name %> - v<%= pkg.version %> \n' +
      '* Description: <%= pkg.description %> \n' +
      '* Last build: <%= grunt.template.today("yyyy-mm-dd") %> \n' +
      '* @author <%= pkg.author %> \n' +
      '* @license <%= pkg.license %> \n' +
      '*/\n',

    // Clean the dist directory files
    clean: {
      all: ['src/assets/dist/*', 'src/**/*.map', 'src/languages/*'],
      styles: ['src/assets/dist/css/**/*.css', 'src/**/*.css.map'],
      scripts: ['src/assets/dist/js/**/*.js', 'src/**/*.js.map'],
      images: ['src/assets/dist/img/*']
    },

    // Hint all js files
    jshint: {
      gruntfile: ['Gruntfile.js'],
      files: ['src/assets/src/js/**/*.js'],
      options: {
        esversion: 6,
        globals: {
          jQuery: true
        }
      }
    },

    // Concat all the theme javascript files
    concat: {
      options: {
        stripBanners: true,
        banner: '<%= banner %>'
      },
      userScripts: {
        src: ['src/assets/src/js/user/**/*.js'],
        dest: 'src/assets/dist/js/main.js'
      },
      adminScripts: {
        src: ['src/assets/src/js/admin/**/*.js'],
        dest: 'src/assets/dist/js/admin.js'
      }
    },

    // Uglify every theme js file and vendor files
    uglify: {
      themeScripts: {
        options: {
          banner: '<%= banner %>'
        },
        files: {
          'src/assets/dist/js/main.min.js': ['<%= concat.userScripts.dest %>'],
          'src/assets/dist/js/admin.min.js': ['<%= concat.adminScripts.dest %>']
        }
      },
      vendorScripts: {
        options: {
          sourceMap: false
        },
        files: [{
          expand: true,
          cwd: 'src/assets/src/js/vendor',
          src: '**/*.js',
          dest: 'src/assets/dist/js',
          rename: function(dst, src) {
            return dst + '/' + src.replace('.js', '.min.js');
          }
        }]
      }
    },

    // Babel for ES5-ES6 support
    babel: {
      options: {
        sourceMap: true,
        presets: ['env', 'es2015']
      },
      dist: {
        files: {
          '<%= concat.userScripts.dest %>': '<%= concat.userScripts.dest %>',
          '<%= concat.adminScripts.dest %>': '<%= concat.adminScripts.dest %>'
        }
      }
    },

    // Compile sass style
    sass: {
      options: {
        implementation: sass,
        sourceMap: true
      },
      dist: {
        files: {
          'src/assets/dist/css/main.css': 'src/assets/src/scss/main.scss',
          'src/assets/dist/css/editor.css': 'src/assets/src/scss/editor.scss',
          'src/assets/dist/css/admin.css': 'src/assets/src/scss/admin.scss'
        }
      }
    },

    // Do some post-processor actions
    postcss: {
      options: {
        map: true,
        processors: [
          require('autoprefixer')({
            browsers: ['last 2 versions']
          })
        ]
      },
      dist: {
        src: 'src/style.css'
      }
    },

    // Minify all the project images
    imagemin: {
      dynamic: {
        options: {
          optimizationLevel: 3
        },
        files: [{
          expand: true,
          cwd: 'src/assets/src/img',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'src/assets/dist/img'
        }]
      }
    },

    // Optmize all the svg files
    svgmin: {
      dist: {
        options: {},
        files: [{
          expand: true,
          cwd: 'src/assets/src/img',
          src: ['**/*.svg'],
          dest: 'src/assets/dist/img'
        }]
      }
    },

    // Watch js and css files and rebuild
    watch: {
      scripts: {
        files: ['src/assets/src/js/**/*.js'],
        tasks: ['newer:jshint', 'concat', 'babel', 'newer:uglify'],
        options: {
          spawn: false
        }
      },
      styles: {
        files: ['src/assets/src/scss/**/*.scss'],
        tasks: ['sass'],
        options: {
          spawn: false
        }
      },
      images: {
        files: ['src/assets/src/img/**/*.{png,jpg,gif}'],
        tasks: ['newer:imagemin'],
        options: {
          spawn: false
        }
      }
    },

    // Make the pot file from the theme project
    makepot: {
      target: {
        options: {
          type: 'wp-theme',
          cwd: 'src',
          potFilename: '<%= pkg.name %>.pot',
          domainPath: '/languages',
          updatePoFiles: true
        }
      }
    },

    // Add theme text domain to php files
    addtextdomain: {
      options: {
        i18nToolsPath: path.join('../../../../', 'tools/i18n/'),
        textdomain: '<%= pkg.name %>',
        updateDomains: true
      },
      target: {
        files: {
          src: ['src/**/*.php']
        }
      }
    }

  });

  // Development tasks
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-wp-i18n');

  // Register default task watch
  grunt.registerTask('default', ['watch']);

  // Register partial build tasks
  grunt.registerTask('build-styles', ['sass', 'postcss']);
  grunt.registerTask('build-scripts', ['jshint', 'concat', 'babel', 'uglify']);

  // Register build task and alias
  grunt.registerTask('build', ['clean:all', 'build-scripts', 'build-styles', 'imagemin', 'makepot']);
};
