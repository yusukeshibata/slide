'use strict'
let path = require('path')
let defaultSettings = require('./defaults')

let additionalPaths = []

module.exports = {
	additionalPaths: additionalPaths,
	port: defaultSettings.port,
	debug: true,
	devtool: 'eval',
	output: {
		path: path.join(__dirname, '/../'+process.env.NODE_ENV),
		filename: 'app.js',
		publicPath: defaultSettings.publicPath
	},
	devServer: {
		contentBase: process.env.NODE_ENV,
		historyApiFallback: true,
		hot: true,
		port: defaultSettings.port,
		publicPath: defaultSettings.publicPath,
		noInfo: false
	},
	resolve: {
		extensions: ['', '.js', '.jsx'],
		alias: {
			datas: `${defaultSettings.srcPath}/datas/`,
			modules: `${defaultSettings.srcPath}/modules/`,
			reducers: `${defaultSettings.srcPath}/reducers/`,
			actions: `${defaultSettings.srcPath}/actions/`,
			components: `${defaultSettings.srcPath}/components/`,
			styles: `${defaultSettings.srcPath}/styles/`,
		}
	},
	module: {}
}
