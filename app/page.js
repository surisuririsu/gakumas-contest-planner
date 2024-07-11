"use client";
import { Suspense } from "react";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import Header from "@/components/Header";
import Configurator from "@/components/Configurator";
import { IdolContextProvider } from "@/contexts/IdolContext";
import { LoadoutContextProvider } from "@/contexts/LoadoutContext";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <Suspense>
      <GoogleAnalytics />
      <IdolContextProvider>
        <LoadoutContextProvider>
          <main className={styles.main}>
            <div className={styles.content}>
              <Header />
              <hr />
              <Configurator />
            </div>
          </main>
        </LoadoutContextProvider>
      </IdolContextProvider>
    </Suspense>
  );
}
