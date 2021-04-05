const path = require("path");
const mode = process.env.NODE_ENV;

console.log("Mode: "+mode);

module.exports = {
    outputDir: path.resolve(__dirname, "dist"),

    pages: {
        main: "src/main.js",
        login: "src/login.js"
    },

    css: {
        extract: { 
            filename: '/css/[name].[hash:8].css',
            chunkFilename: '/css/[name].[hash:8].css'
        }
    },

    configureWebpack: {
        output: {
            filename: 'js/[name].[hash:8].js',
            chunkFilename: 'js/[name].[hash:8].js'
        }
    },

    chainWebpack: config => {
        config.plugins.delete('html-main').delete('prefetch-main').delete('preload-main');
        config.devtool( mode == 'development' ? 'source-map' : false);
    }
}
