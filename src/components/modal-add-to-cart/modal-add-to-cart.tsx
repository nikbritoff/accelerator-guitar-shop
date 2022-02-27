import { MouseEvent } from 'react';
import { useDispatch } from 'react-redux';
import { addOrderItem } from '../../store/action';
import { Guitar } from '../../types/guitar';
import { translateType } from '../../utils/guitar-info';

type ModalAddToCartProps = {
  setIsModalAddToCartActive: (isActive: boolean) => void,
  guitar: Guitar,
}

function ModalAddToCart({setIsModalAddToCartActive, guitar}: ModalAddToCartProps) {
  const {previewImg, name, vendorCode, type, stringCount, price} = guitar;
  const dispatch = useDispatch();

  const handleAddToCartClick = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();

    dispatch(addOrderItem(guitar));
    setIsModalAddToCartActive(false);
  };
  return (
    <>
      <h2 className="modal__header title title--medium">Добавить товар в корзину</h2>
      <div className="modal__info">
        <img className="modal__img" src={previewImg} width="67" height="137" alt="Честер bass" />
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
          className="button button--red button--big modal__button modal__button--add"
          onClick={handleAddToCartClick}
        >
          Добавить в корзину
        </button>
      </div>
    </>
  );
}

export default ModalAddToCart;
