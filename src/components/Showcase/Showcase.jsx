import styles from './Showcase.module.scss';
import { Link } from 'react-router-dom';

function Showcase({ id, title, desc, tags, backdropSrc }) {
  return (
    <article
      className={styles.showcase}
      style={{
        backgroundImage: `url(${backdropSrc})`,
      }}
    >
      <ul className={styles.tagList}>
        {tags.map((tag) => (
          <li key={tag} className={styles.tag}>
            {tag}
          </li>
        ))}
      </ul>
      <div className={styles.movieInfo}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.desc}>
          <span className={styles.clampText}>{desc}</span>{' '}
          <Link className={styles.seeMore} to={`/movies/${id}`}>
            See more
          </Link>
        </p>
      </div>
    </article>
  );
}

export default Showcase;
