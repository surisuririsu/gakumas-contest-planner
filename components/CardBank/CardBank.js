import { useContext, useState } from "react";
import { useDrop } from "react-dnd";
import { PIdols, SkillCards } from "gakumas-data";
import IdolContext from "@/contexts/IdolContext";
import LoadoutContext from "@/contexts/LoadoutContext";
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

  const filteredPIdols = PIdols.getFiltered({
    idolIds: [idol],
    plans: [plan],
  });
  const signatureCards = SkillCards.getFiltered({
    pIdolIds: filteredPIdols.map((pi) => pi.id),
  });
  const nonSignatureCards = SkillCards.getFiltered({
    rarities: ["R", "SR", "SSR"],
    plans: [plan, "free"],
    sourceTypes: ["produce", "support"],
  }).sort((a, b) => {
    if (a.sourceType == b.sourceType) {
      return a.rarity >= b.rarity ? 1 : -1;
    }
    return a.sourceType == "produce" && b.sourceType == "support" ? -1 : 1;
  });

  return (
    <>
      <div className={styles.bank} ref={drop}>
        <div className={styles.bankInner}>
          {signatureCards.concat(nonSignatureCards).map((card) => (
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
