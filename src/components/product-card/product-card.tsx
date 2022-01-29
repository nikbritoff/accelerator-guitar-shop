import CardRating from '../card-rating/card-rating';

type ProductCardProps = {
  'name': string,
  'previewImg': string,
  'rating': number,
  'price': number,
}

function ProductCard({name, previewImg, rating, price}: ProductCardProps): JSX.Element {
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
        <a className="button button--mini" href="/#">Подробнее</a>
        <a className="button button--red button--mini button--add-to-cart" href="/#">Купить</a>
      </div>
    </div>
  );
}

export default ProductCard;
