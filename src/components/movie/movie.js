import './movie.css';
import { Rate, Typography } from 'antd';
import { format } from 'date-fns';

import PropTypes from 'prop-types';
import MovieImg from '../movie-img';
import MyProgress from '../my-progress';
import { addMovieRated } from '../../services/movie-session-api';
import GenreList from '../genre-list';

const { Title } = Typography;

function trimString(str) {
  if (str.length >= 210) {
    const i = str.indexOf(' ', 210);
    return `${str.slice(0, i)} ...`;
  }
  return str;
}

function getDateString(str) {
  try {
    return format(new Date(str), 'MMMM d, y');
  } catch (error) {
    return 'Дата не найдена';
  }
}

function Movie({ id, title, overview, releaseDate, posterPath, voteAverage, rating, genreIds }) {
  rating = rating ? rating : 0;
  const onChangeRate = (rate) => {
    addMovieRated(id, rate).then((res) => console.log(res));
  };

  return (
    <div className="movie">
      <div className="movie__img">
        <MovieImg posterPath={posterPath} />
      </div>
      <div className="movie__info">
        <div className="movie__h">
          <Title level={4} ellipsis>
            {title}
          </Title>
          <MyProgress percent={voteAverage} className="movie__progress" />
        </div>
        <p className="movie__date">{getDateString(releaseDate)}</p>
        <GenreList list={genreIds} />
      </div>
      <div className="movie__description">
        <p>{trimString(overview)}</p>
      </div>
      <div className="movie__rate">
        <Rate
          onChange={onChangeRate}
          count={10}
          allowHalf
          style={{ fontSize: 16, marginTop: 8 }}
          defaultValue={rating}
        />
      </div>
    </div>
  );
}

Movie.propTypes = {
  title: PropTypes.string,
  overview: PropTypes.string,
  releaseDate: PropTypes.string,
  posterPath: PropTypes.string,
  voteAverage: PropTypes.number,
  id: PropTypes.number,
  rating: PropTypes.number,
  genreIds: PropTypes.array,
};

export default Movie;
