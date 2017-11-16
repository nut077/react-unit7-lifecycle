import React from 'react'
import { Bar, Foo, Notes } from '../components'
import {
  compose,
  lifecycle,
  withState,
  withHandlers
} from 'recompose'

const App = ({ div, handleClick, getComponent, notes, onNoteChange }) => (
  <div>
    <Bar message={ div.toString() }/>
    { getComponent() }
    <button type='button' onClick={ () => handleClick() }>Click</button>
    <Notes notes={ notes } onNoteChange={ onNoteChange }/>
  </div>
);

export default compose(
  withState('div', 'setDiv', true),
  withState('notes', 'setNotes', [
    'Note#1',
    'Note#2',
    'Note#3',
  ]),
  withHandlers({
    handleClick: ({ div, setDiv }) => () => {
      setDiv(!div);
    },
    getComponent: ({ div }) => () => {
      const foo = <Foo message={ div.toString() }/>;
      if (div) {
        return (
          <div>{ foo }</div>
        )
      }
      return (
        <span>{ foo }</span>
      )
    },
    onNoteChange: ({ notes, setNotes }) => (note, index) => {
      setNotes([
        ...notes.slice(0, index),
        note,
        ...notes.slice(index + 1)
      ])
    }
  }),
  lifecycle({
    componentWillMount() {
      console.log('App componentWillMount');
    },
    componentDidMount() {
      console.log('App componentDidMount');
    },
    componentWillReceiveProps(nextProps) {
      console.log(`App componentWillReceiveProps ${nextProps}`);
    },
    /*shouldComponentUpdate: (nextProps, nextState) => {
      console.log('App shouldComponentUpdate');
      return true or false;
    },*/
    componentWillUpdate() {
      console.log('App componentWillUpdate');
    },
    componentDidUpdate() {
      console.log('App componentDidUpdate');
    },
    componentWillUnmount() {
      console.log('App componentWillUnmount');
    }
  })
)(App);
