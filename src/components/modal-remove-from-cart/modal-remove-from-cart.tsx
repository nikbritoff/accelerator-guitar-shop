import { MouseEvent } from 'react';
import { useDispatch } from 'react-redux';
import { deleteOrderItem } from '../../store/action';
import { Guitar } from '../../types/guitar';
import { translateType } from '../../utils/guitar-info';

type ModalRemoveFromCartProps = {
  setIsModaRemoveFromCartActive: (isActive: boolean) => void,
  guitar: Guitar,
};

function ModalRemoveFromCart({
  setIsModaRemoveFromCartActive: setIsModaRemoveFromCarCartActive,
  guitar,
}: ModalRemoveFromCartProps): JSX.Element {
  const {previewImg, name, vendorCode, type, stringCount, price} = guitar;
  const dispatch = useDispatch();


  const handleCloseButtonClick = (evt:MouseEvent<HTMLButtonElement>): void => {
    evt.preventDefault();
    setIsModaRemoveFromCarCartActive(false);
  };

  const handleRemoveButtonClick = (evt:MouseEvent<HTMLButtonElement>): void => {
    evt.preventDefault();
    setIsModaRemoveFromCarCartActive(false);
    dispatch(deleteOrderItem(guitar));
  };

  return (
    <>
      <h2 className="modal__header title title--medium title--red">Удалить этот товар?</h2>
      <div className="modal__info">
        <img
          className="modal__img"
          src={previewImg}
          width="67"
          height="137"
          alt={name}
        />
        <div className="modal__info-wrapper">
          <h3 className="modal__product-name title title--little title--uppercase">{name}</h3>
          <p className="modal__product-params modal__product-params--margin-11">Артикул: {vendorCode}</p>
          <p className="modal__product-params">{translateType(type)}, {stringCount} струнная</p>
          <p className="modal__price-wrapper">
            <span className="modal__price">Цена:</span>
            <span className="modal__price">{price} ₽</span>
          </p>
        </div>
      </div>
      <div className="modal__button-container">
        <button
          className="button button--small modal__button"
          onClick={handleRemoveButtonClick}
        >
          Удалить товар
        </button>
        <button
          className="button button--black-border button--small modal__button modal__button--right"
          onClick={handleCloseButtonClick}
        >
          Продолжить покупки
        </button>
      </div>
    </>
  );
}

export default ModalRemoveFromCart;
