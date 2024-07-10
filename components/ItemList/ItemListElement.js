import { useContext } from "react";
import Image from "next/image";
import { useDrag, useDrop } from "react-dnd";
import IdolContext from "@/contexts/IdolContext";
import { ITEMS_BY_ID } from "@/constants/items";
import styles from "./ItemList.module.scss";

export default function ItemListElement({ index, itemId }) {
  const { changeItem } = useContext(IdolContext);
  const item = ITEMS_BY_ID[itemId];

  const [, drag] = useDrag(() => ({
    type: "PITEM",
    item: { id: itemId, fromIndex: index },
  }));
  const [, drop] = useDrop(() => ({
    accept: "PITEM",
    drop: (item) => {
      changeItem(index, item.id);
      if (item.fromIndex != -1) {
        changeItem(item.fromIndex, itemId);
      }
    },
  }));

  return (
    <div ref={drop}>
      <div className={styles.item} ref={drag}>
        <Image
          src={`/items/${item ? item.alias : "placeholder"}.png`}
          width={60}
          height={60}
          alt=""
        />
      </div>
    </div>
  );
}
