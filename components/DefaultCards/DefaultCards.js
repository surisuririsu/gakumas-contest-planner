import { useContext, useState } from "react";
import Card from "@/components/Card";
import IdolContext from "@/contexts/IdolContext";
import styles from "./DefaultCards.module.scss";

export const DEFAULT_CARDS_BY_PLAN = {
  sense: [5, 7, 1, 1, 15, 15, 17, 17],
  logic: [9, 11, 19, 19, 21, 21, 13, 13],
};

export default function DefaultCards() {
  const { plan } = useContext(IdolContext);
  const defaultCards = DEFAULT_CARDS_BY_PLAN[plan];

  return (
    <div className={styles.list}>
      {defaultCards.map((cardId, index) => (
        <Card
          key={`${index}_${cardId}`}
          cardId={cardId}
          index={[-1, 0]}
          fixed
        />
      ))}
    </div>
  );
}
