import { Component } from 'react';
import { debounce } from 'lodash';
import { searchMoviesAPI } from '../../services/movie-api';
import MessageManage from '../message';
import MoviesList from '../list';
import {
  checkAvailabilityKeysInKeysAndFindIdPage,
  getArrayCountStep,
  getCountPagination,
  updateObjForArray,
} from '../../utilities/main';
import MyInput from '../input';
import { Pagination, Space } from 'antd';

function getMoviesObj(movies) {
  let moviesObj = {};
  let count = 0;
  movies.map((mov) => {
    moviesObj[count] = mov;
    count++;
  });
  return moviesObj;
}

class Search extends Component {
  state = {
    movies: {},
    status: '',
    search: '',
    paginationCount: 0,
    paginationNumber: 1,
  };

  changeState = (str) => {
    this.setState({
      status: str,
    });
  };

  changePaginationNumber = (number) => {
    this.setState({
      paginationNumber: number,
    });
  };

  getMovies = debounce((str, pages) => {
    this.changeState('loading');
    for (let page of pages) {
      searchMoviesAPI(str, page).then(
        (response) => {
          const movies = response.results;
          let moviesObj = getMoviesObj(movies);
          const status = response.totalResults === 0 ? 'no-mov' : 'success';
          this.changeState(status);
          this.setState((state) => {
            return {
              movies: { ...state.movies, ...updateObjForArray(getArrayCountStep(response.page, 20), moviesObj) },
              moviesCount: response.totalResults,
              paginationCount: getCountPagination(response.totalResults),
              loading: false,
            };
          });
        },
        () => {
          this.changeState('error');
        }
      );
    }
  }, 750);

  onChangePagination = (number) => {
    this.changePaginationNumber(number);
    const arrayIndex = getArrayCountStep(number, 6).map(String);
    const checkAvailabilityMovies = checkAvailabilityKeysInKeysAndFindIdPage(
      Object.keys(this.state.movies),
      arrayIndex
    );
    if (checkAvailabilityMovies !== true) {
      this.getMovies(this.state.search, checkAvailabilityMovies);
    }
  };

  onChangeSearch = (e) => {
    this.setState({
      search: e.target.value,
    });
    if (e.target.value.replace(/\s/g, '').length) {
      this.getMovies(e.target.value, [1]);
      this.changePaginationNumber(1);
    }
  };

  render() {
    return (
      <Space direction="vertical" align="center">
        <MyInput value={this.state.search} onChange={this.onChangeSearch} />
        <MoviesList
          paginationCount={this.state.paginationCount}
          paginationNumber={this.state.paginationNumber}
          movies={this.state.movies}
        />
        <Pagination
          disabled={this.state.paginationCount === 0}
          current={this.state.paginationNumber}
          total={this.state.paginationCount}
          onChange={this.onChangePagination}
          pageSize={1}
        />
        <MessageManage status={this.state.status} />
      </Space>
    );
  }
}

export default Search;
