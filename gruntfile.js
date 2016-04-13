'use strict'
module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: {
            build: {
                src: ['build/**/'] // Destination Folder
            }
        },
        connect: {
            server: {
                options: {
                    port: 6001,
                    base: './',
                    livereload: false,
                    open: {
                        target: 'http://localhost:6001'
                    }
                }
            }
        },
        copy: {
            build: {
                cwd: 'src/',
                src: ['**/*.html'],
                dest: 'build/html',
                expand: true
            },
            index: {
                src: ['index.html'],
                dest: 'build/html',
                expand: true
            }

        },
        cssmin: {
            my_target: {
                files: [{
                    expand: true,
                    cwd: 'build/css/',
                    src: ['*.css', '!*.min.css'],
                    dest: 'build/css/',
                    ext: '.min.css'
                }]
            }
        },
        jshint: {
            all: ['src/js/**/*.js']
        },
        htmlhint: {
            options: {
                'tag-pair': true,
                'tagname-lowercase': true,
                'attr-lowercase': true,
                'attr-value-double-quotes': true,
                'doctype-first': false,
                'spec-char-escape': true,
                'id-unique': true,
                'head-script-disabled': true,
                'style-disabled': true
            },
            src: ['index.html', 'src/*.html']
        },
        sass: {
            dist: {
                files: {
                    'build/css/style.css': ['src/sass/style.scss']
                }
            }
        },
        uglify: {
            options: {
                manage: false
            },
            my_target: {
                files: {
                    'build/js/main.min.js': ['src/js/*.js']
                }
            }
        },
        watch: {
            options: {
                livereload: true
            },
            html: {
                files: ['index.html', 'src/*.html'],
                tasks: ['htmlhint']
            },
            sass: {
                files: ['src/sass/**/*.scss'],
                tasks: ['sass', 'cssmin']
            },
            js: {
                files: ['src/js/**/*.js'],
                tasks: ['jshint', 'uglify']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-htmlhint');

    // Default task(s).
    grunt.registerTask('default', ['clean', 'copy', 'sass', 'cssmin', 'jshint', 'uglify', 'htmlhint', 'connect', 'watch']);
    grunt.registerTask('build', ['clean']);
    grunt.registerTask('conn', ['connect']);
    grunt.registerTask('css', ['sass', 'cssmin']);
    grunt.registerTask('html', ['htmlhint']);
    grunt.registerTask('js', ['jshint', 'uglify']);
    grunt.registerTask('production', ['build', 'css', 'js', 'html', 'connect']);
    grunt.registerTask('serve', ['connect', 'watch']);
};
