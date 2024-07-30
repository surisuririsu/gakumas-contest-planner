import { useContext } from "react";
import Image from "next/image";
import { useDrag, useDrop } from "react-dnd";
import { SkillCards } from "gakumas-data";
import IdolContext from "@/contexts/IdolContext";
import LoadoutContext from "@/contexts/LoadoutContext";
import styles from "./Card.module.scss";

export default function Card({
  cardId,
  index,
  fixed,
  onMouseEnter,
  onMouseLeave,
}) {
  const { idol } = useContext(IdolContext);
  const { selection, setSelection, changeCard } = useContext(LoadoutContext);
  const card = SkillCards.getById(cardId);
  const isBank = index[0] === -1;
  const selected =
    selection &&
    selection.type == "CARD" &&
    selection.fromIndex.join() == index.join() &&
    (!isBank || selection.id == cardId);

  function swapWith(item) {
    if (item.type == "CARD") {
      if (!isBank) {
        changeCard(index, item.id);
      }
      if (item.fromIndex[0] != -1) {
        changeCard(item.fromIndex, isBank ? 0 : cardId);
      }
    }
    setSelection(null);
  }

  const [, dragRef] = useDrag(() => ({
    type: "CARD",
    item: { type: "CARD", id: cardId, fromIndex: index },
  }));
  const [, dropRef] = useDrop(() => ({
    accept: "CARD",
    drop: swapWith,
  }));

  function handleClick() {
    if (selection) {
      swapWith(selection);
    } else {
      setSelection({ type: "CARD", id: cardId, fromIndex: index });
    }
  }

  return (
    <div ref={fixed ? null : dropRef}>
      <button
        tabIndex={fixed ? -1 : undefined}
        className={`
          ${styles.card}
          ${selected ? styles.selected : ""}
          ${fixed ? "" : styles.draggable}
        `}
        ref={fixed ? null : dragRef}
        onClick={fixed ? null : handleClick}
      >
        {card?.icon && (
          <Image
            src={card.getDynamicIcon?.(idol) || card.icon}
            fill
            alt={card.name}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            sizes="4.5em"
          />
        )}
      </button>
    </div>
  );
}
