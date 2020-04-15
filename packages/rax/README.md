# Tiny 5kb, rematch api like State Management lib. 


**index.js**

```javascript
import TinyStore from 'tiny-store';
import { counter } from './model';

ReactDOM.render(
  <TinyStore models={{ counter }}>
    <App />
  </TinyStore>,
  document.getElementById('root')
);
```

### component

```jsx
import { connect } from 'tiny-store';

function App(props) {
  const { counter, plus } = props;
  return (
    <div className="App">
      <a onClick={plus}>
        {counter.count}
      </a>
    </div>
  );
}
const mapState = ({ counter }) => ({
  counter
});

const mapDispatch = dispatch => ({
  plus: () => dispatch({
    type: 'counter/plus',
    payload: 1,
  })
});

export default connect(mapState, mapDispatch)(App);
```

### models

```jsx
export const counter = {
  state: {
    count: 0
  },
  effects: {
    async plus(state, payload, dispatch) {
      const { res } = await axios.request('url')
      // do your stuff
      dispatch({
        type: 'counter/save',
        payload: {
          count: state.count + 1,
        }
      });
    },
  },
  reducers: {
    save(state, payload) {
      return {
        ...state,
        ...payload,
      };
    },
  }
};
```
