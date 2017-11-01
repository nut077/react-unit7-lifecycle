import React from 'react'
import PropTypes from 'prop-types'
import { compose, lifecycle, setPropTypes } from 'recompose'

const Foo = ({ message }) => (
  <div>Foo { message }</div>
);

export default compose(
  setPropTypes({
    message: PropTypes.string.isRequired
  }),
  lifecycle({
    componentWillMount: () => {
      console.log('Foo componentWillMount');
    },
    componentDidMount: () => {
      console.log('Foo componentDidMount');
    },
    componentWillReceiveProps: (nextProps) => {
      console.log(`Foo componentWillReceiveProps ${nextProps}`);
    },
    /*shouldComponentUpdate: (nextProps, nextState) => {
      console.log('Foo shouldComponentUpdate');
      return true or false;
    },*/
    componentWillUpdate: () => {
      console.log('Foo componentWillUpdate');
    },
    componentDidUpdate: () => {
      console.log('Foo componentDidUpdate');
    },
    componentWillUnmount: () => {
      console.log('Foo componentWillUnmount');
    }
  })
)(Foo)