import React from 'react'
import Tag from './Tag.js'

export default function Tags([tags]) {
	return tags.map(tag => <Tag title={tag.title} key={tag.title}></Tag>);
}