import { useContext } from "react";
import Image from "next/image";
import { useDrag, useDrop } from "react-dnd";
import LoadoutContext from "@/contexts/LoadoutContext";
import { ITEMS_BY_ID } from "@/constants/items";
import styles from "./Item.module.scss";

export default function Item({ itemId, index, onMouseEnter, onMouseLeave }) {
  const { selection, setSelection, changeItem } = useContext(LoadoutContext);
  const pItem = ITEMS_BY_ID[itemId];
  const isBank = index === -1;
  const selected =
    selection &&
    selection.type == "PITEM" &&
    selection.fromIndex == index &&
    (!isBank || selection.id == itemId);

  function swapWith(item) {
    if (item.type == "PITEM") {
      if (!isBank) {
        changeItem(index, item.id);
      }
      if (item.fromIndex[0] != -1) {
        changeItem(item.fromIndex, isBank ? 0 : itemId);
      }
    }
    setSelection(null);
  }

  const [, dragRef] = useDrag(() => ({
    type: "PITEM",
    item: { type: "PITEM", id: itemId, fromIndex: index },
  }));
  const [, dropRef] = useDrop(() => ({
    accept: "PITEM",
    drop: swapWith,
  }));

  function handleClick() {
    if (selection) {
      swapWith(selection);
    } else {
      setSelection({ type: "PITEM", id: itemId, fromIndex: index });
    }
  }

  return (
    <div ref={dropRef}>
      <div
        className={`
          ${styles.item}
          ${selected ? styles.selected : ""}
        `}
        ref={dragRef}
        onClick={handleClick}
      >
        <Image
          src={`/items/${pItem?.alias || "placeholder"}.png`}
          fill
          alt={pItem?.name || ""}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          sizes="3.75em"
        />
      </div>
    </div>
  );
}
