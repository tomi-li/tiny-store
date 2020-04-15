import React from 'react';
import ReactDOM from 'react-dom';
import TinyStore, { connect } from 'tiny-store';
import models from './models';

const mapState = ({ counter, loading }) => ({
  counter, loading
});

const mapDispatch = dispatch => ({
  plus: () => dispatch({
    type: 'counter/plus',
    payload: 1,
  })
});

const App = connect(mapState, mapDispatch)((props) => {
  const { counter, plus } = props;
  return <div onClick={plus}> {counter.count}</div>;
});

ReactDOM.render(
  <TinyStore models={models}><App /></TinyStore>,
  document.getElementById('root')
);
