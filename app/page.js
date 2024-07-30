import { Suspense } from "react";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import Header from "@/components/Header";
import Configurator from "@/components/Configurator";
import DevMessage from "@/components/DevMessage/DevMessage";
import { IdolContextProvider } from "@/contexts/IdolContext";
import { LoadoutContextProvider } from "@/contexts/LoadoutContext";
import styles from "./page.module.scss";

export async function generateMetadata({ searchParams }) {
  const query = new URLSearchParams(searchParams).toString();
  return {
    title: "Gakumas Contest Planner",
    description: "Plan Gakumas contest loadouts",
    openGraph: {
      images: [`/api/preview/?${query}`],
    },
  };
}

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
            <DevMessage />
          </main>
        </LoadoutContextProvider>
      </IdolContextProvider>
    </Suspense>
  );
}
