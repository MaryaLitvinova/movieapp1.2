import { Space, Tag, Typography } from 'antd';
import { getGenre } from '../../services/movie-api';
import PropTypes from 'prop-types';
const { Text } = Typography;

function GenreList({ list }) {
  if (String(list) === String([])) {
    console.log(123);
    return <Text type="danger">жанров нет</Text>;
  }

  const components = list.map((id) => {
    const genre = getGenre(id);
    return (
      <Tag color={genre.color} key={id}>
        <a href="#">{genre.name}</a>
      </Tag>
    );
  });

  return (
    <Space size={[0, 3]} wrap>
      {components}
    </Space>
  );
}

GenreList.propTypes = {
  list: PropTypes.array,
};

export default GenreList;
