import { Link } from 'react-router-dom';
import CardRating from '../card-rating/card-rating';
import { MouseEvent } from 'react';
import { useSelector } from 'react-redux';
import { Guitar } from '../../types/guitar';
import { getCart } from '../../store/app-state/selectors';
import { AppRoute } from '../../const';

type ProductCardProps = {
  guitar: Guitar,
  setGuitarForCart: (guitar: Guitar) => void,
  setIsModalAddToCartActive: (isActive: boolean) => void,
}

function ProductCard({guitar, setGuitarForCart, setIsModalAddToCartActive}: ProductCardProps): JSX.Element {
  const cart = useSelector(getCart);


  const {name, previewImg, rating, price, id} = guitar;
  const itemIncart = cart.find((item) => item.guitar.id === id);

  const handleAddToCartClick = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();

    setGuitarForCart(guitar);
    setIsModalAddToCartActive(true);
  };

  return (
    <div className="product-card">
      <img
        src={previewImg}
        width="75"
        height="190"
        alt={name}
      />
      <div className="product-card__info">
        <CardRating rating={rating}/>
        <p className="product-card__title">{name}</p>
        <p className="product-card__price">
          <span className="visually-hidden">Цена:</span>{price}
        </p>
      </div>
      <div className="product-card__buttons">
        <Link
          className="button button--mini"
          to={`/catalog/${id}`}
        >
          Подробнее
        </Link>
        {itemIncart ?
          <Link
            className="button button--red-border button--mini button--in-cart"
            to={AppRoute.Cart}
          >
            В Корзине
          </Link> :
          <Link
            className="button button--red button--mini button--add-to-cart"
            to="/"
            onClick={handleAddToCartClick}
          >
            Купить
          </Link>}
      </div>
    </div>
  );
}

export default ProductCard;
