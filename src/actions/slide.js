import Promise from 'promise'
import async from 'async'

export const SLIDE_FETCH = 'SLIDE_FETCH'

export function fetch(req) {
	let datastr = document.getElementById('data').text
	let chars = {
		'&gt;':'>',
		'&lt;':'<',
		'&amp;':'&',
		'&quot;':'"'
	};
	return {
		type: SLIDE_FETCH,
		data: JSON.parse(datastr.replace(/\&(gt|lt|amp|quot);/g,m => chars[m]))
	}
}
