import styles from './CastList.module.scss';

function CastList({ casts }) {
  return (
    <section className={styles.castListContainer}>
      <h1 className={styles.title}>The Cast</h1>
      <div className={styles.scroller}>
        <ul className={styles.castList}>
          {casts.map((cast) => (
            <li key={cast.id} className={styles.item}>
              <img
                className={styles.profilePicture}
                src={cast.profilePicture}
                alt={`${cast.name}'s profile picture`}
              />
              <div className={styles.info}>
                <h2 className={styles.actor}>{cast.name}</h2>
                <p className={styles.character}>{cast.character}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default CastList;
