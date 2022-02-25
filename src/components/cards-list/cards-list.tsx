import { Guitar } from '../../types/guitar';
import ProductCard from '../product-card/product-card';

type CardsListProps = {
  guitarsList: Guitar[],
  setGuitarForCart: (guitar: Guitar) => void,
  setIsModalAddToCartActive: (isActive: boolean) => void,
}

function CardsList({guitarsList, setGuitarForCart, setIsModalAddToCartActive}: CardsListProps): JSX.Element {
  return (
    <div className="cards catalog__cards">
      {guitarsList.map((guitar: Guitar): JSX.Element => (
        <ProductCard
          key={guitar.id}
          guitar={guitar}
          setGuitarForCart={setGuitarForCart}
          setIsModalAddToCartActive={setIsModalAddToCartActive}
        />
      ))}
    </div>
  );
}

export default CardsList;
