import { Component } from 'react';
import MoviesList from '../list';
import { Pagination, Space } from 'antd';
import { debounce } from 'lodash';
import {
  checkAvailabilityKeysInKeysAndFindIdPage,
  getArrayCountStep,
  getCountPagination,
  updateObjForArray,
} from '../../utilities/base';
import MessageManage from '../message';
import { getMovieRated } from '../../services/movie-session-api';

class Rated extends Component {
  state = {
    movies: {},
    status: '',
    search: '',
    paginationCount: 0,
    paginationNumber: 1,
  };

  getMovies = debounce((pages) => {
    this.setState({
      status: 'loading',
    });
    for (let page of pages) {
      let response = getMovieRated(page);
      response.then(
        (response) => {
          const movies = response.results;
          let moviesObj = {};
          let count = 0;
          movies.map((mov) => {
            moviesObj[count] = mov;
            count++;
          });
          const status = response.totalResults === 0 ? 'no-mov' : 'success';
          this.setState((state) => {
            return {
              movies: { ...state.movies, ...updateObjForArray(getArrayCountStep(response.page, 20), moviesObj) },
              moviesCount: response.totalResults,
              paginationCount: getCountPagination(response.totalResults),
              loading: false,
              status: status,
            };
          });
        },
        () => {
          this.setState({
            status: 'error',
          });
        }
      );
    }
  }, 750);

  onChangePagination = (number) => {
    this.setState({
      paginationNumber: number,
    });
    const arrayIndex = getArrayCountStep(number, 6).map(String);
    const checkAvailabilityMovies = checkAvailabilityKeysInKeysAndFindIdPage(
      Object.keys(this.state.movies),
      arrayIndex
    );
    if (checkAvailabilityMovies !== true) {
      this.getMovies(this.state.search, checkAvailabilityMovies);
    }
  };

  componentDidMount() {
    this.getMovies([1]);
    window.addEventListener('changeRate', () => {
      this.getMovies([1]);
    });
  }

  render() {
    console.log(this.state.movies);
    return (
      <Space direction="vertical" align="center">
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

export default Rated;
