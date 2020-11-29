import React from 'react';

export default function CancelButton(props) {
	return (
		<button className="button" onClick={props.clicked}>
			{props.title}
		</button>
	)
}