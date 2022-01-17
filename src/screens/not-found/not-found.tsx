import { Link } from 'react-router-dom';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import IconsList from '../../components/icons-list/icons-list';
import styles from './not-found.module.css';

function NotFound(): JSX.Element {
  return (
    <>
      <IconsList/>
      <div className="wrapper">
        <Header/>
        <main className="page-content">
          <div className="container">
            <section className={styles['not-found']}>
              <h1 className={styles['not-found__title']}>404. Страница не найдена</h1>
              <Link className={styles['not-found__link']} to="/">Вернуться на главную страницу</Link>
            </section>
          </div>
        </main>
        <Footer/>
      </div>
    </>
  );
}

export default NotFound;
