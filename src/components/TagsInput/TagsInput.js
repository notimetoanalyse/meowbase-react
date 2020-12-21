import React from 'react'

const TagsInput = ({tags, handleSetTags, removeTags}) => {
    const addTags = event => {
        event.preventDefault();
        if (event.target.value !== "" || (tags && tags.length < 6) ) {
            handleSetTags([...tags, event.target.value]);
            event.target.value = "";
        }
    };

    return (
<>
        <label htmlFor='tags'>Tags</label>
        <div className="tags-input">
            <ul id="tags">
                {tags && tags.map((tag, index) => (
                    <li key={index} className="tag is-medium is-primary">
                        <span className='tag-title'>{tag}</span>
                        <span className='tag-close-icon is-primary'
                              onClick={() => removeTags(index)}
                        >
							x
						</span>
                    </li>
                ))}
            </ul>

            <input
                type="text"
                onKeyUp={e => e.key === 'Enter' ?
                    addTags(e) : null
                }
                placeholder="Press enter to add tags"
                id='tags-input-el'

            />
        </div>
    </>
    );
};

export default TagsInput;