module.exports = function (grunt) {
  grunt.initConfig({

    // Get the package file details
    pkg: grunt.file.readJSON('package.json'),

    // The project banner
    banner: '/*!\n' +
      '* Package: <%= pkg.name %> - v<%= pkg.version %> \n' +
      '* Description: <%= pkg.description %> \n' +
      '* Last build: <%= grunt.template.today("yyyy-mm-dd") %> \n' +
      '* @author <%= pkg.author %> \n' +
      '* @license <%= pkg.license %> \n' +
      '*/\n',

    // Clean the dist directory files
    clean: {
      all: ['dist/*', 'assets/dist/*', 'languages/<%= pkg.name %>.pot'],
      dist: ['dist/*'],
      styles: ['assets/dist/css/*'],
      scripts: ['assets/dist/js/*']
    },

    // Copy all the optimized files into distribution folder
    copy: {
      dist: {
        files: [
          {expand: true, src: ['./*.{txt,png,php}'], dest: './dist'},
          {expand: true, src: ['./include/**/*'], dest: './dist'},
          {expand: true, src: ['./views/**/*'], dest: './dist'},
          {expand: true, src: ['./languages/**/*'], dest: './dist'},
          {expand: true, src: ['./assets/dist/**/*'], dest: './dist'}
        ]
      }
    },

    // Hint all the script files
    jshint: {
      files: ['assets/src/js/**/*.js'],
      options: {
        globals: {
          jQuery: true
        }
      }
    },

    // Concat all the user and admin scripts for development
    concat: {
      options: {
        stripBanners: true,
        banner: '<%= banner %>'
      },
      userScripts: {
        src: ['assets/src/js/user/**/*.js'],
        dest: 'assets/dist/js/user/user.js'
      },
      adminScripts: {
        src: ['assets/src/js/admin/**/*.js'],
        dest: 'assets/dist/js/admin/admin.js'
      }
    },

    // Minify all the scripts
    uglify: {
      userScripts: {
        options: {
          banner: '<%= banner %>'
        },
        files: {
          'assets/dist/js/user/user.min.js': ['<%= concat.userScripts.dest %>']
        }
      },
      adminScripts: {
        options: {
          banner: '<%= banner %>'
        },
        files: {
          'assets/dist/js/admin/admin.min.js': ['<%= concat.adminScripts.dest %>']
        }
      },
      vendorScripts: {
        options: {
          sourceMap: false
        },
        files: [{
          expand: true,
          cwd: 'assets/src/js/vendor',
          src: '**/*.js',
          dest: 'assets/dist/js/vendor',
          rename: function (dst, src) {
            return dst + '/' + src.replace('.js', '.min.js');
          }
        }]
      }
    },

    // Compile and compress all the styles
    sass: {
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
          'assets/dist/css/user.css': 'assets/src/scss/user.scss',
          'assets/dist/css/editor.css': 'assets/src/scss/editor.scss',
          'assets/dist/css/admin.css': 'assets/src/scss/admin.scss'
        }
      }
    },

    // Watch all the scripts and styles
    watch: {
      scripts: {
        files: ['assets/src/js/**/*.js'],
        tasks: ['newer:jshint', 'concat', 'newer:uglify']
      },
      styles: {
        files: ['assets/src/scss/**/*.scss'],
        tasks: ['sass']
      },
      images: {
        files: ['assets/src/img/**/*.{png,jpg,gif,svg}'],
        tasks: ['sass']
      }
    },

    // Build the translation pot file
    makepot: {
      target: {
        options: {
          type: 'wp-plugin',
          mainFile: '<%= pkg.name %>.php',
          domainPath: '/languages'
        }
      }
    },

    // Optimize and copy all images to dist folder
    imagemin: {
      dist: {
        options: {},
        files: [{
          expand: true,
          cwd: 'assets/src/img',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'assets/dist/img'
        }]
      }
    },

    // Optimize and copy all svgs to dist folder
    svgmin: {
      dist: {
        options: {},
        files: [{
          expand: true,
          cwd: 'assets/src/img',
          src: ['**/*.svg'],
          dest: 'assets/dist/img'
        }]
      }
    }

  });

  // Development tasks
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-svgmin');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-wp-i18n');

  // Register watch task
  grunt.registerTask('default', ['watch']);

  // Register build task
  grunt.registerTask('build', ['clean:all', 'build-scripts', 'build-styles', 'build-images', 'makepot', 'copy:dist']);

  // Partial build tasks
  grunt.registerTask('build-images', ['newer:imagemin', 'newer:svgmin']);
  grunt.registerTask('build-styles', ['sass']);
  grunt.registerTask('build-scripts', ['jshint', 'concat', 'uglify']);
};
