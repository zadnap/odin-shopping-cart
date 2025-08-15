import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './Movie.module.scss';
import MovieDetail from '@/components/MovieDetail/MovieDetail';
import CastList from '@/components/CastList/CastList';
import Review from '@/components/Review/Review';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import Loader from '@/components/Loader/Loader';
import { formatDate, formatRuntime } from '@/utils/time.js';
import fallbackAvatar from '@/assets/fallback-avatar.png';
import fallbackActor from '@/assets/fallback-actor.jpg';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

function Movie() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [casts, setCasts] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [errorMessage, setErrorMessage] = useState(null);

  const handlePrevReview = () => {
    setReviewIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleNextReview = () => {
    setReviewIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const [movieRes, creditsRes, releaseRes, videoRes, reviewRes] =
          await Promise.all([
            fetch(
              `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
            ),
            fetch(
              `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`
            ),
            fetch(
              `https://api.themoviedb.org/3/movie/${id}/release_dates?api_key=${API_KEY}`
            ),
            fetch(
              `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`
            ),
            fetch(
              `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${API_KEY}`
            ),
          ]);

        if (
          !movieRes.ok ||
          !creditsRes.ok ||
          !releaseRes.ok ||
          !videoRes.ok ||
          !reviewRes.ok
        )
          throw new Error(
            (movieRes.status === 404 ||
            creditsRes.status === 404 ||
            releaseRes.status === 404 ||
            videoRes.status === 404 ||
            reviewRes.status === 404
              ? 'Could not find this movie. '
              : 'Something went wrong while fetching genre data. ') +
              'Please try again later.'
          );

        const movieData = await movieRes.json();
        const creditsData = await creditsRes.json();
        const releaseData = await releaseRes.json();
        const videoData = await videoRes.json();
        const reviewData = await reviewRes.json();

        const usRelease = releaseData.results.find(
          (r) => r.iso_3166_1 === 'US'
        );
        const certification =
          usRelease?.release_dates.find((r) => r.certification)
            ?.certification || 'NR';

        const trailer = videoData.results.find(
          (video) =>
            video.site === 'YouTube' &&
            video.type === 'Trailer' &&
            video.official === true
        );

        const movieResult = {
          id: movieData.id,
          title: movieData.title,
          posterSrc: `https://image.tmdb.org/t/p/original${movieData.poster_path}`,
          backdropSrc: `https://image.tmdb.org/t/p/original${movieData.backdrop_path}`,
          certification,
          releaseDate: formatDate(movieData.release_date),
          duration: formatRuntime(movieData.runtime),
          overview: movieData.overview,
          genres: movieData.genres,
          rating: movieData.vote_average.toFixed(1),
          languages: movieData.spoken_languages.map((lang) => ({
            id: lang.iso_639_1,
            name: lang.english_name,
          })),
          directors: creditsData.crew
            .filter((person) => person.job === 'Director')
            .map((person) => person.name),
          writers: creditsData.crew
            .filter((person) =>
              ['Writer', 'Screenplay', 'Author', 'Story'].includes(person.job)
            )
            .map((person) => person.name),
          trailerKey: trailer?.key,
          rent: 4.99,
        };

        const castResult = creditsData.cast.map((cast) => ({
          id: cast.id,
          name: cast.name,
          character: cast.character,
          profilePicture: cast.profile_path
            ? `https://image.tmdb.org/t/p/original${cast.profile_path}`
            : fallbackActor,
        }));

        const reviewResult = reviewData.results.map((review) => ({
          id: review.id,
          author: review.author,
          detail: review.content,
          rating: review.author_details.rating * 10,
          profileImage: review.author_details.avatar_path
            ? `https://image.tmdb.org/t/p/original${review.author_details.avatar_path}`
            : fallbackAvatar,
          releaseDate: new Date(review.created_at).toLocaleDateString(),
        }));

        setMovie(movieResult);
        setCasts(castResult);
        setReviews(reviewResult);
      } catch (error) {
        setErrorMessage(error.message);
      }
    };

    fetchMovie();
  }, [id]);

  return (
    <section className={styles.movie}>
      {errorMessage ? (
        <ErrorMessage message={errorMessage} />
      ) : (
        <>
          {movie ? <MovieDetail movie={movie} /> : <Loader />}
          {casts ? <CastList casts={casts} /> : <Loader />}
          {reviews ? (
            <Review
              numberOfReview={reviews.length}
              currentReview={reviews[reviewIndex]}
              onPrev={handlePrevReview}
              onNext={handleNextReview}
            />
          ) : (
            <Loader />
          )}
        </>
      )}
    </section>
  );
}

export default Movie;
