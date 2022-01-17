import { ratingValues } from '../../const';

type CardRatingProps = {
  rating: number,
}

function CardRating({rating}: CardRatingProps): JSX.Element {
  return (
    <div className="rate product-card__rate" aria-hidden="true">
      <span className="visually-hidden">Рейтинг:</span>
      {ratingValues.map((item) => (
        <svg
          key={item}
          width="12"
          height="11"
          aria-hidden="true"
        >
          <use xlinkHref={item <= Math.round(rating) ? '#icon-full-star' : '#icon-star'}></use>
        </svg>
      ))}
      <span className="rate__count">9</span>
      <span className="rate__message"></span>
    </div>
  );
}

export default CardRating;
