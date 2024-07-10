import Image from "next/image";
import { useDrag, useDrop } from "react-dnd";
import { CARDS_BY_ID } from "@/constants/cards";
import styles from "./CardList.module.scss";

export default function CardListElement({
  groupIndex,
  index,
  cardId,
  changeCard,
}) {
  const card = CARDS_BY_ID[cardId];

  const [, drag] = useDrag(() => ({
    type: "CARD",
    item: { id: cardId, fromIndex: [groupIndex, index] },
  }));
  const [, drop] = useDrop(() => ({
    accept: "CARD",
    drop: (item) => {
      changeCard([groupIndex, index], item.id);
      if (item.fromIndex[0] != -1) {
        changeCard(item.fromIndex, cardId);
      }
    },
  }));

  return (
    <div ref={drop}>
      <div className={styles.card} ref={drag}>
        <Image
          src={`/cards/${card ? card.alias : "placeholder"}.png`}
          width={80}
          height={80}
          alt=""
        />
      </div>
    </div>
  );
}
