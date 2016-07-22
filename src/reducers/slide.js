import {
	REQUEST_SLIDE_FETCH,
	RECEIVE_SLIDE_FETCH
} from 'actions/slide'
import {REHYDRATE} from 'redux-persist/constants'

function reducer(state = {
}, action) {
	switch (action.type) {
		case REQUEST_SLIDE_FETCH:
			return Object.assign({}, state, {
				error:null
			})
		case RECEIVE_SLIDE_FETCH:
			{
				let response = action.response||{}
				let success = response.status===200
				let body = response.body
				if(!success) {
					return Object.assign({}, state, {
						error:body
					})
				}
				return Object.assign({}, state, {
					initialized:true,
					user:body.user
				})
			}
		default:
			return state
	}
}

export default reducer
