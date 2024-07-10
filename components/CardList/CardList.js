import Image from "next/image";
import { CARDS_BY_ID } from "@/constants/cards";
import styles from "./CardList.module.scss";

export default function CardList({ cards }) {
  return (
    <div className={styles.list}>
      {cards.map((cardId) => {
        const card = CARDS_BY_ID[cardId];
        return (
          <div key={cardId} className={styles.card}>
            <Image
              src={`/cards/${card ? card.alias : "placeholder"}.png`}
              width={80}
              height={80}
              alt=""
            />
          </div>
        );
      })}
    </div>
  );
}
