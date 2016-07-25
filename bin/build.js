var marked = require('marked')
var path = require('path')
var fs = require('fs')
var async = require('async')
var request = require('request')
var fm = require('front-matter')
var _ = require('lodash')
var DataUri = require('datauri')
var argv = require('yargs')
	.usage('$0 <cmd> [args]')
	.option('output', {
		alias: 'o',
		describe: 'output filepath'
	})
	.demand(1)
	.help('help')
	.argv
var filepath = argv._[0]
var input = path.parse(filepath)
var output = argv.output || path.resolve(input.dir,input.name+'.json')

var getResources = function(tokens,callback) {
	var dataqueue = {}
	var test = new marked.Renderer()
	test.image = function(href,title,text) {
		var check = href.match(/(^https?:)?.*(\.[^\.\?]+)(\?.+)?$/)
		dataqueue[href] = {
			remote:!!check[1],
			ext:check[2],
			url:check[1] ? href : path.resolve(input.dir,href)
		}
	}
	var tokens = _.cloneDeep(tokens)
	tokens.links = {}
	marked.parser(tokens,{ renderer:test })
	async.each(Object.keys(dataqueue),function(key,callback) {
		var data = dataqueue[key]
		if(data.remote) {
			request(data.url,function(err,res,body) {
				var datauri = new DataUri()
				datauri.format(data.ext, body)
				dataqueue[key] = datauri.content
				callback()
			})
		} else {
			DataUri.promise(data.url)
				.then(function(content) {
					dataqueue[key] = content
					callback()
				})
				.catch(function(err) {
					callback(err)
				})
		}
	},function(err) {
		callback(err,dataqueue)
	})
}

fs.readFile(filepath,'utf8',function(err,buf) {
	var content = fm(buf)
	var tokens = marked.lexer(content.body,{
		gfm: true,
		tables: true,
		breaks: true,
		pedantic: false,
		sanitize: true,
		smartLists: true,
		smartypants: false
	})
	var title = ''
	var pages = []
	tokens.forEach(function(token) {
		if(token.type==='heading') {
			pages.push({
				tokens:[]
			})
		}
		if(token.type==='heading' && token.depth === 1) {
			title = token.text
		}
		pages[pages.length-1].tokens.push(token)
	})
	async.each(pages,function(page,callback) {
		async.waterfall([
			// get resources
			function(callback) {
				getResources(page.tokens,callback)
			},
			// generate html
			function(dataqueue,callback) {
				var renderer = new marked.Renderer()
				renderer.image = function(href,title,text) {
					var content = dataqueue[href]
					return `<img src="${content}" alt="${text}"/>`
				}
				tokens = _.cloneDeep(page.tokens)
				tokens.links = {}
				var html = marked.parser(tokens,{ renderer:renderer })
				delete page.tokens
				page.html = html
				callback()
			},
		],function(err) {
			callback(err)
		})
	},function(err) {
		if(err) {
			console.error(err)
			return
		}
		console.log('output:',output)
		fs.writeFile(output,JSON.stringify({
			attributes:content.attributes,
			title:title,
			pages:pages
		}),function(err) {
			if(err) {
				console.error(err)
				return
			}
		})
	})
})
