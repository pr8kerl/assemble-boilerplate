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
// '<%= site.src %>/templates/pages/{,*/}*.hbs'
// use this if you want to match all subfolders:
// '<%= site.src %>/templates/pages/**/*.hbs'

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
        files: ['src/{content,data,templates}/{,*/,**/}*.{md,hbs,yml}'],
        tasks: ['assemble']
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

    assemble: {
      pages: {
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
        files: {
          '<%= site.dest %>/': ['<%= site.src %>/templates/pages/*.hbs']
        }
      }
    },

    // Before generating any new files,
    // remove any previously-created files.
    clean: ['<%= site.dest %>/**/*.{html,xml}']

  });

  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('server', [
    'clean',
    'assemble',
    'connect:livereload',
    'watch'
  ]);

  grunt.registerTask('build', [
    'clean',
    'assemble'
  ]);

  grunt.registerTask('default', [
    'build'
  ]);

};