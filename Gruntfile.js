module.exports = function( grunt ) {

  "use strict"

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

	 // watch
    watch: {

      html: {
        files: 'demo/*.html',
      },

      styl: {
        files: ['demo/assets/stylus/*.styl', 'da-vinci.styl'],
        tasks: ['stylus:compile','stylint'],
      },

      test: {
        files: ['test/*.styl'],
        tasks: ['stylus:test'],
      },

      css: {
        files: 'demo/assets/css/*.css',
      },

      options: {
        livereload: true
      }

    },

    // stylus
    stylus: {
      options: {
        compress: true,
      },
      compile: {
        files: {
          'demo/assets/css/style.css':'demo/assets/stylus/style.styl' // 1:1 compile
        }
      },
      test: {
        files: {
          'test/style.css':'test/style.styl' // 1:1 compile
        }
      }
    },

    stylint: {
      src: ['da-vinci.styl']
    },

    //Deploy the production files for gh-pages
    'gh-pages': {
      options: {
        base: 'demo/'
      },
      src: ['**']
    },

    // connect
    connect: {

      demo: {
        options: {
          port: 9000,
          base: "demo/",
          hostname: "localhost",
          livereload: true,
          open: true
        }
      },
    test: {
      options: {
        port: 9000,
        base: "test/",
        hostname: "localhost",
        livereload: true,
        open: true
      }
    }

    }

  });

  // plugins
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-gh-pages');
  grunt.loadNpmTasks('grunt-stylint');

  // tasks
  grunt.registerTask( 'lint', ['stylint']);
  grunt.registerTask( 'create-test', ['connect:test','watch']);
  grunt.registerTask( 'serve', ['connect:demo','watch']);
  grunt.registerTask( 'deploy', ['gh-pages']);
};
