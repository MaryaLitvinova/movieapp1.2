import { Input } from 'antd';
import * as PropTypes from 'prop-types';

const MyInput = ({ value, onChange }) => {
  const input = (
    <Input
      placeholder="Type to search..."
      allowClear
      value={value}
      onChange={onChange}
      rootClassName={'movie__input'}
      maxLength={36}
    />
  );

  return <>{input}</>;
};

MyInput.propTypes = { value: PropTypes.string, onChange: PropTypes.func };

export default MyInput;
