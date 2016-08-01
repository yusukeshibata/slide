import Promise from 'promise'
import async from 'async'
import global from 'modules/global'
import CryptoJS from 'crypto-js'

export const SLIDE_FETCH = 'SLIDE_FETCH'

export function fetch(password) {
	let datastr = document.getElementById('data').text
	let chars = {
		'&gt;':'>',
		'&lt;':'<',
		'&amp;':'&',
		'&quot;':'"'
	}
	if(!password) password = '-'
	let data
	try {
		var bytes  = CryptoJS.AES.decrypt(datastr, password)
		datastr = bytes.toString(CryptoJS.enc.Utf8)
		data = JSON.parse(datastr.replace(/\&(gt|lt|amp|quot);/g,m => chars[m]))
	}
	catch(e) {
	}
	return {
		type: SLIDE_FETCH,
		password:password,
		data: data
	}
}
