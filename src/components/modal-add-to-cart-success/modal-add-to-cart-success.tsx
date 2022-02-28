import { History } from 'history';
import { AppRoute } from '../../const';

type ModalAddToCartSuccessProps = {
  setIsModalAddToCartSuccessActive: (isActive: boolean) => void,
  history: History,
}

function ModalAddToCartSuccess({setIsModalAddToCartSuccessActive, history}: ModalAddToCartSuccessProps): JSX.Element {
  const handleContinueClick = (): void => {
    setIsModalAddToCartSuccessActive(false);
  };

  const handleGoToCartClick = (): void => {
    history.push(AppRoute.Cart);
  };

  return (
    <>
      <svg className="modal__icon" width="26" height="20" aria-hidden="true">
        <use xlinkHref="#icon-success"></use>
      </svg>
      <p className="modal__message">Товар успешно добавлен в корзину</p>
      <div className="modal__button-container modal__button-container--add">
        <button
          className="button button--small modal__button"
          onClick={handleGoToCartClick}
        >
          Перейти в корзину
        </button>
        <button
          className="button button--black-border button--small modal__button modal__button--right"
          onClick={handleContinueClick}
        >
          Продолжить покупки
        </button>
      </div>
    </>
  );
}

export default ModalAddToCartSuccess;
