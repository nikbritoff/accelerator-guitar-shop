import { useSelector } from 'react-redux';
import CardsList from '../../components/cards-list/cards-list';
import Filter from '../../components/filter/filter';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import IconsList from '../../components/icons-list/icons-list';
import Pagination from '../../components/pagination/pagination';
import Sorting from '../../components/sorting/sorting';
import { getGuitarsList } from '../../store/guitars/selectors';

function Catalog(): JSX.Element {
  const guitarsList = useSelector(getGuitarsList);

  return (
    <>
      <IconsList/>
      <div className="wrapper">
        <Header/>
        <main className="page-content">
          <div className="container">
            <h1 className="page-content__title title title--bigger">Каталог гитар</h1>
            <ul className="breadcrumbs page-content__breadcrumbs">
              <li className="breadcrumbs__item"><a className="link" href="./main.html">Главная</a>
              </li>
              <li className="breadcrumbs__item"><a className="link" href='/#'>Каталог</a>
              </li>
            </ul>
            <div className="catalog">
              <Filter/>
              <Sorting/>
              <CardsList guitarsList={guitarsList}/>
              <Pagination/>
            </div>
          </div>
        </main>
        <Footer/>
      </div>
    </>
  );
}

export default Catalog;
