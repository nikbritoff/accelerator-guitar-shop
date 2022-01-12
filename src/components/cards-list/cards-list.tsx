import ProductCard from '../product-card/product-card';

function CardsList(): JSX.Element {
  return (
    <div className="cards catalog__cards">
      <ProductCard/>
      <ProductCard/>
      <ProductCard/>
      <ProductCard/>
      <ProductCard/>
      <ProductCard/>
      <ProductCard/>
      <ProductCard/>
      <ProductCard/>
    </div>
  );
}

export default CardsList;
