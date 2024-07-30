import styles from "./DevMessage.module.scss";

export default function DevMessage() {
  return (
    <div className={styles.message}>
      <a href="https://gktools.ris.moe">
        Try out Gakumas Tools (In development)
      </a>
    </div>
  );
}
