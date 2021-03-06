const path = require("path");
const glob = require('glob');
const mode = process.env.NODE_ENV;

console.log("Mode: "+mode);
const pages = glob.sync('src/**.js').reduce(function(obj, el){
    obj[path.parse(el).name] = el;
    return obj
 },{});

module.exports = {
    outputDir: path.resolve(__dirname, "dist"),

    pages: pages,

    css: {
        extract: { 
            filename: 'css/[name].css',
            chunkFilename: 'css/[name].css'
        }
        /*extract:false*/
    },

    configureWebpack: {
        resolve: {
            symlinks: false
        },
        output: {
            filename: 'js/[name].js',
            chunkFilename: 'js/[name].js'
        },
        optimization: {
            //splitChunks: false
            //runtimeChunk:"single",
            //runtimeChunk:true
        }
    },

    chainWebpack: config => {

        //Clear HTML mess
        Object.keys(pages).forEach(key => {
            config.plugins.delete('html-'+key).delete('prefetch-'+key).delete('preload-'+key);
        });

        //Save fonts into assets
        config.module.rule('fonts').use('url-loader').loader('url-loader').tap(options => {
          // modify the options...
          options.fallback.options.name = 'fonts/[name].[ext]'

          return options
        });
        config.devtool( mode == 'development' ? 'source-map' : false);
    }
}
