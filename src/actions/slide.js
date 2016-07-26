import Promise from 'promise'
import async from 'async'

export const SLIDE_FETCH = 'SLIDE_FETCH'

export function fetch(req) {
	return {
		type: SLIDE_FETCH,
		data: JSON.parse(document.getElementById('data').text)
	}
}
