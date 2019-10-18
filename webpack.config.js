const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
	mode: 'development',
	entry: {
    'demo/demo': './src/demo.ts',
    player: './src/player.ts'
  },

	output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist')
	},

	plugins: [
    new webpack.ProgressPlugin(), 
    new HtmlWebpackPlugin({filename: path.resolve(__dirname, 'dist/demo/index.html')})
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
    host: '0.0.0.0',
    port: 8080,
    disableHostCheck: true,
		open: true
	},

	resolve: {
		extensions: ['.tsx', '.ts', '.js']
	}
};
