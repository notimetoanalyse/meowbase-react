import React from 'react';

export default function SuccessButton(props) {
  return (
    <button className="button is-primary" onClick={props.clicked}>
      {props.title}
    </button>
  );
}
