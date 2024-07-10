"use client";
import { useState } from "react";
import PlanSelect from "@/components/PlanSelect";
import IdolSelect from "@/components/IdolSelect";
import Configurator from "@/components/Configurator";
import styles from "./page.module.scss";

export default function Home() {
  const [plan, setPlan] = useState("sense");
  const [idol, setIdol] = useState("saki");
  const [idolId, setIdolId] = useState(1);
  const [showIdolSelect, setShowIdolSelect] = useState(false);

  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <PlanSelect selected={plan} onChange={setPlan} />
        <IdolSelect selected={idol} onChange={setIdol} />
        <div
          className={`${styles.sidebar} ${!showIdolSelect && styles.hidden}`}
        ></div>
        <Configurator
          idolId={idolId}
          onClickIdol={() => setShowIdolSelect(!showIdolSelect)}
        />
      </div>
    </main>
  );
}
