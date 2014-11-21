module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: [
      './app/assets/www.zip',
      './tmp'
    ],
    compress: {
      main: {
        options: {
          archive: './app/assets/www.zip',
          mode: 'zip'
        },
        files: [
          {
            cwd: './tmp',
            expand: true,
            src: ['www/**'],
          },
        ]
      }
    },
    copy: {
      launchpad: {
        files: [{
          cwd: '../../gulf-olb/portal/target/portal/static/launchpad',
          expand: true,
          src: [
          '*/**',
          '!{behaviors,behaviors/**}',
          '!{chromes,chromes/**}',
          '!{html,html/**}',
          '!{widgets, widgets/**}',
          '!{media,media/**}',
          '!{containers,containers/**}',
          ],
          dest: 'tmp/www/static/launchpad',
          filter: 'isFile'
        }]
      },
      themes: {
        files: [{
          cwd: '../../gulf-olb/portal/target/portal/static/themes',
          expand: true,
          src: [
          '*/**',
          '!{gulfbank,gulfbank/**}',
          '!**/*.less'
          ],
          dest: 'tmp/www/static/themes',
          filter: 'isFile'
        }]
      },
      webapp: {
        files: [{
          cwd: '../../gulf-olb/statics/bundles/olb/src/main/webapp',
          expand: true,
          src: [
            '*/**',
            '!WEB-INF/**',
            '!static/launchpad/**',
            '!static/gulfbank/widgets/**'
          ],
          dest: 'tmp/www',
          filter: 'isFile'
        }],
      },
      widgets: {
        files: [{
          cwd: '../widgets-prerendered',
          expand: true,
          src: ['*/**'],
          dest: 'tmp/www/static/gulfbank',
          filter: 'isFile'
        }],
      },
    },
    titanium: {
      ios: {
        options: {
          command: 'build',
          platform: 'ios',
          projectdir: '.',
          large: true,
          retina: true
        }
      },
      clean: {
        options: {
          command: 'clean'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-titanium');

  grunt.registerTask('default', ['clean', 'copy', 'compress', 'titanium']);

  grunt.registerTask('ios', ['clean', 'copy', 'compress', 'titanium:ios']);

  grunt.registerTask('cleanup', ['clean', 'titanium:clean']);

  // grunt.registerTask('android', ['copy', 'compress', 'titanium:android']);

};
