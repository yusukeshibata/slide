'use strict'

const path = require('path')
const args = require('minimist')(process.argv.slice(2))

const allowedEnvs = ['development', 'lib']
const configs = {
	base: require(path.join(__dirname, 'cfg/base')),
	development: require(path.join(__dirname, 'cfg/development')),
	lib: require(path.join(__dirname, 'cfg/lib'))
}
function buildConfig(wantedEnv) {
	let isValid = wantedEnv && wantedEnv.length > 0 && allowedEnvs.indexOf(wantedEnv) !== -1
	let validEnv = isValid ? wantedEnv : 'development'
	return configs[validEnv]
}
module.exports = buildConfig(process.env.NODE_ENV||'development')
