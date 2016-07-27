import 'styles/App.less'
import React,{ Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as action from 'actions'
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
		this.onStart = this.onStart.bind(this)
		this.onResize = this.onResize.bind(this)
	}
	onResize() {
		this.setState({
			fullscreen:this.getFullscreen()
		})
	}
	componentDidMount() {
		const { dispatch } = this.props
		let that = this
		dispatch(action.slide.fetch())
		window.addEventListener('resize',this.onResize)
	}
	componentWillUmount() {
		window.removeEventListener('resize',this.onResize)
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
			return document.mozFullScreenElement
		} else if(document.msFullscreenElement) {
			return document.msFullscreenElement
		}
	}
	onFullscreen() {
		let elem = document.body
		if(elem.requestFullscreen) {
			elem.requestFullscreen()
		} else if(elem.webkitRequestFullscreen) {
			elem.webkitRequestFullscreen()
		} else if(elem.mozRequestFullScreen) {
			elem.mozRequestFullScreen()
		} else if(elem.msRequestFullscreen) {
			elem.msRequestFullscreen()
		}
	}
	onStart() {
		this.context.router.push('/0')
	}
	render() {
		const { fullscreen } = this.state
		const {
			routes,
			route,
			children,
			slide
		} = this.props
		return (
			<DocumentTitle
				title={slide ? (route.index!==undefined ? (parseInt(route.index)+1)+'/'+slide.pages.length+' ' : '')+slide.title : 'Slide' }
			>
				{ slide &&
					<div
						ref='slide'
						className={{
							'app-component':true,
							fullscreen:!!fullscreen
						}}
					>
						{!children &&
							<div className='app-start'>
								<div
									className='app-start-button'
									onClick={this.onStart}
									dangerouslySetInnerHTML={{__html:slide.title}}
								>
								</div>
							</div>
						}
						{ children &&
						<div className='app-component'>
							{ children }
						</div>
						}
						{ !fullscreen &&
						<div
							onClick={this.onFullscreen}
							className='app-fullscreen'
						/>
						}
					</div>
				}
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
		route:ownProps.params,
		slide:state.slide.data
	}
}

export default connect(mapStateToProps)(App)
