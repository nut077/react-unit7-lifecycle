import React from 'react'
import PropTypes from 'prop-types'
import { compose, lifecycle, setPropTypes } from 'recompose'

const Bar = ({ message }) => (
  <div>Bar { message }</div>
);

export default compose(
  setPropTypes({
    message: PropTypes.string.isRequired
  }),
  lifecycle({
    componentWillMount() {
      console.log('Bar componentWillMount');
    },
    componentDidMount() {
      console.log('Bar componentDidMount');
    },
    componentWillReceiveProps(nextProps) {
      console.log(`Bar componentWillReceiveProps ${nextProps}`);
    },
    /*shouldComponentUpdate: (nextProps, nextState) => {
      console.log('Bar shouldComponentUpdate');
      return true or false;
    },*/
    componentWillUpdate() {
      console.log('Bar componentWillUpdate');
    },
    componentDidUpdate() {
      console.log('Bar componentDidUpdate');
    },
    componentWillUnmount() {
      console.log('Bar componentWillUnmount');
    }
  })
)(Bar)