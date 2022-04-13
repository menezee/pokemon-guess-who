import styles from "./pokemon-card.module.css";

function PokemonCard({ name, color, sprite }) {
  return (
    <article key={name} className={styles.item}>
      <section className={styles.image_container}>
        <img src={sprite} alt={name} />
      </section>
      <h1 className={styles.title} style={{ color: color }}>
        {name}
      </h1>
    </article>
  );
}

export { PokemonCard };
