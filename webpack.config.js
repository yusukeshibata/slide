'use strict'

const path = require('path')
const args = require('minimist')(process.argv.slice(2))

const allowedEnvs = ['development', 'production']
const configs = {
	base: require(path.join(__dirname, 'cfg/base')),
	development: require(path.join(__dirname, 'cfg/development')),
	production: require(path.join(__dirname, 'cfg/production'))
}
function buildConfig(wantedEnv) {
	let isValid = wantedEnv && wantedEnv.length > 0 && allowedEnvs.indexOf(wantedEnv) !== -1
	let validEnv = isValid ? wantedEnv : 'development'
	return configs[validEnv]
}
module.exports = buildConfig(process.env.NODE_ENV||'development')
