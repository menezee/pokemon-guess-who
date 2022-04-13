import styles from "./footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <h3 className={styles.text}>
        Apenas os 150 pokemons originais!
        <span role="img" aria-label="alien">
          👾
        </span>
      </h3>
    </footer>
  );
}

export { Footer };
