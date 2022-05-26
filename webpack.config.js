const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',

            },
            {
                test: /\.js$/,
                loader: "babel-loader"
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }
        ],

    },
    devtool: 'inline-source-map',
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        }),
        new VueLoaderPlugin()
    ],
    output: {
        path: __dirname + '/docs', // Folder to store generated bundle
        filename: 'bundle.js',  // Name of generated bundle after build
        publicPath: '/' // public URL of the output directory when referenced in a browser
    },
}