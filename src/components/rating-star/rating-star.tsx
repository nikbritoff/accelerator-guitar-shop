type RatingStarProps = {
  width: string,
  height: string,
  isFull: boolean,
}

function RatingStar({width, height, isFull}: RatingStarProps): JSX.Element {
  return (
    <svg
      width={width}
      height={height}
      aria-hidden="true"
    >
      <use xlinkHref={isFull ? '#icon-full-star' : '#icon-star'}></use>
    </svg>
  );
}

export default RatingStar;
