'use strict'

const path = require('path')
const srcPath = path.join(__dirname, '/../src')
const dfltPort = 8080

/**
 * Get the default modules object for webpack
 * @return {Object}
 */
function getDefaultModules() {
	return {
		preLoaders: [
			{
				test: /\.(js|jsx)$/,
				include: srcPath,
				loader: 'eslint-loader'
			}
		],
		loaders: [
			{
				test: /\.json$/,
				loader: 'json-loader'
			},
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader'
			},
			{
				test: /\.less/,
				loader: 'style-loader!css-loader!less-loader'
			},
			{
				test: /\.(woff|woff2)$/,
				loader: 'url-loader?limit=81920'
			},
			{
				test: /\.(png|jpg|gif)$/,
				loader: 'url-loader'
			}
		]
	}
}

module.exports = {
	srcPath: srcPath,
	publicPath: '/assets/',
	port: dfltPort,
	getDefaultModules: getDefaultModules
}
