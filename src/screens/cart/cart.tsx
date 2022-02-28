import { History } from 'history';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CartItem from '../../components/cart-item/cart-item';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import IconsList from '../../components/icons-list/icons-list';
import ModalRemoveFromCart from '../../components/modal-remove-from-cart/modal-remove-from-cart';
import { AppRoute, Screen } from '../../const';
import WithPopupControls from '../../hocs/with-popup-controls';
import { changeScreen } from '../../store/action';
import { checkCoupon } from '../../store/api-actions';
import { getCart, getDiscount } from '../../store/app-state/selectors';
import { Guitar } from '../../types/guitar';
import cn from 'classnames';

type CartProps = {
  history: History,
}

function Cart({history}: CartProps): JSX.Element {
  const dispatch = useDispatch();

  const cart = useSelector(getCart);
  const discount = useSelector(getDiscount);
  const totalPrice = cart.reduce((acc, current) => acc + (current.amount * current.guitar.price), 0);
  const priceWithDiscount = totalPrice / 100 * discount.percent;

  const [isModaRemoveFromCartActive, setIsModaRemoveFromCartActive] = useState(false);
  const [guitarForRemoveFromCart, setGuitarForRemoveFromCart] = useState({} as Guitar);
  const [coupon, setCoupon] = useState(discount.coupon);

  useEffect(() => {
    dispatch(changeScreen(Screen.Other));
  });

  const handleCouponInputChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    if (evt.target.value.includes(' ')) {
      return;
    }
    setCoupon(evt.target.value);
  };

  const handleSubmit = (evt: FormEvent): void => {
    evt.preventDefault();
    dispatch(checkCoupon(coupon));
  };

  return (
    <>
      <IconsList/>
      <div className="wrapper">
        <Header history={history}/>
        <main className="page-content">
          <div className="container">
            <h1 className="page-content__title title title--bigger">Каталог гитар</h1>
            <ul className="breadcrumbs page-content__breadcrumbs">
              <li className="breadcrumbs__item">
                <Link className="link" to="/">Главная</Link>
              </li>
              <li className="breadcrumbs__item">
                <Link className="link" to={AppRoute.Catalog}>Каталог</Link>
              </li>
              <li className="breadcrumbs__item">
                <Link className="link" to={AppRoute.Cart}>Корзина</Link>
              </li>
            </ul>

            <div className="cart">
              {cart.map((order) => (
                <CartItem
                  key={order.guitar.id}
                  order={order}
                  setGuitarForRemoveFromCart={setGuitarForRemoveFromCart}
                  setIsModaRemoveFromCartActive={setIsModaRemoveFromCartActive}
                />
              ))}

              <div className="cart__footer">
                <div className="cart__coupon coupon">
                  <h2 className="title title--little coupon__title">Промокод на скидку</h2>
                  <p className="coupon__info">Введите свой промокод, если он у вас есть.</p>
                  <form
                    className="coupon__form"
                    id="coupon-form"
                    method="post"
                    action="/"
                    onSubmit={handleSubmit}
                  >
                    <div className="form-input coupon__input">
                      <label className="visually-hidden">Промокод</label>
                      <input
                        type="text"
                        placeholder="Введите промокод"
                        id="coupon"
                        name="coupon"
                        value={coupon}
                        onChange={handleCouponInputChange}
                      />
                      {discount.isActive && <p className="form-input__message form-input__message--success">Промокод принят</p>}
                      {!discount.isActive
                        && discount.coupon.length > 0
                        && <p className="form-input__message form-input__message--error">Неверный промокод</p>}
                    </div>
                    <button className="button button--big coupon__button">Применить</button>
                  </form>
                </div>
                <div className="cart__total-info">
                  <p className="cart__total-item">
                    <span className="cart__total-value-name">Всего:</span>
                    <span className="cart__total-value">{totalPrice.toLocaleString('ru')} ₽</span>
                  </p>
                  <p className="cart__total-item">
                    <span className="cart__total-value-name">Скидка:</span>
                    <span
                      className={cn(
                        'cart__total-value',
                        {'cart__total-value--bonus': discount.isActive},
                      )}
                    >
                      {discount.isActive && totalPrice > 0 && '-'} {priceWithDiscount.toLocaleString('ru')} ₽
                    </span>
                  </p>
                  <p className="cart__total-item">
                    <span className="cart__total-value-name">К оплате:</span>
                    <span className="cart__total-value cart__total-value--payment">
                      {(totalPrice - priceWithDiscount).toLocaleString('ru')} ₽
                    </span>
                  </p>
                  <button className="button button--red button--big cart__order-button">Оформить заказ</button>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer/>
      </div>
      <WithPopupControls
        modalClass={''}
        isActive={isModaRemoveFromCartActive}
        setIsModalActive={setIsModaRemoveFromCartActive}
      >
        <ModalRemoveFromCart
          setIsModaRemoveFromCartActive={setIsModaRemoveFromCartActive}
          guitar={guitarForRemoveFromCart}
        />
      </WithPopupControls>
    </>
  );
}

export default Cart;
