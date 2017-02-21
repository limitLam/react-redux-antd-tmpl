const webpackMerge = require('webpack-merge');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const {
	resolve
} = require('path');
const common = require('./webpack.config.common');

const host = 'http://localhost';
const port = 7003;

module.exports = webpackMerge(common, {

	devtool: 'cheap-module-eval-source-map',

	entry: [
		'react-hot-loader/patch',
		// activate HMR for React

		'webpack-dev-server/client?' + host + ":" + port,
		// bundle the client for webpack-dev-server
		// and connect to the provided endpoint

		'webpack/hot/only-dev-server',
		// bundle the client for hot reloading
		// only- means to only hot reload for successful updates


		'../src/entries/index.js'
		// the entry point of our app
	],

	bail: true,

	devServer: {
		// Enable history API fallback so HTML5 History API based
		// routing works. This is a good default that will come
		// in handy in more complicated setups.
		historyApiFallback: true,

		hot: true,
		// enable HMR on the server

		contentBase: resolve(__dirname, '../dist'),
		// match the output path

		publicPath: '/',
		// match the output `publicPath`

		host: 'localhost',

		port: port,

		stats: 'errors-only',
		// stats: "verbose",
		proxy: {
			'/api/*': {
				target: 'http://rap.taobao.org/',
				pathRewrite: {
					'^/api': '/mockjs/13701/'
				},
				secure: false
			}
		},
	},

	plugins: [
		new webpack.DefinePlugin({
			ENV: JSON.stringify('local'),
			// VERSION: JSON.stringify('5fa3b9'),
			// BROWSER_SUPPORTS_HTML5: true,
			// TWO: '1+1',
			// 'typeof window': JSON.stringify('object')
		}),
		new HtmlWebpackPlugin({
			title: '开发环境',
			template: resolve(__dirname, '../src/entries/index.html'),
		}),
		new webpack.HotModuleReplacementPlugin(),
		// enable HMR globally

		new webpack.NamedModulesPlugin(),
		// prints more readable module names in the browser console on HMR updates
	],

});