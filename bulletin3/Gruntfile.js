module.exports = function(grunt) {
	// 配置参数
	grunt.initConfig({
		pkg : grunt.file.readJSON('package.json'),
		requirejs : {
			compile : {
				options : {
					name : "app",
					baseUrl : "src",
					mainConfigFile : "src/main.js",
					out : "dist/app-min.js",
					include : [ 'amlond' ],
					insertRequire : [ 'app' ],
					wrap : true,
					generateSourceMaps : true,
					preserveLicenseComments : false,
					optimize : "uglify2"
				}
			// options : {
			// name : "app",
			// baseUrl : "src",
			// mainConfigFile : "src/main.js",
			// out : "dist/main.js",
			// insertRequire : [ 'app' ],
			// generateSourceMaps : true,
			// preserveLicenseComments : false,
			// optimize : "uglify2"
			// }
			}
		},
		cssmin : {
			combine : {
				files : {
					'dist/asserts/app-min.css' : [
							'src/asserts/jquery.mobile-1.3.2.css',
							'src/asserts/bulletin.css' ]
				}
			}
		},
		jshint : {
			beforeconcat : [ 'js/bulletinDetail.js', 'js/bulletin.js' ],
			afterconcat : [ 'dist/main.js' ]
		},
		copy : {
			main : {
				files : [ {
					expand : true,
					src : [ 'src/asserts/images/**' ],
					dest : 'dist/asserts/images/',
					flatten : true,
					filter : 'isFile'
				},{
					expand : true,
					src : [ 'src/*.json' ],
					dest : 'dist/',
					flatten : true,
					filter : 'isFile'
				}
//				, {
//					expand : true,
//					src : [ 'src/require.js' ],
//					dest : 'dist/',
//					flatten : true
//				}
				, {
					expand : true,
					src : [ 'src/*.html' ],
					dest : 'dist/',
					flatten : true
				} 
				]
			}
		}
	});
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	// 注册任务
	grunt.registerTask('default', [ 'requirejs', 'cssmin', 'copy' ]);
}