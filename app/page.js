"use client";
import { Suspense } from "react";
import Header from "@/components/Header";
import Configurator from "@/components/Configurator";
import { IdolContextProvider } from "@/contexts/IdolContext";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <Suspense>
      <IdolContextProvider>
        <main className={styles.main}>
          <div className={styles.content}>
            <Header />
            <hr />
            <Configurator />
          </div>
        </main>
      </IdolContextProvider>
    </Suspense>
  );
}
