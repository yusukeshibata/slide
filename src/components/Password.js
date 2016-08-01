import React from 'react'
import Formsy from 'formsy-react'

const Password = React.createClass({
	mixins:[Formsy.Mixin],
	onChange(event) {
		this.setValue(event.currentTarget.value)
	},
	setFocus() {
		this.refs.input.focus()
	},
	render() {
		return (
			<input
				type='password'
				ref='input'
				name={this.props.name}
				onChange={this.onChange}
			/>
		)
	}
})
export default Password
