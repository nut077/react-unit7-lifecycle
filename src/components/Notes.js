import React from 'react'
import { pure } from 'recompose'
import Note from './Note';

const Notes = ({ notes, onNoteChange }) => (
  <ul>
    {
      notes.map((note, index) =>
        <Note
          key={ index }
          index={ index }
          note={ note }
          onNoteChange={ onNoteChange }/>
      )
    }
  </ul>
);

export default pure(Notes)
