module.exports = function(grunt) {

  require("load-grunt-tasks")(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    less: {
      style: {
        files: {
          'build/css/style.css': 'source/less/style.less'
        }
      }
    },

    sass: {
      style: {
        files: {
          'css/style.css': 'sass/style.scss'
        }
      }
    },

    lintspaces: {
      test: {
        src: [
          '*.html',
          'js/*.js',
          'less/*.less',
          'sass/*.sass'
        ],
        options: {
          editorconfig: '.editorconfig'
        }
      }
    },

    githooks: {
      test: {
        'pre-commit': 'lintspaces:test',
      }
    },

    copy: {
      gosha: {
        files: [{
          expand: true,
          src: [
            '*.html',
            'css/**',
            'img/**',
            'js/**'
          ],
          dest: 'gosha',
        }]
      },
      build: {
        files: [{
          expand: true,
          cwd: "source",
          src: [
            "img/**",
            "js/**",
            "*.html"
            ],
          dest: "build"
        }]
      }
    },

    clean: {
      gosha: [
        'gosha/img/README',
        'gosha/js/README'
      ],

      build: ["build"]
    },

    autoprefixer: {
      options: {
        browsers: ["last 2 version","ie 10"]
      },
      style: {
        src: "build/css/style.css"
      }
    },

    cmq: {
      style: {
        files: {
          'build/css/style.css': ['build/css/style.css']
        }
      }
    },

    cssmin: {
      style: {
        options: {
          keepSpecialComments: 0,
          report: "gzip"
        },
        files: {
          "build/css/style.min.css":["build/css/style.css"]
        }
      }
    },

    csscomb: {
      style: {
        expand: true,
        src: ["less/**/*.less"]
      }
    },

    imagemin: {
      images: {
        options: {
          optimizationLevel: 3
        },
        files: [{
          expand: true,
          src: ["build/img/**/*.{png,jpg,gif,svg}"]
        }]
      }
    },

    htmlmin: {                                     // Task 
      options: {                                 // Target options 
        removeComments: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        caseSensitive:true,
        keepClosingSlash: false
      },
      html: {
        files: {                                   // Dictionary of files 
          'build/index.min.html': 'build/index.html'
        }
      }
    },

    grunticon: {
      icons: {
        files: [{
          expand: true,
          cwd: "source/img/",
          src: ["*.svg"],
          dest: "build/css/"
        }]
        // Здесь опция enhanceSVG нам не нужна
      }
    },

    svg_sprite: {
      complex: { 
        // Target basics 
        expand: true,
        cwd: 'source/img/',
        src: ['*.svg'],
        dest: 'build/img/',

        // Target options 
        options: {
          shape: {
            dimension: {         // Set maximum dimensions 
              maxWidth: 32,
              maxHeight: 32
            },
            spacing: {         // Add padding 
              padding: 0
            },
            dest: 'intermediate-svg'    // Keep the intermediate files 
        },
        mode: {
            view: {         // Activate the «view» mode 
              bust: false,
              render: {
                  scss: false      // Activate Sass output (with default options) 
              }
            },
            symbol: true      // Activate the «symbol» mode 
          }
        }
      }
    }
  });

  grunt.registerTask('test', ['lintspaces:test']);

  if (grunt.file.exists(__dirname, 'less', 'style.less')) {
    grunt.registerTask('gosha', ['less:style', 'copy:gosha', 'clean:gosha']);
  } else if (grunt.file.exists(__dirname, 'sass', 'style.scss')) {
    grunt.registerTask('gosha', ['sass:style', 'copy:gosha', 'clean:gosha']);
  } else {
    grunt.registerTask('gosha', ['copy:gosha', 'clean:gosha']);
  }

  grunt.registerTask("build",[
    "clean:build",
    "copy:build",
    "svg_sprite",
    "less",
    "autoprefixer",
    "cmq",
    "cssmin",
    "imagemin",
    "htmlmin"
  ]);
};
