import { useContext, useState } from "react";
import { useDrop } from "react-dnd";
import IdolContext from "@/contexts/IdolContext";
import { MEMORABLE_CARDS } from "@/constants/cards";
import CardBankElement from "./CardBankElement";
import styles from "./CardBank.module.scss";

export default function CardBank() {
  const { plan, idol, changeCard } = useContext(IdolContext);
  const [focusedName, setFocusedName] = useState(" ");
  const [, drop] = useDrop(() => ({
    accept: "CARD",
    drop: (item) => {
      if (item.fromIndex[0] != -1) {
        changeCard(item.fromIndex, 0);
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
            <CardBankElement
              key={card.id}
              card={card}
              setFocusedName={setFocusedName}
            />
          ))}
        </div>
      </div>
      <div className={styles.name}>{focusedName}</div>
    </>
  );
}
