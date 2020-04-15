import React from 'react';
import './App.css';
import { connect } from 'tiny-store';

function App(props) {
  const { counter, plus, loading } = props;
  return (
    <div className="App">
      <a onClick={plus}>
        {counter.count}
      </a>
    </div>
  );
}

const mapState = ({ counter, loading }) => ({
  counter, loading
});

const mapDispatch = dispatch => ({
  plus: () => dispatch({
    type: 'counter/plus',
    payload: 1,
  })
});

export default connect(mapState, mapDispatch)(App);
