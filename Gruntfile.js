module.exports = function(grunt){
    grunt.initConfig({
        package: grunt.file.readJSON('package.json'),
        watch:{
            files: ['angular.validators.js'],
            tasks: ['minify']
        },
        uglify: {
            options: {},
            build: {
                src:'<%= package.name %>.js',
                dest: '<%= package.name %>.min.js'
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('minify', ['uglify:build']);
}