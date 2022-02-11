import { useState, MouseEvent } from 'react';
import { CommentsListSettings } from '../../const';
import { Comment } from '../../types/comment';
import cn from 'classnames';
import styles from './reviews.module.css';
import { convertCommentDate } from '../../utils/reviews';

type ReviewsProps = {
  commentsList: Comment[],
}

function Reviews({commentsList}: ReviewsProps): JSX.Element {
  const [shownCommentsAmount, setShownCommentsAmount] = useState(commentsList.length >= CommentsListSettings.ShownStep ? CommentsListSettings.ShownStep : commentsList.length);

  const handleMoreCommentsButtonClick = (evt: MouseEvent<HTMLButtonElement>):void => {
    evt.preventDefault();
    if (shownCommentsAmount + CommentsListSettings.ShownStep > commentsList.length) {
      setShownCommentsAmount(commentsList.length);
    } else {
      setShownCommentsAmount(shownCommentsAmount + CommentsListSettings.ShownStep);
    }
  };

  const handleUpButtonClick = (evt: MouseEvent<HTMLAnchorElement>): void => {
    evt.preventDefault();
    window.scrollTo({top: 0});
  };

  return (
    <section className="reviews">
      <h3 className="reviews__title title title--bigger">Отзывы</h3>
      <a className="button button--red-border button--big reviews__sumbit-button" href="/#">
        Оставить отзыв
      </a>
      {commentsList.slice(CommentsListSettings.StartIndex, shownCommentsAmount).map((comment) => {
        const {userName, createAt, advantage, disadvantage, comment: commentText} = comment;

        return (
          <div
            className="review"
            key={comment.id}
          >
            <div className="review__wrapper">
              <h4 className="review__title review__title--author title title--lesser">{userName}</h4>
              <span className="review__date">{convertCommentDate(createAt)}</span>
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
      {shownCommentsAmount < commentsList.length &&
        <button
          className="button button--medium reviews__more-button"
          onClick={handleMoreCommentsButtonClick}
        >
          Показать еще отзывы
        </button>}
      <a
        className={cn(
          'button button--up button--red-border button--big reviews__up-button',
          styles['top-button'],
        )}
        href="#header"
        onClick={handleUpButtonClick}
      >
        Наверх
      </a>
    </section>
  );
}

export default Reviews;
