import React from 'react'

export default function Tag(props) {
	function getRandomColor() {
		const tagColors = [
			'#00d1b2',
			'#3273dc',
			'#48c774',
			'#ffdd57',
			'#ff3860',
			'teal',
			'orchid',
			'purple',
		];
		return tagColors[Math.floor(Math.random() * tagColors.length)];
	}

	const style = {
		backgroundColor: getRandomColor(),
		color: "white"
	}
	return (
		<div>
			<span className="tag is-medium" style={style}>${props.title}</span>
		</div>
	)
}
