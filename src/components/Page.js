import 'normalize.css'
import 'styles/Page.less'
import React,{ Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import classNames from 'classnames'

class Page extends Component {
	constructor(props) {
		super(props)
		this.state = {
		}
	}
	componentDidMount() {
		const { dispatch } = this.props
	}
	componentWillReceiveProps(nextProps) {
		const { dispatch } = this.props
	}
	render() {
		let { html,index,width,height } = this.props
		return (
			<div
				className='page-component'
				style={{
					left:index*width,
					width:width,
					height:height
				}}
			>
				<div className='page-container' dangerouslySetInnerHTML={{__html:html}}/>
			</div>
		)
	}
}
//
Page.contextTypes = {
	router: React.PropTypes.object.isRequired
}
Page.propTypes = {
}
function mapStateToProps(state, ownProps) {
	return {
		route:ownProps.params
	}
}

export default connect(mapStateToProps)(Page)