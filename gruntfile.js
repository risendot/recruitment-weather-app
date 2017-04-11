module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json')
        , clean: ['./public/js/dist/*.js']
        , ngAnnotate: {
            options: {
                singleQuotes: true
            },
            app: {//"app" target
                files: {
                    './public/js/min-safe/app.js': [
                        './public/js/src/app.js'
                    ]
                    , './public/js/min-safe/user.js': [
                        './public/js/src/user/*.js'
                    ]
                    , './public/js/min-safe/weather.js': [
                        './public/js/src/weather/*.js'
                    ]
                }
            }
        }
        , concat: {
            app: {//target
                src: ['./public/js/min-safe/app.js'],
                dest: './public/js/dist/app.js'
            }
            , user: {//target
                src: ['./public/js/min-safe/user.js'],
                dest: './public/js/dist/user.js'
            }
            , weather: {//target
                src: ['./public/js/min-safe/weather.js'],
                dest: './public/js/dist/weather.js'
            }
        }
        , uglify: {
            app: {//target
                src: ['./public/js/dist/app.js'],
                dest: './public/js/dist/app.min.js'
            },
            user: {//target
                src: ['./public/js/dist/user.js'],
                dest: './public/js/dist/user.min.js'
            },
            weather: {//target
                src: ['./public/js/dist/weather.js'],
                dest: './public/js/dist/weather.min.js'
            },
        }
        , watch: {
            scripts: {
                files: [
                    './public/js/src/**/*.js'
                ],
                tasks: ['default'],
                options: {
                    debounceDelay: 100
                }
            },
        }
    });

    //load grunt tasks 
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-ng-annotate');
    grunt.loadNpmTasks('grunt-contrib-watch');

    //register grunt default task
    grunt.registerTask('default', ['clean', 'ngAnnotate', 'concat', 'uglify']);
};