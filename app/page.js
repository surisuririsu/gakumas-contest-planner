"use client";
import { useState } from "react";
import IdolPicker from "@/components/IdolPicker";
import Configurator from "@/components/Configurator";
import styles from "./page.module.scss";

export default function Home() {
  const [idolId, setIdolId] = useState(1);
  const [showIdolPicker, setShowIdolPicker] = useState(false);

  function onPickIdol(id) {
    setIdolId(id);
    setShowIdolPicker(false);
  }

  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <div
          className={`${styles.sidebar} ${!showIdolPicker && styles.hidden}`}
        >
          <IdolPicker onPickIdol={onPickIdol} />
        </div>
        <Configurator
          idolId={idolId}
          onClickIdol={() => setShowIdolPicker(!showIdolPicker)}
        />
      </div>
    </main>
  );
}
