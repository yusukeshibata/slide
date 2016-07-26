/*eslint no-console:0 */
require('core-js/fn/object/assign')
var webpack = require('webpack')
var WebpackDevServer = require('webpack-dev-server')
var config = require('./webpack.config')

new WebpackDevServer(webpack(config), config.devServer)
.listen(config.port, '0.0.0.0', function(err) {
	if (err) {
		console.error(err)
		return
	}
	console.log('Listening at localhost:' + config.port)
})
