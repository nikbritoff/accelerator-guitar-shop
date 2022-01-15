import styles from './loading-error.module.css';

function LoadingError(): JSX.Element {
  return (
    <section className={styles['loading-error']}>
      <h1 className={styles['loading-error__title']}>Ошибка загрузки данных</h1>
      <p className={styles['loading-error__text']}>Повторите попытку позднее</p>
    </section>
  );
}

export default LoadingError;
