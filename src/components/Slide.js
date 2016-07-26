import 'normalize.css'
import 'styles/Slide.less'
import React,{ Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import classNames from 'classnames'
import Page from 'components/Page'
import matrix from 'modules/matrix'

class Slide extends Component {
	constructor(props) {
		super(props)
		this.state = {
			dx:0,
			index:0,
			width:window.innerWidth,
			height:window.innerHeight,
			fontsize:100
		}
		this.onResize = this.onResize.bind(this)
		this.onKeyDown = this.onKeyDown.bind(this)
		this.onMouseMove = this.onMouseMove.bind(this)
		this.onMouseUp = this.onMouseUp.bind(this)
		this.onMouseDown = this.onMouseDown.bind(this)
	}
	onResize() {
		this.setState({
			width:window.innerWidth,
			height:window.innerHeight
		})
	}
	onKeyDown(evt) {
		let { fontsize,index } = this.state
		let { route,slide } = this.props
		if(evt.metaKey) return
		evt.preventDefault()
		let newFontsize = fontsize
		switch(evt.keyCode) {
		case 39:
			index = index+1
			break
		case 37:
			index = index-1
			break
		case 38:
			if(evt.shiftKey) newFontsize = newFontsize*1.1
			break
		case 40:
			if(evt.shiftKey) newFontsize = newFontsize*0.9
			break
		case 48:
			newFontsize = 100
			break
		default:
		}
		if(index < 0) index = 0
		if(index > slide.pages.length-1) index = slide.pages.length-1
		if(route.index !== index) {
			this.context.router.push('/'+index)
		}
		this.setState({
			fontsize:newFontsize
		})
	}
	componentDidMount() {
		const { route,dispatch } = this.props
		let that = this
		window.addEventListener('keydown',this.onKeyDown)
		window.addEventListener('resize',this.onResize)
		//
		this.setState({
			index:parseInt(route.index)||0
		})
	}
	componentWillUnmount() {
		window.removeEventListener('keydown',this.onKeyDown)
		window.removeEventListener('resize',this.onResize)
	}
	componentWillReceiveProps(nextProps) {
		const { dispatch } = this.props
		const { index } = this.state
		let that = this
		if(index !== nextProps.route.index) {
			this.setState({
				transition:true,
				index:parseInt(nextProps.route.index)||0
			})
			setTimeout(function() {
				that.setState({
					transition:false
				})
			},300)
		}
	}
	onMouseUp(evt) {
		let { dx,index,width } = this.state
		let { slide } = this.props
		this.setState({
			dragging:false,
			dx:0
		})
		if(Math.abs(dx) > 50) {
			let newIndex = index + (dx > 0 ? -1 : 1)
			if(newIndex < 0) newIndex = 0
			if(newIndex > slide.pages.length-1) newIndex = slide.pages.length-1
			this.context.router.push('/'+newIndex)
		}
	}
	onMouseMove(evt) {
		let { dx,x,dragging } = this.state
		if(!dragging) return
		let target = evt.type.match(/^touch/) ? evt.nativeEvent.touches[0] : evt
		this.setState({
			dx:dx+(target.clientX-x),
			x:target.clientX
		})
	}
	onMouseDown(evt) {
		let target = evt.type.match(/^touch/) ? evt.nativeEvent.touches[0] : evt
		this.setState({
			dragging:true,
			x:target.clientX,
			dx:0
		})
	}
	render() {
		let { fontsize,transition,dragging,dx,index,width,height } = this.state
		let { slide } = this.props
		let scale = 1
		let m = matrix({ tx:dx-index*width })
		document.body.className = classNames({
			transition:transition
		})
		return (
			<div
				ref='component'
				className={classNames({
					'slide-component':true,
					'dragging':dragging
				})}
				style={{
					background:slide.attributes ? slide.attributes.background : undefined,
					color:slide.attributes ? slide.attributes.color : undefined
				}}
				onMouseDown={this.onMouseDown}
				onMouseUp={this.onMouseUp}
				onMouseMove={this.onMouseMove}
				onMouseLeave={this.onMouseUp}
				onTouchStart={this.onMouseDown}
				onTouchEnd={this.onMouseUp}
				onTouchMove={this.onMouseMove}
			>
				<div
					className='slide-container'
					style={{
						fontSize:fontsize+'%',
						transform:m.css()
					}}
				>
					{ slide.pages.map((page,key) => {
						return (
							<Page index={key} key={key} html={page.html} width={width} height={height}/>
						)
					})}
				</div>
				<div className='slide-footer'>
					<div className='slide-title'>{slide.title}</div>
					<div className='slide-bar'>
						<div
							className='slide-progress'
							style={{
								width:(index+1)/slide.pages.length*100+'%'
							}}
						>{index+1} / { slide.pages.length}</div>
					</div>
				</div>
			</div>
		)
	}
}
//
Slide.contextTypes = {
	router: React.PropTypes.object.isRequired
}
Slide.propTypes = {
}
function mapStateToProps(state, ownProps) {
	return {
		route:ownProps.params,
		slide:state.slide.data||{pages:[]}
	}
}

export default connect(mapStateToProps)(Slide)
