import { useContext, useState } from "react";
import { useDrop } from "react-dnd";
import IdolContext from "@/contexts/IdolContext";
import LoadoutContext from "@/contexts/LoadoutContext";
import { MEMORABLE_CARDS } from "@/constants/cards";
import Card from "@/components/Card";
import styles from "./CardBank.module.scss";

export default function CardBank() {
  const { plan, idol } = useContext(IdolContext);
  const { changeCard, changeItem } = useContext(LoadoutContext);
  const [focusedName, setFocusedName] = useState(" ");
  const [, drop] = useDrop(() => ({
    accept: ["CARD", "PITEM"],
    drop: (item) => {
      if (item.type == "CARD" && item.fromIndex[0] != -1) {
        changeCard(item.fromIndex, 0);
      }
      if (item.type == "PITEM" && item.fromIndex != -1) {
        changeItem(item.fromIndex, 0);
      }
    },
  }));

  const filteredCards = MEMORABLE_CARDS.filter((card) => {
    if (card.plan && card.plan != plan) return false;
    if (card.idol && card.idol != idol) return false;
    return true;
  });

  return (
    <>
      <div className={styles.bank} ref={drop}>
        <div className={styles.bankInner}>
          {filteredCards.map((card) => (
            <Card
              key={card.id}
              cardId={card.id}
              index={[-1, 0]}
              onMouseEnter={() => setFocusedName(card.name)}
              onMouseLeave={() => setFocusedName(" ")}
            />
          ))}
        </div>
      </div>
      <div className={styles.name}>{focusedName}</div>
    </>
  );
}
