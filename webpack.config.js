const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    mode: 'development',
    entry: {
        'player': './src/player.ts',
        'demo/demo': './src/demo.ts'
    },

    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },

    plugins: [
        new webpack.ProgressPlugin(),
        new HtmlWebpackPlugin({
            title: 'GenericPlayer Demo',
            filename: path.resolve(__dirname, 'dist/demo/index.html'),
            chunks: ['demo/demo']
        })
    ],

    module: {
        rules: [
            {
                test: /.(ts|tsx)?$/,
                loader: 'ts-loader',
                include: [path.resolve(__dirname, 'src')],
                exclude: [/node_modules/]
            }
        ]
    },

    devServer: {
        contentBase: path.resolve(__dirname, 'dist/demo'),
        port: 8080,
        open: true
    },

    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    }
};
