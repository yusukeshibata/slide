import 'normalize.css'
import 'styles/App.less'
import React,{ Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as action from 'actions/slide'
import { Link } from 'react-router'
import DocumentTitle from 'react-document-title'
import classNames from 'classnames'

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
		}
	}
	componentDidMount() {
		const { dispatch } = this.props
		let that = this
	}
	componentWillReceiveProps(nextProps) {
		const { dispatch } = this.props
	}
	render() {
		const {
			routes,
			route,
			children
		} = this.props
		return (
			<DocumentTitle
				title='Slide'
			>
				<div className='index-component'>
				</div>
			</DocumentTitle>
		)
	}
}
//
App.contextTypes = {
	router: React.PropTypes.object.isRequired
}
App.propTypes = {
}
function mapStateToProps(state, ownProps) {
	return {
		route:ownProps.params
	}
}

export default connect(mapStateToProps)(App)
