import styles from './Home.module.scss';
import Showcase from '@/components/Showcase/Showcase';
import MovieList from '@/components/MovieList/MovieList';

function Home() {
  return (
    <section className={styles.home}>
      <Showcase />
      <MovieList />
    </section>
  );
}

export default Home;
