import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import CardsList from '../../components/cards-list/cards-list';
import Filter from '../../components/filter/filter';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import IconsList from '../../components/icons-list/icons-list';
import Loading from '../../components/loading/loading';
import LoadingError from '../../components/loading-error/loading-error';
import Pagination from '../../components/pagination/pagination';
import Sorting from '../../components/sorting/sorting';
import { AppRoute, Screen } from '../../const';
import { getGuitarsError, getGuitarsList, getGuitarsLoading } from '../../store/guitars/selectors';
import queryString from 'query-string';
import { History } from 'history';
import { fetchDataAction } from '../../store/api-actions';
import { useEffect, useState } from 'react';
import { createApiURL } from '../../utils/api';
import { changeScreen } from '../../store/action';
import WithPopupControls from '../../hocs/with-popup-controls';
import ModalAddToCart from '../../components/modal-add-to-cart/modal-add-to-cart';
import { Guitar } from '../../types/guitar';

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

  const [isModalAddToCartActive, setIsModalAddToCartActive] = useState(false);
  const [guitarForCart, setGuitarForCart] = useState({} as Guitar);

  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const { page } = queryString.parse(search);
  const url = createApiURL(queryParams.toString(), Number(page));

  useEffect(() => {
    dispatch(fetchDataAction(url));
    dispatch(changeScreen(Screen.Catalog));
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
              {!guitarsLoading && <CardsList guitarsList={guitarsList} setGuitarForCart={setGuitarForCart} setIsModalAddToCartActive={setIsModalAddToCartActive}/>}
              {guitarsLoading && <Loading/>}
              <Pagination currentPage={Number(page)}/>
            </div>
          </div>
        </main>
        <Footer/>
      </div>
      <WithPopupControls
        isActive={isModalAddToCartActive}
        setIsModalActive={setIsModalAddToCartActive}
        modalClass={''}
      >
        <ModalAddToCart
          setIsModalAddToCartActive={setIsModalAddToCartActive}
          guitar={guitarForCart}
        />
      </WithPopupControls>
    </>
  );
}

export default Catalog;
