import cn from 'classnames';
import { MouseEvent, useEffect, useState, ChangeEvent } from 'react';
import { RATING_TITLES } from '../../const';

type ReviewFormProps = {
  isActive: boolean,
  setIsReviewModalActive: (isActive: boolean) => void,
  id: string,
  guitarName: string,
}

type KeyboardEvent = {
  key: string,
};

enum formFields {
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
    error: false,
    touched: false,
  },
  rating: {
    value: '0',
    error: false,
    touched: false,
  },
  advantage: {
    value: '',
    error: true,
    touched: true,
  },
  disadvantage: {
    value: '',
    error: true,
    touched: true,
  },
  comment: {
    value: '',
    error: true,
    touched: true,
  },
  guitarId: {
    value: '',
    error: true,
    touched: true,
  },
};

function ReviewForm({isActive, setIsReviewModalActive, id, guitarName}: ReviewFormProps): JSX.Element {
  const [formState, setFormState] = useState<FormStateProps>(initialState);

  const handleChange = ({target}: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const {name, value} = target;
    const isValid = name === formFields.userName
      ? formState[name].value.trim() !== ''
      : true;

    setFormState({
      ...formState,
      [name]: {
        value: value,
        touched: true,
        error: !isValid,
      },
    });

    // eslint-disable-next-line no-console
    console.log(formState[name]);
  };

  const handleCloseButtonClick = (evt: MouseEvent<HTMLButtonElement>):void => {
    evt.preventDefault();
    setIsReviewModalActive(false);
  };

  const handleOverlayClickHandler = ():void => {
    setIsReviewModalActive(false);
  };

  useEffect(() => {
    if (isActive) {
      document.body.style.overflow = 'hidden';

      const closeReviewModal = (evt: KeyboardEvent):void => {
        if(evt.key === 'Escape') {
          setIsReviewModalActive(false);
        }
      };
      window.addEventListener('keydown', closeReviewModal);
      return () => {
        window.removeEventListener('keydown', closeReviewModal);
        document.body.style.overflow = '';
      };
    }
  },[isActive, setIsReviewModalActive]);

  return (
    <div className={cn(
      'modal',
      'modal--review',
      {'is-active' : isActive},
    )}
    >
      <div className="modal__wrapper">
        <div
          className="modal__overlay"
          data-close-modal
          onClick={handleOverlayClickHandler}
        >
        </div>
        <div className="modal__content">
          <h2 className="modal__header modal__header--review title title--medium">Оставить отзыв</h2>
          <h3 className="modal__product-name title title--medium-20 title--uppercase">{guitarName}</h3>
          <form className="form-review">
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
                />
                <span className="form-review__warning">Заполните поле</span>
              </div>
              <div><span className="form-review__label form-review__label--required">Ваша Оценка</span>
                <div className="rate rate--reverse">
                  {RATING_TITLES.map((starTitle: string, index: number) => (
                    <>
                      <input
                        className="visually-hidden"
                        type="radio"
                        checked={index + 1 === Number(formState[formFields.rating].value)}
                        id={`star-${index + 1}`}
                        name="rate"
                        value={index + 1}
                        onChange={handleChange}
                      />
                      <label
                        className="rate__label"
                        htmlFor={`star-${index + 1}`}
                        title={starTitle}
                      >
                      </label>
                    </>
                  )).reverse()}
                  <span className="rate__count"></span>
                  <span className="rate__message">Поставьте оценку</span>
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
              rows={10}
              autoComplete="off"
              value={formState[formFields.comment].value}
              onChange={handleChange}
            >
            </textarea>
            <button
              className="button button--medium-20 form-review__button"
              type="submit"
            >
              Отправить отзыв
            </button>
          </form>
          <button
            className="modal__close-btn button-cross"
            type="button"
            aria-label="Закрыть"
            onClick={handleCloseButtonClick}
          >
            <span className="button-cross__icon"></span>
            <span className="modal__close-btn-interactive-area"></span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReviewForm;
