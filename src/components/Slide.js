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
			data:{
				title:'',
				pages:[]
			}
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
		let { index,data } = this.state
		if(evt.metaKey) return
		evt.preventDefault()
		switch(evt.keyCode) {
		case 39:
			index = index+1
			break
		case 37:
			index = index-1
			break
		default:
		}
		if(index < 0) index = 0
		if(index > data.pages.length-1) index = data.pages.length-1
		this.context.router.push('/'+index)
	}
	componentDidMount() {
		const { route,dispatch } = this.props
		let that = this
		window.addEventListener('keydown',this.onKeyDown)
		window.addEventListener('resize',this.onResize)
		//
		let data = JSON.parse(document.getElementById('data').text)
		this.setState({
			data:data,
			index:parseInt(route.index)||0
		})
		console.log(data.attributes)
	}
	componentWillUnmount() {
		window.removeEventListener('keydown',this.onKeyDown)
		window.removeEventListener('resize',this.onResize)
	}
	componentWillReceiveProps(nextProps) {
		const { dispatch } = this.props
		const { index } = this.state
		if(index !== nextProps.route.index) {
			this.setState({
				index:parseInt(nextProps.route.index)||0
			})
		}
	}
	onMouseUp(evt) {
		let { dx,index,width,data } = this.state
		this.setState({
			dragging:false,
			dx:0
		})
		if(Math.abs(dx) > 50) {
			let newIndex = index + (dx > 0 ? -1 : 1)
			if(newIndex < 0) newIndex = 0
			if(newIndex > data.pages.length-1) newIndex = data.pages.length-1
			this.setState({
				index:newIndex
			})
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
		let { data,dragging,dx,index,width,height } = this.state
		let scale = 1
		let m = matrix({ tx:dx-index*width })
		return (
			<div
				ref='component'
				className={classNames({
					'slide-component':true,
					'dragging':dragging
				})}
				style={{
					background:data.attributes ? data.attributes.background : undefined
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
						transform:m.css()
					}}
				>
					{ data.pages.map((page,key) => {
						return (
							<Page index={key} key={key} html={page.html} width={width} height={height}/>
						)
					})}
				</div>
				<div className='slide-footer'>
					<div className='slide-title'>{data.title}</div>
					<div className='slide-status'>{index+1} / { data.pages.length}</div>
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
		route:ownProps.params
	}
}

export default connect(mapStateToProps)(Slide)
