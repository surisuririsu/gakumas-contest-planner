import { useContext, useState } from "react";
import Card from "@/components/Card";
import IdolContext from "@/contexts/IdolContext";
import { DEFAULT_CARDS_BY_PLAN } from "@/constants/cards";
import styles from "./DefaultCards.module.scss";

export default function DefaultCards() {
  const { plan } = useContext(IdolContext);
  const [visible, setVisible] = useState(false);
  const defaultCards = DEFAULT_CARDS_BY_PLAN[plan];

  return (
    <div>
      {visible && (
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
      )}
      <a className={styles.toggle} onClick={() => setVisible(!visible)}>
        {visible ? "Hide" : "Show"} default cards
      </a>
    </div>
  );
}
