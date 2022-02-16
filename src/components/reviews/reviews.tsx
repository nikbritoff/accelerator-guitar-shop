import { MouseEvent } from 'react';
import { CommentsListSettings, ratingValues } from '../../const';
import { Comment } from '../../types/comment';
import cn from 'classnames';
import styles from './reviews.module.css';
import { convertCommentDate } from '../../utils/reviews';
import RatingStar from '../rating-star/rating-star';

type ReviewsProps = {
  commentsList: Comment[],
  setIsReviewModalActive: (isActive: boolean) => void,
  shownCommentsAmount: number,
  setShownCommentsAmount: (amount: number) => void,
}

function Reviews({commentsList, setIsReviewModalActive, shownCommentsAmount, setShownCommentsAmount}: ReviewsProps): JSX.Element {

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

  const handleNewReviewButton = (evt: MouseEvent<HTMLAnchorElement>): void => {
    evt.preventDefault();
    setIsReviewModalActive(true);
  };

  return (
    <section className="reviews">
      <h3 className="reviews__title title title--bigger">Отзывы</h3>
      <a
        className="button button--red-border button--big reviews__sumbit-button"
        href="/#"
        onClick={handleNewReviewButton}
      >
        Оставить отзыв
      </a>
      {commentsList.slice(CommentsListSettings.StartIndex, shownCommentsAmount).map((comment) => {
        const {userName, createAt, advantage, disadvantage, comment: commentText, rating} = comment;

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
              {ratingValues.map((item) => (
                <RatingStar
                  key={item}
                  width='16'
                  height='16'
                  isFull={item <= Math.round(rating)}
                />
              ))}
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
