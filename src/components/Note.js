import React from 'react'
import { pure } from 'recompose'

const Note = ({ index, note, onNoteChange }) => (
  <li>
    <input
      type='text'
      defaultValue={ note }
      onChange={event => onNoteChange(event.target.value, index)}/>
    <p>{ note }</p>
  </li>
);

export default pure(Note)