import Promise from 'promise'
import async from 'async'

export const REQUEST_SLIDE_FETCH = 'REQUEST_SLIDE_FETCH'
export const RECEIVE_SLIDE_FETCH = 'RECEIVE_SLIDE_FETCH'

export function fetch(user) {
	return (dispatch,getState) => {
		let state = getState()
		let response = user.getSlideResponse()
		let req = {
			persist:state.persist,
			method:'post',
			endpoint:'slide/google',
			data : {
				id_token:response.id_token
			}
		}
		async.waterfall([
			function(callback) {
				dispatch(requestFetch(req))
				callback(null)
			},
			function(callback) {
				Request(req).then(res => callback(null,res))
			},
			function(res,callback) {
				user
					.disconnect()
					.then(() => callback(null,res))
			}
		],function(err,res) {
			dispatch(receiveFetch(req,res))
		})
	}
}
function requestFetch(req) {
	return {
		type: REQUEST_SLIDE_FETCH,
		request:req
	}
}
function receiveFetch(req,res) {
	return {
		type: RECEIVE_SLIDE_FETCH,
		request:req,
		response:res
	}
}
