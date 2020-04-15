import { createElement } from 'rax';
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
