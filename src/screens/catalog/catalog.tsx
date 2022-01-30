import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
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
import queryString from 'query-string';
import { History } from 'history';
import { fetcDataAction, fetchMinMaxPrices } from '../../store/api-actions';
import { useEffect } from 'react';
import { createApiURL } from '../../utils/api';

type ErrorPageProps = {
  history: History,
  children: React.ReactNode
}

function ErrorPage({history, children}: ErrorPageProps) {
  return (
    <>
      <IconsList/>
      <div className="wrapper">
        <Header history={history}/>
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

type CatalogProps = {
  history: History,
}

function Catalog({history} : CatalogProps): JSX.Element {
  const dispatch = useDispatch();
  const guitarsLoading = useSelector(getGuitarsLoading);
  const guitarsError = useSelector(getGuitarsError);
  const guitarsList = useSelector(getGuitarsList);

  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const { page } = queryString.parse(search);
  const url = createApiURL(queryParams.toString(), Number(page));

  useEffect(() => {
    dispatch(fetcDataAction(url));
    dispatch(fetchMinMaxPrices());
  }, [dispatch, url]);

  if (guitarsError) {
    return (
      <ErrorPage history={history}>
        <LoadingError/>
      </ErrorPage>
    );
  }

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
            </ul>
            <div className="catalog">
              <Filter history={history}/>
              <Sorting history={history}/>
              {!guitarsLoading && <CardsList guitarsList={guitarsList}/>}
              {guitarsLoading && <Loading/>}
              <Pagination currentPage={Number(page)}/>
            </div>
          </div>
        </main>
        <Footer/>
      </div>
    </>
  );
}

export default Catalog;
