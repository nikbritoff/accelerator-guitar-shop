import { RATING_VALUES } from '../../const';

function CardRating(): JSX.Element {
  const RATING = 3;
  return (
    <div className="rate product-card__rate" aria-hidden="true">
      <span className="visually-hidden">Рейтинг:</span>
      {RATING_VALUES.map((item) => (
        <svg
          key={item}
          width="12"
          height="11"
          aria-hidden="true"
        >
          <use xlinkHref={item <= RATING ? '#icon-full-star' : '#icon-star'}></use>
        </svg>
      ))}
      <span className="rate__count">9</span>
      <span className="rate__message"></span>
    </div>
  );
}

export default CardRating;
