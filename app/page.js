"use client";
import { useCallback, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PlanSelect from "@/components/PlanSelect";
import IdolSelect from "@/components/IdolSelect";
import Configurator from "@/components/Configurator";
import styles from "./page.module.scss";

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialPlan = searchParams.get("plan");
  const initialIdol = searchParams.get("idol");

  const [plan, setPlan] = useState(initialPlan || "sense");
  const [idol, setIdol] = useState(initialIdol || "saki");

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const changePlan = (newPlan) => {
    router.replace(`/?${createQueryString("plan", newPlan)}`);
    setPlan(newPlan);
  };
  const changeIdol = (newIdol) => {
    router.replace(`/?${createQueryString("idol", newIdol)}`);
    setIdol(newIdol);
  };

  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <div className={styles.header}>
          <PlanSelect selected={plan} onChange={changePlan} />
          <IdolSelect selected={idol} onChange={changeIdol} />
        </div>
        <hr />
        <Configurator plan={plan} idol={idol} />
      </div>
    </main>
  );
}
