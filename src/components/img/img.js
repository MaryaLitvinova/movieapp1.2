import './img.css';
import { getPosterLink } from '../../services/movie-api';
import { Empty, Image, Spin } from 'antd';
import PropTypes from 'prop-types';

function Loading() {
  return (
    <div className="loading">
      <Spin />
    </div>
  );
}

export default function MovieImg({ posterPath }) {
  if (posterPath !== null) {
    return (
      <Image
        width={187}
        src={getPosterLink(posterPath)}
        placeholder={<Loading />}
        fallback="https://sun9-9.userapi.com/impg/ELAv43jRu13qdfg4uPuhlVpSqyy3zSz4Eu3x_A/VzZUj38gQ8w.jpg?size=252x351&quality=96&sign=203ff5b5ded71bbdb9779cc4a6da20ec&type=album"
      />
    );
  }
  return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={false} placeholder={<Loading />} />;
}

MovieImg.propTypes = {
  posterPath: PropTypes.string,
};
