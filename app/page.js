"use client";
import { useState } from "react";
import IdolSelect from "@/components/IdolSelect";
import Configurator from "@/components/Configurator";
import styles from "./page.module.scss";

export default function Home() {
  const [idolId, setIdolId] = useState(1);
  const [showIdolSelect, setShowIdolSelect] = useState(false);

  function onPickIdol(id) {
    setIdolId(id);
    setShowIdolSelect(false);
  }

  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <div
          className={`${styles.sidebar} ${!showIdolSelect && styles.hidden}`}
        >
          <IdolSelect onPickIdol={onPickIdol} />
        </div>
        <Configurator
          idolId={idolId}
          onClickIdol={() => setShowIdolSelect(!showIdolSelect)}
        />
      </div>
    </main>
  );
}
