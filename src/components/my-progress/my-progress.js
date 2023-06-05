import { Progress } from 'antd';
import PropTypes from 'prop-types';

const format = (percent) => {
  percent = Math.round(percent);
  percent /= 10;
  return `${percent}`;
};

const getColor = (percent) => {
  if (percent >= 0 && percent <= 3) {
    return '#E90000';
  } else if (percent > 3 && percent <= 5) {
    return '#E97E00';
  } else if (percent > 5 && percent <= 7) {
    return '#E9D100';
  } else if (percent > 7) {
    return '#66E900';
  } else {
    console.log('error');
    return '#000000';
  }
};

function MyProgress({ percent, className }) {
  const color = getColor(percent);
  percent *= 10;

  return (
    <Progress className={className} type="circle" strokeColor={color} percent={percent} format={format} size={33} />
  );
}

MyProgress.propTypes = {
  percent: PropTypes.number,
  className: PropTypes.string,
};

export default MyProgress;
