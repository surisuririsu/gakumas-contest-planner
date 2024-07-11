import { useContext, useState } from "react";
import Image from "next/image";
import IdolContext from "@/contexts/IdolContext";
import { CARDS_BY_ID, DEFAULT_CARDS_BY_PLAN } from "@/constants/cards";
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
            <div key={`${index}_${cardId}`} className={styles.card}>
              <Image
                src={`/cards/${CARDS_BY_ID[cardId].alias}.png`}
                fill
                alt=""
                sizes="5em"
              />
            </div>
          ))}
        </div>
      )}
      <a className={styles.toggle} onClick={() => setVisible(!visible)}>
        {visible ? "Hide" : "Show"} default cards
      </a>
    </div>
  );
}
