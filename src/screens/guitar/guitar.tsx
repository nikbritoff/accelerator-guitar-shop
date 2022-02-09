import { History } from 'history';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import IconsList from '../../components/icons-list/icons-list';
import LoadingError from '../../components/loading-error/loading-error';
import Loading from '../../components/loading/loading';
import { AppRoute, Screen } from '../../const';
import { changeScreen } from '../../store/action';
import { fetchGuitarInfo } from '../../store/api-actions';
import { getGuitarInfo, getGuitarInfoError, getGuitarInfoLoading } from '../../store/guitar-info/selectors';
import { translateType } from '../../utils/guitar-info';

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

type GuitarProps = {
  history: History,
}

function Guitar({history}: GuitarProps): JSX.Element {
  const {id} = useParams<{ id: string }>();

  const dispatch = useDispatch();
  const guitarInfoLoading = useSelector(getGuitarInfoLoading);
  const guitarInfoError = useSelector(getGuitarInfoError);
  const guitarInfo = useSelector(getGuitarInfo);

  useEffect(() => {
    dispatch(changeScreen(Screen.Other));
  });

  useEffect(() => {
    dispatch(fetchGuitarInfo(id));
  }, [dispatch, id]);

  if (guitarInfoError) {
    return (
      <ErrorPage history={history}>
        <LoadingError/>
      </ErrorPage>
    );
  }

  if (guitarInfoLoading) {
    return (
      <ErrorPage history={history}>
        <Loading/>
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
            <h1 className="page-content__title title title--bigger">Товар</h1>
            <ul className="breadcrumbs page-content__breadcrumbs">
              <li className="breadcrumbs__item">
                <Link className="link" to={AppRoute.Main}>Главная</Link>
              </li>
              <li className="breadcrumbs__item">
                <Link className="link" to={AppRoute.Catalog}>Каталог</Link>
              </li>
              <li className="breadcrumbs__item">
                <Link className="link" to={`${AppRoute.Catalog}/${id}`}>{guitarInfo.name}</Link>
              </li>
            </ul>
            <div className="product-container">
              <img className="product-container__img" src={`/${guitarInfo.previewImg}`} width="90" height="235" alt=""/>
              <div className="product-container__info-wrapper">
                <h2 className="product-container__title title title--big title--uppercase">{guitarInfo.name}</h2>
                <div className="rate product-container__rating" aria-hidden="true"><span className="visually-hidden">Рейтинг:</span>
                  <svg width="14" height="14" aria-hidden="true">
                    <use xlinkHref="#icon-full-star"></use>
                  </svg>
                  <svg width="14" height="14" aria-hidden="true">
                    <use xlinkHref="#icon-full-star"></use>
                  </svg>
                  <svg width="14" height="14" aria-hidden="true">
                    <use xlinkHref="#icon-full-star"></use>
                  </svg>
                  <svg width="14" height="14" aria-hidden="true">
                    <use xlinkHref="#icon-full-star"></use>
                  </svg>
                  <svg width="14" height="14" aria-hidden="true">
                    <use xlinkHref="#icon-star"></use>
                  </svg><span className="rate__count"></span><span className="rate__message"></span>
                </div>
                <div className="tabs">
                  <a className="button button--medium tabs__button" href="#characteristics">
                    Характеристики
                  </a>
                  <a className="button button--black-border button--medium tabs__button" href="#description">
                    Описание
                  </a>
                  <div className="tabs__content" id="characteristics">
                    <table className="tabs__table">
                      <tbody>
                        <tr className="tabs__table-row">
                          <td className="tabs__title">Артикул:</td>
                          <td className="tabs__value">{guitarInfo.vendorCode}</td>
                        </tr>
                        <tr className="tabs__table-row">
                          <td className="tabs__title">Тип:</td>
                          <td className="tabs__value">{translateType(guitarInfo.type)}</td>
                        </tr>
                        <tr className="tabs__table-row">
                          <td className="tabs__title">Количество струн:</td>
                          <td className="tabs__value">{guitarInfo.stringCount} струнная</td>
                        </tr>
                      </tbody>
                    </table>
                    <p className="tabs__product-description hidden">{guitarInfo.description}</p>
                  </div>
                </div>
              </div>
              <div className="product-container__price-wrapper">
                <p className="product-container__price-info product-container__price-info--title">Цена:</p>
                <p className="product-container__price-info product-container__price-info--value">{guitarInfo.price} ₽</p>
                <a className="button button--red button--big product-container__button" href="/#">
                  Добавить в корзину
                </a>
              </div>
            </div>
            <section className="reviews">
              <h3 className="reviews__title title title--bigger">Отзывы</h3>
              <a className="button button--red-border button--big reviews__sumbit-button" href="/#">
                Оставить отзыв
              </a>
              <div className="review">
                <div className="review__wrapper">
                  <h4 className="review__title review__title--author title title--lesser">Иванов Максим</h4>
                  <span className="review__date">12 декабря</span>
                </div>
                <div className="rate review__rating-panel" aria-hidden="true">
                  <span className="visually-hidden">Рейтинг:</span>
                  <svg width="16" height="16" aria-hidden="true">
                    <use xlinkHref="#icon-full-star"></use>
                  </svg>
                  <svg width="16" height="16" aria-hidden="true">
                    <use xlinkHref="#icon-full-star"></use>
                  </svg>
                  <svg width="16" height="16" aria-hidden="true">
                    <use xlinkHref="#icon-full-star"></use>
                  </svg>
                  <svg width="16" height="16" aria-hidden="true">
                    <use xlinkHref="#icon-full-star"></use>
                  </svg>
                  <svg width="16" height="16" aria-hidden="true">
                    <use xlinkHref="#icon-star"></use>
                  </svg>
                  <span className="rate__count"></span>
                  <span className="rate__message"></span>
                </div>
                <h4 className="review__title title title--lesser">Достоинства:</h4>
                <p className="review__value">Хороший корпус, чистый звук, стурны хорошего качества</p>
                <h4 className="review__title title title--lesser">Недостатки:</h4>
                <p className="review__value">Тугие колонки</p>
                <h4 className="review__title title title--lesser">Комментарий:</h4>
                <p className="review__value">У гитары отличный цвет, хороше дерево. Тяжелая, в компдлекте неть чехла и ремня.</p>
              </div>
              <div className="review">
                <div className="review__wrapper">
                  <h4 className="review__title review__title--author title title--lesser">Перова Ольга</h4><span className="review__date">12 декабря</span>
                </div>
                <div className="rate review__rating-panel" aria-hidden="true"><span className="visually-hidden">Рейтинг:</span>
                  <svg width="16" height="16" aria-hidden="true">
                    <use xlinkHref="#icon-full-star"></use>
                  </svg>
                  <svg width="16" height="16" aria-hidden="true">
                    <use xlinkHref="#icon-full-star"></use>
                  </svg>
                  <svg width="16" height="16" aria-hidden="true">
                    <use xlinkHref="#icon-full-star"></use>
                  </svg>
                  <svg width="16" height="16" aria-hidden="true">
                    <use xlinkHref="#icon-full-star"></use>
                  </svg>
                  <svg width="16" height="16" aria-hidden="true">
                    <use xlinkHref="#icon-star"></use>
                  </svg><span className="rate__count"></span><span className="rate__message"></span>
                </div>
                <h4 className="review__title title title--lesser">Достоинства:</h4>
                <p className="review__value">Хороший корпус, чистый звук, стурны хорошего качества</p>
                <h4 className="review__title title title--lesser">Недостатки:</h4>
                <p className="review__value">Тугие колонки</p>
                <h4 className="review__title title title--lesser">Комментарий:</h4>
                <p className="review__value">У гитары отличный цвет, хороше дерево. Тяжелая, в компдлекте неть чехла и ремня. </p>
              </div>
              <div className="review">
                <div className="review__wrapper">
                  <h4 className="review__title review__title--author title title--lesser">Преображенская  Ксения</h4><span className="review__date">12 декабря</span>
                </div>
                <div className="rate review__rating-panel" aria-hidden="true"><span className="visually-hidden">Рейтинг:</span>
                  <svg width="16" height="16" aria-hidden="true">
                    <use xlinkHref="#icon-full-star"></use>
                  </svg>
                  <svg width="16" height="16" aria-hidden="true">
                    <use xlinkHref="#icon-full-star"></use>
                  </svg>
                  <svg width="16" height="16" aria-hidden="true">
                    <use xlinkHref="#icon-full-star"></use>
                  </svg>
                  <svg width="16" height="16" aria-hidden="true">
                    <use xlinkHref="#icon-full-star"></use>
                  </svg>
                  <svg width="16" height="16" aria-hidden="true">
                    <use xlinkHref="#icon-star"></use>
                  </svg><span className="rate__count"></span><span className="rate__message"></span>
                </div>
                <h4 className="review__title title title--lesser">Достоинства:</h4>
                <p className="review__value">Хороший корпус, чистый звук, стурны хорошего качества</p>
                <h4 className="review__title title title--lesser">Недостатки:</h4>
                <p className="review__value">Тугие колонки</p>
                <h4 className="review__title title title--lesser">Комментарий:</h4>
                <p className="review__value">У гитары отличный цвет, хороше дерево. Тяжелая, в компдлекте неть чехла и ремня. У гитары отличный цвет, хороше дерево. Тяжелая, в компдлекте неть чехла и ремня. У гитары отличный цвет, хороше дерево. Тяжелая, в компдлекте неть чехла и ремня. У гитары отличный цвет, хороше дерево. Тяжелая, в компдлекте неть чехла и ремня. </p>
              </div>
              <button className="button button--medium reviews__more-button">Показать еще отзывы</button><a className="button button--up button--red-border button--big reviews__up-button" href="#header">Наверх</a>
            </section>
          </div>
        </main>
        <Footer/>
      </div>
    </>
  );
}

export default Guitar;
