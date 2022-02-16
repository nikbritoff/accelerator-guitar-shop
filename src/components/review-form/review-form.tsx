import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RATING_TITLES } from '../../const';
import { postNewCommentSuccess } from '../../store/action';
import { postNewComment } from '../../store/api-actions';
import { getPostingNewComment, getPostNewCommentSuccess } from '../../store/guitar-info/selectors';
import { getFieldValidity } from '../../utils/review-form';
import ReviewStar from '../review-star/review-star';

type ReviewFormProps = {
  setIsReviewModalActive: (isActive: boolean) => void,
  setIsReviewModalSuccessActive: (isActive: boolean) => void,
  id: string,
  guitarName: string,
  shownCommentsAmount: number,
  setShownCommentsAmount: (amount: number) => void,
}

export enum formFields {
  userName = 'userName',
  rating = 'rating',
  advantage = 'advantage',
  disadvantage = 'disadvantage',
  comment = 'comment',
}

type FieldProps = {
  value: string,
  error?: boolean,
  touched?: boolean,
};

type FormStateProps = {
  [key: string]: FieldProps,
};

const initialState = {
  userName: {
    value: '',
    error: true,
    touched: false,
  },
  rating: {
    value: '0',
    error: true,
    touched: false,
  },
  advantage: {
    value: ' ',
    error: false,
    touched: false,
  },
  disadvantage: {
    value: ' ',
    error: false,
    touched: false,
  },
  comment: {
    value: ' ',
    error: false,
    touched: false,
  },
};

function ReviewForm({setIsReviewModalActive, setIsReviewModalSuccessActive, id, guitarName, shownCommentsAmount, setShownCommentsAmount}: ReviewFormProps): JSX.Element {
  const dispatch = useDispatch();
  const isCommentPosting = useSelector(getPostingNewComment);
  const isCommentPostedSuccess = useSelector(getPostNewCommentSuccess);

  const [formState, setFormState] = useState<FormStateProps>(initialState);

  const handleChange = ({target}: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const {name, value} = target;
    const isValid = getFieldValidity(name, value);

    setFormState({
      ...formState,
      [name]: {
        value: value,
        touched: true,
        error: !isValid,
      },
    });
  };

  const handleSubmitButton = (evt: FormEvent<HTMLFormElement>): void => {
    evt.preventDefault();

    dispatch(postNewComment({
      userName: formState.userName.value,
      advantage: formState.advantage.value,
      disadvantage: formState.disadvantage.value,
      comment: formState.comment.value,
      rating: Number(formState.rating.value),
      guitarId: Number(id),
    }));
  };

  const isFormValid = Object.values(formState).every((item: FieldProps) => !item.error);

  useEffect(() => {
    dispatch(postNewCommentSuccess(false));
    if (isCommentPostedSuccess) {
      setFormState(initialState);
      setIsReviewModalActive(false);
      setIsReviewModalSuccessActive(true);

      if (shownCommentsAmount < 3) {
        setShownCommentsAmount(shownCommentsAmount + 1);
      }
    }
  },
  [
    dispatch,
    isCommentPostedSuccess,
    setIsReviewModalActive,
    setIsReviewModalSuccessActive,
    setShownCommentsAmount,
    shownCommentsAmount,
  ]);

  return (
    <>
      <h2 className="modal__header modal__header--review title title--medium">Оставить отзыв</h2>
      <h3 className="modal__product-name title title--medium-20 title--uppercase">{guitarName}</h3>
      <form
        className="form-review"
        onSubmit={handleSubmitButton}
      >
        <div className="form-review__wrapper">
          <div className="form-review__name-wrapper">
            <label className="form-review__label form-review__label--required" htmlFor="user-name">Ваше Имя</label>
            <input
              className="form-review__input form-review__input--name"
              id="user-name"
              name={formFields.userName}
              type="text"
              autoComplete="off"
              value={formState[formFields.userName].value}
              onChange={handleChange}
              disabled={isCommentPosting}
            />
            {formState[formFields.userName].value === '' &&
            <span className="form-review__warning">Заполните поле</span>}
          </div>
          <div><span className="form-review__label form-review__label--required">Ваша Оценка</span>
            <div className="rate rate--reverse">
              {RATING_TITLES.map((starTitle: string, index: number) => (
                <ReviewStar
                  key={starTitle}
                  title={starTitle}
                  id={index + 1}
                  name={formFields.rating}
                  isNewCommentPosting={isCommentPosting}
                  isChecked={index + 1 === Number(formState[formFields.rating].value)}
                  handleChange={handleChange}
                />
              )).reverse()}
              <span className="rate__count"></span>
              {!formState[formFields.rating].touched &&
              <span className="rate__message">Поставьте оценку</span>}
            </div>
          </div>
        </div>
        <label
          className="form-review__label"
          htmlFor={formFields.advantage}
        >
          Достоинства
        </label>
        <input
          className="form-review__input"
          id={formFields.advantage}
          name={formFields.advantage}
          type="text"
          autoComplete="off"
          value={formState[formFields.advantage].value}
          onChange={handleChange}
          disabled={isCommentPosting}
        />
        <label
          className="form-review__label"
          htmlFor={formFields.disadvantage}
        >
          Недостатки
        </label>
        <input
          className="form-review__input"
          id={formFields.disadvantage}
          name={formFields.disadvantage}
          type="text"
          autoComplete="off"
          value={formState[formFields.disadvantage].value}
          onChange={handleChange}
          disabled={isCommentPosting}
        />
        <label
          className="form-review__label"
          htmlFor={formFields.comment}
        >
          Комментарий
        </label>
        <textarea
          className="form-review__input form-review__input--textarea"
          id={formFields.comment}
          name={formFields.comment}
          rows={10}
          autoComplete="off"
          value={formState[formFields.comment].value}
          onChange={handleChange}
          disabled={isCommentPosting}
        >
        </textarea>
        <button
          className="button button--medium-20 form-review__button"
          type="submit"
          disabled={!isFormValid || isCommentPosting}
        >
          Отправить отзыв
        </button>
      </form>
    </>
  );
}

export default ReviewForm;
