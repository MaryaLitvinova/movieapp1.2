import { Row, Space, Tabs } from 'antd';
import './app.css';
import { Component } from 'react';
import { Detector } from 'react-detect-offline';

import * as PropTypes from 'prop-types';
import OfflineEl from '../offline';
import Search from '../search';
import Rated from '../rated';

Detector.propTypes = { render: PropTypes.func };

class App extends Component {
  state = {
    loading: true,
    movies: {},
    moviesCount: 0,
    paginationCount: 0,
    paginationNumber: 1,
    search: '',
  };

  render() {
    const items = [
      {
        key: '1',
        label: `Search`,
        children: <Search />,
      },
      {
        key: '2',
        label: `Rated`,
        children: <Rated />,
      },
    ];

    return (
      <>
        <Row className="app">
          <Space direction="vertical" size="middle" align="center" style={{ width: '100%' }}>
            <Tabs defaultActiveKey="1" centered items={items} />
          </Space>
        </Row>
        <OfflineEl />
      </>
    );
  }
}

export default App;
