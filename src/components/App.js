import 'styles/App.less'
import React,{ Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as action from 'actions/slide'
import { Link } from 'react-router'
import DocumentTitle from 'react-document-title'
import classNames from 'classnames'
import Slide from 'components/Slide'

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
		}
		this.onFullscreen = this.onFullscreen.bind(this)
	}
	componentDidMount() {
		const { dispatch } = this.props
		let that = this
	}
	componentWillReceiveProps(nextProps) {
		const { dispatch } = this.props
	}
	getFullscreen() {
		if(document.fullscreenElement) {
			return document.fullscreenElement
		} else if(document.webkitFullscreenElement) {
			return document.webkitFullscreenElement
		} else if(document.mozFullScreenElement) {
			document.mozFullScreenElement
		} else if(document.msFullscreenElement) {
			document.msFullscreenElement
		}
	}
	onFullscreen() {
		let elem = this.refs.slide
		if(elem.requestFullscreen) {
			elem.requestFullscreen()
		} else if(elem.webkitRequestFullscreen) {
			elem.webkitRequestFullscreen()
		} else if(elem.mozRequestFullScreen) {
			elem.mozRequestFullScreen()
		} else if(elem.msRequestFullscreen) {
			elem.msRequestFullscreen()
		}
		this.context.router.push('/0')
	}
	render() {
		const {
			fullscreen,
			routes,
			route,
			children
		} = this.props
		return (
			<DocumentTitle
				title='Slide'
			>
				<div>
				{!children &&
					<div
						className='app-start'
						onClick={this.onFullscreen}
					>
					Click to start!
					</div>
				}
				<div ref='slide' className='app-component'>
					{ children }
				</div>
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