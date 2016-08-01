let global = {}
let metas = document.getElementsByTagName('meta')
for (let i=0;i<metas.length;i++) {
	let key = metas[i].getAttribute('name')
	let value = metas[i].getAttribute('content')
	global[key] = value
}

module.exports = global


