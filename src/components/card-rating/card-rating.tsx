import { ratingValues } from '../../const';
import RatingStar from '../rating-star/rating-star';

type CardRatingProps = {
  rating: number,
}

function CardRating({rating}: CardRatingProps): JSX.Element {
  return (
    <div className="rate product-card__rate" aria-hidden="true">
      <span className="visually-hidden">Рейтинг:</span>
      {ratingValues.map((item) => (
        <RatingStar
          key={item}
          width='12'
          height='11'
          isFull={item <= Math.round(rating)}
        />
      ))}
      <span className="rate__count">9</span>
      <span className="rate__message"></span>
    </div>
  );
}

export default CardRating;
