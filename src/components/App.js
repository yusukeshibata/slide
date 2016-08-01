import 'styles/App.less'
import React,{ Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as action from 'actions'
import { Link } from 'react-router'
import DocumentTitle from 'react-document-title'
import classNames from 'classnames'
import Slide from 'components/Slide'
import global from 'modules/global'
import Formsy from 'formsy-react'
import Password from 'components/Password'

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
		}
		this.onFullscreen = this.onFullscreen.bind(this)
		this.onStart = this.onStart.bind(this)
		this.onResize = this.onResize.bind(this)
		this.onSubmit = this.onSubmit.bind(this)
	}
	onSubmit() {
		let { dispatch } = this.props
		let model = this.refs.form.getModel()
		this.context.router.push('/'+model.password+'/')
	}
	onResize() {
		this.setState({
			fullscreen:this.getFullscreen()
		})
	}
	componentDidMount() {
		const { route,dispatch } = this.props
		let that = this
		window.addEventListener('resize',this.onResize)
		if(this.refs.password) {
			this.refs.password.setFocus()
		}
		dispatch(action.slide.fetch(route.password))
	}
	componentWillUmount() {
		window.removeEventListener('resize',this.onResize)
	}
	componentWillReceiveProps(nextProps) {
		const { password,route,slide,dispatch } = this.props
		if((route.password !== nextProps.route.password) || (!slide && nextProps.route.password)) {
			dispatch(action.slide.fetch(nextProps.route.password))
		}
		if(!route.password && password !== nextProps.password) {
			this.context.router.replace('/'+nextProps.password+'/')
		}
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
		let { route } = this.props
		this.context.router.push('/'+route.password+'/0')
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
				<div>
				{ !slide &&
					<div className='app-input'>
						<Formsy.Form ref='form' className='app-input-container' onValidSubmit={this.onSubmit}>
							<Password ref='password' required name='password'/>
						</Formsy.Form>
					</div>
				}
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
		route:ownProps.params,
		password:state.slide.password,
		slide:state.slide.data
	}
}

export default connect(mapStateToProps)(App)
