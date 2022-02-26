import { History } from 'history';
import { useEffect, useState } from 'react';
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
import { postOrder } from '../../store/api-actions';
import { getCart } from '../../store/app-state/selectors';
import { Guitar } from '../../types/guitar';

type CartProps = {
  history: History,
}

function Cart({history}: CartProps): JSX.Element {
  const dispatch = useDispatch();

  const cart = useSelector(getCart);

  const [isModaRemoveFromCartActive, setIsModaRemoveFromCartActive] = useState(false);
  const [guitarForRemoveFromCart, setGuitarForRemoveFromCart] = useState({} as Guitar);

  useEffect(() => {
    dispatch(changeScreen(Screen.Other));
  });

  const handleClick = (): void => {
    dispatch(postOrder());
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
                  <form className="coupon__form" id="coupon-form" method="post" action="/">
                    <div className="form-input coupon__input">
                      <label className="visually-hidden">Промокод</label>
                      <input type="text" placeholder="Введите промокод" id="coupon" name="coupon" />
                      <p className="form-input__message form-input__message--success">Промокод принят</p>
                    </div>
                    <button className="button button--big coupon__button">Применить</button>
                  </form>
                </div>
                <div className="cart__total-info">
                  <p className="cart__total-item"><span className="cart__total-value-name">Всего:</span><span className="cart__total-value">52 000 ₽</span></p>
                  <p className="cart__total-item"><span className="cart__total-value-name">Скидка:</span><span className="cart__total-value cart__total-value--bonus">- 3000 ₽</span></p>
                  <p className="cart__total-item"><span className="cart__total-value-name">К оплате:</span><span className="cart__total-value cart__total-value--payment">49 000 ₽</span></p>
                  <button className="button button--red button--big cart__order-button">Оформить заказ</button>
                </div>
              </div>
            </div>
            <button onClick={handleClick}>Тестовая кнопка</button>
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
