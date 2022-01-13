import CardRating from '../card-rating/card-rating';

type ProductCardProps = {
  'name': string,
  // 'vendorCode': string,
  // 'type': string,
  // 'description': string,
  'previewImg': string,
  // 'stringCount': number,
  'rating': number,
  'price': number,
}

function ProductCard({name, previewImg, rating, price}: ProductCardProps): JSX.Element {
  return (
    <div className="product-card">
      <img
        // src="img/content/guitar-2.jpg"
        src={previewImg}
        width="75"
        height="190"
        // alt="СURT Z30 Plus Acoustics"
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
