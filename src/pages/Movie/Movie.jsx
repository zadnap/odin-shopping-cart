import { useParams } from 'react-router-dom';
import { useState } from 'react';
import styles from './Movie.module.scss';
import MovieDetail from '@/components/MovieDetail/MovieDetail';
import CastList from '@/components/CastList/CastList';
import Review from '@/components/Review/Review';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import Loader from '@/components/Loader/Loader';
import useMovieDetail from '../../hooks/useMovieDetail';

function Movie() {
  const { id } = useParams();
  const [reviewIndex, setReviewIndex] = useState(0);
  const { movie, casts, reviews, loading, error } = useMovieDetail(id);

  return (
    <section className={styles.movie}>
      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && (
        <>
          <MovieDetail movie={movie} />
          <CastList casts={casts} />
          <Review
            numberOfReview={reviews.length}
            currentReview={reviews[reviewIndex]}
            onPrev={() =>
              setReviewIndex((prev) =>
                prev === 0 ? reviews.length - 1 : prev - 1
              )
            }
            onNext={() =>
              setReviewIndex((prev) =>
                prev === reviews.length - 1 ? 0 : prev + 1
              )
            }
          />
        </>
      )}
    </section>
  );
}

export default Movie;
