import { History } from 'history';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import IconsList from '../../components/icons-list/icons-list';
import { AppRoute, Screen } from '../../const';
import { changeScreen } from '../../store/action';
import styles from './not-found.module.css';

type NotFoundProps = {
  history: History,
}

function NotFound({history}: NotFoundProps): JSX.Element {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(changeScreen(Screen.Other));
  });

  return (
    <>
      <IconsList/>
      <div className="wrapper">
        <Header history={history}/>
        <main className="page-content">
          <div className="container">
            <section className={styles['not-found']}>
              <h1 className={styles['not-found__title']}>404. Страница не найдена</h1>
              <Link className={styles['not-found__link']} to={AppRoute.Catalog}>Вернуться к каталогу</Link>
            </section>
          </div>
        </main>
        <Footer/>
      </div>
    </>
  );
}

export default NotFound;
