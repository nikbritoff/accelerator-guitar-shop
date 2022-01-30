import { History } from 'history';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import IconsList from '../../components/icons-list/icons-list';
import { AppRoute, Screen } from '../../const';
import { changeScreen } from '../../store/action';
import styles from './guitar.module.css';

type GuitarProps = {
  history: History,
}

function Guitar({history}: GuitarProps): JSX.Element {
  const {id} = useParams<{ id: string }>();

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
            <section className={styles['guitar']}>
              <h1 className={styles['guitar__title']}>404. Страница находится в разработке</h1>
              <p>ID гитары - {id}</p>
              <Link className={styles['guitar__link']} to={AppRoute.Catalog}>Вернуться к каталогу</Link>
            </section>
          </div>
        </main>
        <Footer/>
      </div>
    </>
  );
}

export default Guitar;
