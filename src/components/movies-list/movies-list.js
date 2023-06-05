import { Col, Empty, Space } from 'antd';
import Movie from '../movie';
import * as PropTypes from 'prop-types';
import { getArrayCountStep } from '../../utilities/base';
import './movies-list.css';

const getArrayOfObj = (arrayIndex, obj) => {
  let res = [];
  for (const i of arrayIndex) {
    res = [...res, obj[i]];
  }
  return res;
};

const MoviesList = ({ paginationCount, paginationNumber, movies }) => {
  if (!(paginationCount === 0)) {
    const arrayIndex = getArrayCountStep(paginationNumber, 6).map(String);
    const arrayObjects = getArrayOfObj(arrayIndex, movies);

    const arrayMovies = arrayObjects.map((mov) => {
      if (mov)
        return (
          <Col xs={24} lg={12} key={mov.id}>
            <Movie
              overview={mov.overview}
              title={mov.title}
              releaseDate={mov.releaseDate}
              posterPath={mov.posterPath}
              voteAverage={mov.voteAverage}
              id={mov.id}
              rating={mov.rating}
              genreIds={mov.genreIds}
            />
          </Col>
        );
    });

    return (
      <div className="movies-list">
        <Space size="middle" wrap>
          {arrayMovies}
        </Space>
      </div>
    );
  } else {
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
  }
};

MoviesList.propTypes = {
  paginationCount: PropTypes.number,
  paginationNumber: PropTypes.number,
  movies: PropTypes.object,
};

export default MoviesList;
