import { message } from 'antd';
import { useEffect } from 'react';
import * as PropTypes from 'prop-types';

const MessageManage = ({ status }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const key = 'updatable';

  const configs = {
    loading: {
      key,
      type: 'loading',
      content: 'Ищу...',
    },
    success: {
      key,
      type: 'success',
      content: 'Нашел!)',
    },
    'no-mov': {
      key,
      type: 'error',
      content: 'Нечего не нашел(',
    },
    error: {
      key,
      type: 'error',
      content: 'Что то пошло не так(',
    },
  };
  let openMessage = () => {
    messageApi.open(configs[status]);
  };

  if (status === '') {
    openMessage = () => {
      undefined;
    };
  }

  useEffect(() => {
    openMessage();
  });

  return <>{contextHolder}</>;
};

MessageManage.propTypes = {
  status: PropTypes.string,
};

export default MessageManage;
