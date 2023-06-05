import { message } from 'antd';
import { useEffect } from 'react';
import { Detector } from 'react-detect-offline';
import PropTypes from 'prop-types';

let myState = true; 

const ErrorMessage = ({ online }) => {
  const [messageApi, contextHolder] = message.useMessage();

  const errorObj = {
    type: 'error',
    content: 'Интернет нагнулся',
    duration: 5,
  };

  const okObj = {
    type: 'success',
    content: 'Соеденение установлено',
    duration: 5,
  };

  const mainObj = online ? okObj : errorObj;

  const messageBase = () => {
    if (myState === online) {
      return false;
    } else {
      myState = !myState;
    }
    messageApi.open(mainObj);
  };

  useEffect(() => {
    messageBase();
  });

  return <>{contextHolder}</>;
};

ErrorMessage.propTypes = {
  online: PropTypes.bool,
};

const OfflineEl = () => {
  return (
    <Detector
      render={({ online }) => {
        return <ErrorMessage online={online} />;
      }}
    />
  );
};

export default OfflineEl;
