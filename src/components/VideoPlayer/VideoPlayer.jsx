import styles from './VideoPlayer.module.scss';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';

function VideoPlayer({ videoKey, movieTitle }) {
  return videoKey ? (
    <iframe
      className={styles.videoPlayer}
      src={`https://www.youtube.com/embed/${videoKey}?controls=1&cc_load_policy=1`}
      allow="autoplay; encrypted-media"
      allowFullScreen
      title={`${movieTitle}'s trailer`}
      aria-label={`YouTube trailer for ${movieTitle}`}
      loading="lazy"
    />
  ) : (
    <ErrorMessage message="Trailer Unavailable" />
  );
}

export default VideoPlayer;
