import { ChangeEvent, useState, MouseEvent, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { changeOrderItemAmount } from '../../store/action';
import { Guitar } from '../../types/guitar';
import { Order } from '../../types/order';
import { translateType } from '../../utils/guitar-info';

type CartItemProps = {
  order: Order,
  setGuitarForRemoveFromCart: (guitar: Guitar) => void,
  setIsModaRemoveFromCartActive: (isActive: boolean) => void,
}

function CartItem ({order: {guitar, amount}, setGuitarForRemoveFromCart, setIsModaRemoveFromCartActive}: CartItemProps): JSX.Element {
  const {
    name,
    vendorCode,
    type,
    previewImg,
    stringCount,
    price,
  } = guitar;

  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);

  const [guitarAmount, setGuitarAmount] = useState(amount);

  const handleButtonDeleteClick = () => {
    setGuitarForRemoveFromCart(guitar);
    setIsModaRemoveFromCartActive(true);
  };

  const handleAmountChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    evt.preventDefault();
    if (evt.target.value.length === 2 && evt.target.value[0] === '0') {
      evt.target.value = evt.target.value[1];
    }
    setGuitarAmount(Number(evt.target.value));
  };

  const handleDecreaseAmountClick = (evt: MouseEvent<HTMLButtonElement>): void => {
    evt.preventDefault();
    if (guitarAmount > 1) {
      setGuitarAmount(guitarAmount - 1);
    }

    if (guitarAmount === 1) {
      setGuitarForRemoveFromCart(guitar);
      setIsModaRemoveFromCartActive(true);
    }
  };

  const handleIncreaseAmountClick = (evt: MouseEvent<HTMLButtonElement>): void => {
    evt.preventDefault();
    if (guitarAmount < 99) {
      setGuitarAmount(guitarAmount + 1);
    }
  };

  useEffect(() => {
    dispatch(changeOrderItemAmount(guitarAmount, guitar));
  });

  useEffect(() => {
    const handleDocumentClick = (evt: Event): void => {
      if (!inputRef.current?.contains(evt.target as HTMLElement)) {
        if (Number(inputRef.current?.value) < 1) {
          setGuitarAmount(1);
        } else if (Number(inputRef.current?.value) > 99) {
          setGuitarAmount(99);
        } else {
          setGuitarAmount(Number(inputRef.current?.value));
        }
      }
    };
    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  });

  return(
    <div className="cart-item">
      <button
        className="cart-item__close-button button-cross"
        type="button"
        aria-label="Удалить"
        onClick={handleButtonDeleteClick}
      >
        <span className="button-cross__icon"></span>
        <span className="cart-item__close-button-interactive-area"></span>
      </button>
      <div className="cart-item__image">
        <img
          src={previewImg}
          width="55"
          height="130"
          alt={`${translateType(type)} ${name}`}
        />
      </div>
      <div className="product-info cart-item__info">
        <p className="product-info__title">{name}</p>
        <p className="product-info__info">Артикул: {vendorCode}</p>
        <p className="product-info__info">{translateType(type)}, {stringCount} струнная</p>
      </div>
      <div className="cart-item__price">{price} ₽</div>
      <div className="quantity cart-item__quantity">
        <button
          className="quantity__button"
          aria-label="Уменьшить количество"
          onClick={handleDecreaseAmountClick}
        >
          <svg width="8" height="8" aria-hidden="true">
            <use xlinkHref="#icon-minus"></use>
          </svg>
        </button>
        <input
          className="quantity__input"
          type="number"
          placeholder="1"
          id="2-count"
          name="2-count"
          max="99"
          value={guitarAmount}
          onChange={handleAmountChange}
          ref={inputRef}
        />
        <button
          className="quantity__button"
          aria-label="Увеличить количество"
          onClick={handleIncreaseAmountClick}
        >
          <svg width="8" height="8" aria-hidden="true">
            <use xlinkHref="#icon-plus"></use>
          </svg>
        </button>
      </div>
      <div className="cart-item__price-total">{price * amount} ₽</div>
    </div>
  );
}

export default CartItem;
