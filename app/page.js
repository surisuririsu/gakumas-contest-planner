"use client";
import { Suspense } from "react";
import PlanSelect from "@/components/PlanSelect";
import IdolSelect from "@/components/IdolSelect";
import Configurator from "@/components/Configurator";
import { IdolContextProvider } from "@/contexts/IdolContext";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <Suspense>
      <IdolContextProvider>
        <main className={styles.main}>
          <div className={styles.content}>
            <div className={styles.header}>
              <PlanSelect />
              <IdolSelect />
            </div>
            <hr />
            <Configurator />
          </div>
        </main>
      </IdolContextProvider>
    </Suspense>
  );
}
