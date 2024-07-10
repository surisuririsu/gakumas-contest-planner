import Image from "next/image";
import { ITEMS_BY_ID } from "@/constants/items";
import styles from "./ItemList.module.scss";

export default function ItemList({ items }) {
  return (
    <div className={styles.list}>
      {items.map((itemId) => {
        const item = ITEMS_BY_ID[itemId];
        return (
          <div key={itemId} className={styles.item}>
            <Image
              src={`/items/${item ? item.alias : "placeholder"}.png`}
              width={60}
              height={60}
              alt=""
            />
          </div>
        );
      })}
    </div>
  );
}
