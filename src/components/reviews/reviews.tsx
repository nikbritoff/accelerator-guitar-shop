import { Comment } from '../../types/comment';

type ReviewsProps = {
  commentsList: Comment[],
}

function Reviews({commentsList}: ReviewsProps): JSX.Element {
  return (
    <section className="reviews">
      <h3 className="reviews__title title title--bigger">Отзывы</h3>
      <a className="button button--red-border button--big reviews__sumbit-button" href="/#">
        Оставить отзыв
      </a>
      {commentsList.map((comment) => {
        const {userName, createAt, advantage, disadvantage, comment: commentText} = comment;

        return (
          <div
            className="review"
            key={comment.id}
          >
            <div className="review__wrapper">
              <h4 className="review__title review__title--author title title--lesser">{userName}</h4>
              <span className="review__date">12 декабря{createAt}</span>
            </div>
            <div className="rate review__rating-panel" aria-hidden="true">
              <span className="visually-hidden">Рейтинг:</span>
              <svg width="16" height="16" aria-hidden="true">
                <use xlinkHref="#icon-full-star"></use>
              </svg>
              <svg width="16" height="16" aria-hidden="true">
                <use xlinkHref="#icon-full-star"></use>
              </svg>
              <svg width="16" height="16" aria-hidden="true">
                <use xlinkHref="#icon-full-star"></use>
              </svg>
              <svg width="16" height="16" aria-hidden="true">
                <use xlinkHref="#icon-full-star"></use>
              </svg>
              <svg width="16" height="16" aria-hidden="true">
                <use xlinkHref="#icon-star"></use>
              </svg>
              <span className="rate__count"></span>
              <span className="rate__message"></span>
            </div>
            {advantage.trim() !== '' &&
            <>
              <h4 className="review__title title title--lesser">Достоинства:</h4>
              <p className="review__value">{advantage}</p>
            </>}
            {disadvantage.trim() !== '' &&
            <>
              <h4 className="review__title title title--lesser">Недостатки:</h4>
              <p className="review__value">{disadvantage}</p>
            </>}
            {commentText.trim() !== '' &&
            <>
              <h4 className="review__title title title--lesser">Комментарий:</h4>
              <p className="review__value">{commentText}</p>
            </>}
          </div>
        );
      },
      )}
      <button className="button button--medium reviews__more-button">Показать еще отзывы</button><a className="button button--up button--red-border button--big reviews__up-button" href="#header">Наверх</a>
    </section>
  );
}

export default Reviews;
