import styles from "./filter-tag.module.css";

function FilterTag({ name, value, isMatch }) {
  return (
    <article
      className={styles.tag}
      style={{ color: isMatch ? "blue" : "#c90404" }}
    >
      {name}: {value}
    </article>
  );
}

export { FilterTag };
