import styles from './loading.module.css';
import BounceLoader from 'react-spinners/BounceLoader';

function Loading(): JSX.Element {
  return (
    <section className={styles['loading']}>
      <BounceLoader
        size={200}
        color={'#131212'}
      />
    </section>
  );
}

export default Loading;
