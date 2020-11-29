import React, { Fragment } from 'react'

export default function TextInput(props) {
	return (
		<Fragment>
			<label className={props.labelClassName}>{props.label}</label>
			<input type="text" id={props.id} className="form-input input" placeholder={props.placeholder} />
		</Fragment>
	)
}
