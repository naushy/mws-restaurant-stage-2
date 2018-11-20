/**
 * Gruntfile
 *
 * This Node script is executed when you run `grunt` or `sails lift`.
 * It's purpose is to load the Grunt tasks in your project's `tasks`
 * folder, and allow you to add and remove tasks as you see fit.
 * For more information on how this works, check out the `README.md`
 * file that was generated in your `tasks` folder.
 *
 * WARNING:
 * Unless you know what you're doing, you shouldn't change this file.
 * Check out the `tasks` directory instead.
 */

module.exports = function(grunt) {
  grunt.initConfig({
    clean: {
      dev: {
        src: ['dist/*'],
      }
    },
copy: {
  dev: {
    files: [
        { expand: true, cwd: 'app/', src: ['sw.js'], dest:'dist'},
        { expand: true, cwd: 'app/', src: ['css/*'], dest:'dist'},
        { expand: true, cwd: 'app/', src: ['js/*'], dest:'dist'},
        { expand: true, cwd: 'app/', src: ['img/fixed/*'], dest:'dist'},
    ]
  }
},



'string-replace': {
  dist: {
    files: [{
      expand: true, cwd: 'app/', src: ['*.html'], dest: 'dist/'
    }],
    options: {
      replacements: [{
        pattern: '<API_KEY_HERE>',
        replacement: '<%= grunt.file.read("GM_API_KEY") %>'
      }]
    }
  }
},

  // Load the include-all library in order to require all of our grunt
  // configurations and task registrations dynamically.
  var includeAll;
  try {
    includeAll = require('include-all');
  } catch (e0) {
    try {
      includeAll = require('sails/node_modules/include-all');
    } catch (e1) {
      console.error('Could not find `include-all` module.');
      console.error('Skipping grunt tasks...');
      console.error('To fix this, please run:');
      console.error('npm install include-all --save`');
      console.error();

      grunt.registerTask('default', []);
      return;
    }
  }


  /**
   * Loads Grunt configuration modules from the specified
   * relative path. These modules should export a function
   * that, when run, should either load/configure or register
   * a Grunt task.
   */
  function loadTasks(relPath) {
    return includeAll({
      dirname: require('path').resolve(__dirname, relPath),
      filter: /(.+)\.js$/,
      excludeDirs: /^\.(git|svn)$/
    }) || {};
  }

  /**
   * Invokes the function from a Grunt configuration module with
   * a single argument - the `grunt` object.
   */
  function invokeConfigFn(tasks) {
    for (var taskName in tasks) {
      if (tasks.hasOwnProperty(taskName)) {
        tasks[taskName](grunt);
      }
    }
  }



  // Load task functions
  var taskConfigurations = loadTasks('./tasks/config'),
    registerDefinitions = loadTasks('./tasks/register');

  // (ensure that a default task exists)
  if (!registerDefinitions.default) {
    registerDefinitions.default = function(grunt) {
      grunt.registerTask('default', []);
    };
  }

  // Run task functions to configure Grunt.
  invokeConfigFn(taskConfigurations);
  invokeConfigFn(registerDefinitions);

};

responsive_images: {
      dev: {
        options: {
          engine: 'gm',
          sizes: [
            {
              width: 300,
              quality: 40
            },
            {
              width: 400,
              quality: 40
            },
            {
              width: 600,
              quality: 40,
              suffix: '_2x'
            },
            {
              width: 800,
              quality: 40,
              suffix: '_2x'
            }
          ]
        },
        files: [{
          expand: true,
          cwd: 'app/img/',
          src: ['*.{gif,jpg,png}'],
          dest: 'dist/img/'
        }]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-string-replace');
  grunt.loadNpmTasks('grunt-responsive-images');
  
  grunt.registerTask('quick', ['copy', 'string-replace']);

  grunt.registerTask('default', ['clean', 'copy', 'string-replace',
    'responsive_images']);
};