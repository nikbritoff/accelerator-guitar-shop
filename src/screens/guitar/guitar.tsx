import { History } from 'history';
import { useEffect, useState, MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import IconsList from '../../components/icons-list/icons-list';
import LoadingError from '../../components/loading-error/loading-error';
import Loading from '../../components/loading/loading';
import { AppRoute, CommentsListSettings, ratingValues, Screen } from '../../const';
import { changeScreen, loadSearchResultsSuccess } from '../../store/action';
import { fetchGuitarInfo, fetchGuitarInfoCommentsList } from '../../store/api-actions';
import { getCommentsList, getGuitarInfo, getGuitarInfoError, getGuitarInfoLoading } from '../../store/guitar-info/selectors';
import { translateType } from '../../utils/guitar-info';
import cn from 'classnames';
import Reviews from '../../components/reviews/reviews';
import RatingStar from '../../components/rating-star/rating-star';
import ReviewForm from '../../components/review-form/review-form';
import WithPopupControls from '../../hocs/with-popup-controls';
import ModalReviewSuccess from '../../components/modal-review-success/modal-review-success';
import ModalAddToCart from '../../components/modal-add-to-cart/modal-add-to-cart';
import ModalAddToCartSuccess from '../../components/modal-add-to-cart-success/modal-add-to-cart-success';

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
  const commentsList = useSelector(getCommentsList);

  const [isDescriptionActive, setIsDescriptionActive] = useState(true);
  const [isCharacteristicsActive, setIsCharacteristicsActive] = useState(false);
  const [isReviewModalActive, setIsReviewModalActive] = useState(false);
  const [isModalReviewSuccessActive, setIsModalReviewSuccessActive] = useState(false);
  const [shownCommentsAmount, setShownCommentsAmount] = useState(commentsList.length >= CommentsListSettings.ShownStep ? CommentsListSettings.ShownStep : commentsList.length);
  const [isModalAddToCartActive, setIsModalAddToCartActive] = useState(false);
  const [isModalAddToCartSuccessActive, setIsModalAddToCartSuccessActive] = useState(false);

  const descriptionTabClickHandler = (evt: MouseEvent<HTMLAnchorElement>): void => {
    evt.preventDefault();
    setIsDescriptionActive(!isDescriptionActive);
    setIsCharacteristicsActive(!isCharacteristicsActive);
  };

  const characteristicsTabClickHandler = (evt: MouseEvent<HTMLAnchorElement>): void => {
    evt.preventDefault();
    setIsDescriptionActive(!isDescriptionActive);
    setIsCharacteristicsActive(!isCharacteristicsActive);
  };

  const handleAddToCartClick = (evt: MouseEvent<HTMLAnchorElement>): void => {
    evt.preventDefault();
    setIsModalAddToCartActive(true);
  };

  useEffect(() => {
    dispatch(fetchGuitarInfo(id));
    dispatch(fetchGuitarInfoCommentsList(id));
    dispatch(changeScreen(Screen.Other));
    dispatch(loadSearchResultsSuccess([]));
    window.scrollTo({top: 0});
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
            <h1 className="page-content__title title title--bigger">??????????</h1>
            <ul className="breadcrumbs page-content__breadcrumbs">
              <li className="breadcrumbs__item">
                <Link className="link" to={AppRoute.Main}>??????????????</Link>
              </li>
              <li className="breadcrumbs__item">
                <Link className="link" to={AppRoute.Catalog}>??????????????</Link>
              </li>
              <li className="breadcrumbs__item">
                <Link className="link" to={`${AppRoute.Catalog}/${id}`}>{guitarInfo.name}</Link>
              </li>
            </ul>
            <div className="product-container">
              <img className="product-container__img" src={`/${guitarInfo.previewImg}`} width="90" height="235" alt=""/>
              <div className="product-container__info-wrapper">
                <h2 className="product-container__title title title--big title--uppercase">{guitarInfo.name}</h2>
                <div className="rate product-container__rating" aria-hidden="true"><span className="visually-hidden">??????????????:</span>
                  {ratingValues.map((item) => (
                    <RatingStar
                      key={item}
                      width='14'
                      height='14'
                      isFull={item <= Math.round(guitarInfo.rating)}
                    />
                  ))}
                  <span className="rate__count">{commentsList.length}</span>
                  <span className="rate__message"></span>
                </div>
                <div className="tabs">
                  <a
                    className={cn(
                      'button',
                      'button--medium',
                      'tabs__button',
                      {'button--black-border' : isCharacteristicsActive},
                    )}
                    href="#characteristics"
                    onClick={characteristicsTabClickHandler}
                  >
                    ????????????????????????????
                  </a>
                  <a
                    className={cn(
                      'button',
                      'button--medium',
                      'tabs__button',
                      {'button--black-border' : isDescriptionActive},
                    )}
                    href="#description"
                    onClick={descriptionTabClickHandler}
                  >
                    ????????????????
                  </a>
                  <div className="tabs__content" id="characteristics">
                    <table
                      className={cn(
                        'tabs__table',
                        {'hidden' : isCharacteristicsActive},
                      )}
                    >
                      <tbody>
                        <tr className="tabs__table-row">
                          <td className="tabs__title">??????????????:</td>
                          <td className="tabs__value">{guitarInfo.vendorCode}</td>
                        </tr>
                        <tr className="tabs__table-row">
                          <td className="tabs__title">??????:</td>
                          <td className="tabs__value">{translateType(guitarInfo.type)}</td>
                        </tr>
                        <tr className="tabs__table-row">
                          <td className="tabs__title">???????????????????? ??????????:</td>
                          <td className="tabs__value">{guitarInfo.stringCount} ????????????????</td>
                        </tr>
                      </tbody>
                    </table>
                    <p
                      className={cn(
                        'tabs__product-description',
                        {'hidden' : isDescriptionActive},
                      )}
                    >
                      {guitarInfo.description}
                    </p>
                  </div>
                </div>
              </div>
              <div className="product-container__price-wrapper">
                <p className="product-container__price-info product-container__price-info--title">????????:</p>
                <p className="product-container__price-info product-container__price-info--value">{guitarInfo.price} ???</p>
                <a
                  className="button button--red button--big product-container__button"
                  href="/#"
                  onClick={handleAddToCartClick}
                >
                  ???????????????? ?? ??????????????
                </a>
              </div>
            </div>
            <Reviews
              commentsList={commentsList}
              setIsReviewModalActive={setIsReviewModalActive}
              setShownCommentsAmount={setShownCommentsAmount}
              shownCommentsAmount={shownCommentsAmount}
            />
          </div>
        </main>
        <Footer/>

        <WithPopupControls
          modalClass={'modal--review'}
          isActive={isReviewModalActive}
          setIsModalActive={setIsReviewModalActive}
        >
          <ReviewForm
            setIsReviewModalActive={setIsReviewModalActive}
            setIsReviewModalSuccessActive={setIsModalReviewSuccessActive}
            id={id}
            guitarName={guitarInfo.name}
            setShownCommentsAmount={setShownCommentsAmount}
            shownCommentsAmount={shownCommentsAmount}
          />
        </WithPopupControls>

        <WithPopupControls
          modalClass={'modal--success'}
          isActive={isModalReviewSuccessActive}
          setIsModalActive={setIsModalReviewSuccessActive}
        >
          <ModalReviewSuccess
            setIsModalReviewSuccessActive={setIsModalReviewSuccessActive}
          />
        </WithPopupControls>

        <WithPopupControls
          isActive={isModalAddToCartActive}
          setIsModalActive={setIsModalAddToCartActive}
          modalClass={''}
        >
          <ModalAddToCart
            setIsModalAddToCartActive={setIsModalAddToCartActive}
            setIsModalAddToCartSuccessActive={setIsModalAddToCartSuccessActive}
            guitar={guitarInfo}
          />
        </WithPopupControls>

        <WithPopupControls
          isActive={isModalAddToCartSuccessActive}
          setIsModalActive={setIsModalAddToCartSuccessActive}
          modalClass={'modal--success'}
        >
          <ModalAddToCartSuccess
            setIsModalAddToCartSuccessActive={setIsModalAddToCartSuccessActive}
            history={history}
          />
        </WithPopupControls>
      </div>
    </>
  );
}

export default Guitar;
