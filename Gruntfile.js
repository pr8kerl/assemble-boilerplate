/*
 * Generated on 2014-05-24
 * generator-assemble v0.4.11
 * https://github.com/assemble/generator-assemble
 *
 * Copyright (c) 2014 Hariadi Hinta
 * Licensed under the MIT license.
 */

'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// '<%= site.src %>/pages/{,*/}*.hbs'
// use this if you want to match all subfolders:
// '<%= site.src %>/pages/**/*.hbs'

module.exports = function(grunt) {

  require('time-grunt')(grunt);
  var pretty = require('pretty');

  // Project configuration.
  grunt.initConfig({

    // Project metadata
    pkg: grunt.file.readJSON('package.json'),
    site: grunt.file.readYAML('site.yml'),

    watch: {
      assemble: {
        files: ['src/{content,data,pages,partials,layouts,style,helpers}/{,*/,**/}*.{md,hbs,yml,js,less}'],
        tasks: ['less','assemble']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '_site/{,*/}*.html',
          '_site/{,*/}*.css',
          '_site/{,*/}*.js',
          '_site/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    connect: {
      options: {
        port: 9000,
        livereload: 35729,
        // change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      livereload: {
        options: {
          open: true,
          base: [
            '_site'
          ]
        }
      }
    },

    // Compile Less to CSS
    less: {
      options: {
        paths: ['<%= site.styles %>', '<%= site.styles %>/bootstrap' ]
      },  
      pages: {
        src: ['<%= site.styles %>/style.less'],
        dest: '<%= site.assets %>/css/style.css'
      }   
    },  

    assemble: {
      options: {
        flatten: true,
        today: '<%= grunt.template.today() %>',
        pkg: '<%= pkg %>',
        site: '<%= site %>',
        assets: '<%= site.assets %>',
        layoutdir: '<%= site.layouts %>',
        layout: 'default.hbs',
        data: '<%= site.data %>/*.{json,yml}',
        partials: '<%= site.partials %>/*.hbs',
        plugins: '<%= site.plugins %>',
        postprocess: pretty
      },  
      pages: {
        options: {
          layout: 'default.hbs'
        },
        files: {
          '<%= site.dest %>/': ['<%= site.src %>/pages/*.hbs']
        }
      }
    },

    // Before generating any new files,
    // remove any previously-created files.
    clean: ['<%= site.dest %>/**/*.{html,xml}']

  });

  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('assemble-less');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('server', [
    'clean',
    'less',
    'assemble',
    'connect:livereload',
    'watch'
  ]);

  grunt.registerTask('build', [
    'clean',
    'less',
    'assemble'
  ]);

  grunt.registerTask('default', [
    'build'
  ]);

};
