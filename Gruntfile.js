module.exports = function (grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'), 
	
	  imagemin: {                          // Task
		dynamic: {                         // Another target
		  files: [{
			expand: true,                  // Enable dynamic expansion
			cwd: 'app/img/',                   // Src matches are relative to this path
			src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
			dest: 'dist/imgmin'                  // Destination path prefix
		  }]
		}
	  },

    jade: {
		compile: {
			options: {
			  pretty: true,
			  data: {
				debug: true
			  }
			},

			files: {
			  "app/index.html": "app/jade/index.jade"
			}
	  },
	  dist: {
			options: {
			  pretty: true,
			  data: {
				debug: true
			  }
			},

			files: {
			  "app/dist.html": "app/jade/dist.jade"
			}
	  },
    },

    less: {
      development: {
        options: {
          paths: ["assets/css"]
        },

        files: {
          "app/css/main.css": "app/less/main.less"
        }
      }
    },

    connect: {
      server: {
        options: {
          hostname: 'localhost',
          open: true,
          port: 9000,
          base: 'app',
        }
      }
    },
	
	cssmin: {
	  combine: {
		files: {
		  'dist/css/all.css': [
								'bower_components/bootstrap/dist/css/bootstrap.css', 
								//'bower_components/bootstrap/dist/css/bootstrap-theme.css',
								'app/css/main.css'
							  ]
		}
	  }
	},
	
	concat: {
		dist: {
			src: [
					'bower_components/jquery/dist/jquery.min.js', 
					'app/js/main.js',
					'app/js/singlepagenav.jquery.js',
					//'bower_components/jquery.parallax/jquery.parallax.js',
					'bower_components/bootstrap/dist/js/bootstrap.min.js',
					//'app/js/jquery.maskedinput.min.js',
					'bower_components/jquery.validate/dist/jquery.validate.min.js'
				 ],  
			dest: 'dist/js/all.js' 
		}
	},
	
	
	
	uglify: { 
		options: {
			stripBanners: true,
			//banner: '/* <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n'
		},

		build: {
			src: 'dist/js/all.js',
			dest: 'dist/js/all.min.js'
		},
		//build2: {
			//src: 'app/js/countdown.js',
			//dest: 'dist/js/countdown.min.js'
		//}
	},
	
	copy: {
		main: {
			expand: true,
			cwd: 'app/img/',
			src: '**',
			dest: 'dist/img'
		},
		font: {
			expand: true,
			cwd: 'bower_components/bootstrap/fonts',
			src: '**',
			dest: 'dist/fonts'
		},
		font1: {
			expand: true,
			cwd: 'app/fonts',
			src: '**',
			dest: 'dist/fonts'
		},
		htaccess: {
			expand: true,
			cwd: 'app',
			src: '.htaccess',
			dest: 'dist/'
		},
		prays: {
			expand: true,
			cwd: 'app',
			src: 'Prays_1.odt',
			dest: 'dist/'
		},
	},
	
	htmlmin: {
		dist: {
			options: {                                 
				removeComments: true,
				collapseWhitespace: true
			},
			files: {'dist/index.html': 'app/dist.html'}
		}
	},

    watch: {
      options:{
        livereload: true
      },
      jade: {
        files: ['app/jade/*.jade'],
        tasks: ['jade']
      },

      less: {
        files: ['app/less/*.less'],
        tasks: ['less']
      }
    }


  });
 
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  //grunt.loadNpmTasks('grunt-contrib-imagemin');
 
  grunt.registerTask('default', ['jade', 'less', 'htmlmin', 'cssmin', 'concat', 'uglify', 'copy']);


};