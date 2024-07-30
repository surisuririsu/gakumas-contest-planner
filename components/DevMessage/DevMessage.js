"use client";
import styles from "./DevMessage.module.scss";

export default function DevMessage() {
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

  return isMobile ? null : (
    <div className={styles.message}>
      <a href="https://gktools.ris.moe">
        Try out Gakumas Tools (In development)
      </a>
    </div>
  );
}
