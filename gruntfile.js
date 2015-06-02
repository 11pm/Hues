module.exports = function(grunt){

	var js_files = [
		'bower_components/angular/angular.min.js',
		'bower_components/angular-audio/app/angular.audio.js',
		'js/app.js'
	];

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		watch: {
			options: {
				livereload: true
			},
			less: {
				files: ['less/style.less'],
				tasks: ['less']
			},
			scripts: {
				files: ['js/app.js'],
				tasks: ['concat']
			},
			html: {
				files: ['index.html']
			}
		},

		less: {
			development: {
				options: {
					path: ['less/']
				},
				files: {
					'assets/style.css' : 'less/style.less'
				}
			}
		},

		'http-server': {

			'dev': {
				root: '.',
				port: '8000',
				host: 'localhost',
				ext: 'html',
				runInBackground: true

			}
		},

		concat: {
			dist: {
				src: js_files,
				dest: 'assets/app.js'
			}
		}

	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-http-server');
	grunt.loadNpmTasks('grunt-contrib-concat');

	grunt.registerTask('serve', ['http-server', 'watch']);

}