import { Guitar } from '../../types/guitar';
import ProductCard from '../product-card/product-card';

type CardsListProps = {
  guitarsList: Guitar[],
}

function CardsList({guitarsList}: CardsListProps): JSX.Element {
  return (
    <div className="cards catalog__cards">
      {guitarsList.map((guitar: Guitar): JSX.Element => (
        <ProductCard
          key={guitar.id}
          name={guitar.name}
          previewImg={guitar.previewImg}
          rating={guitar.rating}
          price={guitar.price}
          id={guitar.id}
        />
      ))}
    </div>
  );
}

export default CardsList;
