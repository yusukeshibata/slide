'use strict'

const path = require('path')
const srcPath = path.join(__dirname, '/../src')
const dfltPort = 8080

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
				test: /\.css$/,
				loader: 'style-loader!css-loader'
			},
			{
				test: /\.less/,
				loader: 'style-loader!css-loader!less-loader'
			}
		]
	}
}

module.exports = {
	srcPath: srcPath,
	publicPath: '/',
	port: dfltPort,
	getDefaultModules: getDefaultModules
}
