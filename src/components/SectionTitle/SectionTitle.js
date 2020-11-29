import React from 'react'
import SuccessButton from '../Buttons/SuccessButton'

export default function SectionTitle(props) {
	return (
		<div className="wrapper-title-and-btn">
			<p className="title is-5" style={{ "whiteSpace": "nowrap" }} id="current-page-text-title">{props.title}</p>
			{props.title == 'Patients' &&
				<SuccessButton title="Add patient" onClick={props.onClick} />
			}
		</div>
	)
}
