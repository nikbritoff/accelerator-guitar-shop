import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CardsList from '../../components/cards-list/cards-list';
import Filter from '../../components/filter/filter';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import IconsList from '../../components/icons-list/icons-list';
import Loading from '../../components/icons-list/loading/loading';
import LoadingError from '../../components/loading-error/loading-error';
import Pagination from '../../components/pagination/pagination';
import Sorting from '../../components/sorting/sorting';
import { AppRoute } from '../../const';
import { getGuitarsError, getGuitarsList, getGuitarsLoading } from '../../store/guitars/selectors';

function ErrorPage({children}: {children: React.ReactNode}) {
  return (
    <>
      <IconsList/>
      <div className="wrapper">
        <Header/>
        <main className="page-content">
          <div className="container">
            {children}
          </div>
        </main>
        <Footer/>
      </div>
    </>
  );
}

function Catalog(): JSX.Element {
  const guitarsLoading = useSelector(getGuitarsLoading);
  const guitarsError = useSelector(getGuitarsError);
  const guitarsList = useSelector(getGuitarsList);

  if (guitarsError) {
    return (
      <ErrorPage>
        <LoadingError/>
      </ErrorPage>
    );
  }

  if (guitarsLoading) {
    return (
      <ErrorPage>
        <Loading/>
      </ErrorPage>
    );
  }

  return (
    <>
      <IconsList/>
      <div className="wrapper">
        <Header/>
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
