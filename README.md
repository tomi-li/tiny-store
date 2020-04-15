# Tiny 5kb, rematch,DVA api like State Management lib. support async await.

**先不要用 lerna 去 bootstrap 避免 example 启动时出现 react/rax can not be solved**
手动进入每一个文件夹去 tnpm install
 
## React

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


## Rax boilerplate

```jsx
  import TinyStore from 'tiny-store-rax';

    export default function Home() {
      return (
        <TinyStore models={models}>
          <View className="home">
            <Logo />
            <Text className="title">Welcome to Your Rax App</Text>
            <Text className="info">More information about Rax</Text>
            <Text className="info">Visit https://rax.js.org</Text>
          </View>
        </TinyStore>
      );
    }
```

```jsx
import Text from 'rax-text';
import { connect } from 'tiny-store-rax';
import './index.css';

const logo = (props) => {
  const { counter, plus } = props;

  return (
    <Text onClick={plus}>{counter.count}</Text>
  );
};

const mapState = ({ counter, loading }) => ({
  counter, loading
});

const mapDispatch = dispatch => ({
  plus: () => dispatch({
    type: 'counter/plus',
    payload: 1,
  })
});

export default connect(mapState, mapDispatch)(logo);
```


model as same as above.
