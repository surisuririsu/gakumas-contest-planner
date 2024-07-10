import { useState } from "react";
import { useDrop } from "react-dnd";
import ItemBankElement from "./ItemBankElement";
import { MEMORABLE_ITEMS } from "@/constants/items";
import styles from "./ItemBank.module.scss";

export default function ItemBank({ plan, idol, changeItem }) {
  const [focusedName, setFocusedName] = useState("");
  const [, drop] = useDrop(() => ({
    accept: "PITEM",
    drop: (item) => {
      if (item.fromIndex != -1) {
        changeItem(item.fromIndex, 0);
      }
    },
  }));

  const filteredItems = MEMORABLE_ITEMS.filter((item) => {
    if (item.plan && item.plan != plan) return false;
    if (item.idol && item.idol != idol) return false;
    return true;
  });

  return (
    <>
      <div className={styles.bank} ref={drop}>
        <div className={styles.bankInner}>
          {filteredItems.map((item) => (
            <ItemBankElement
              key={item.id}
              item={item}
              setFocusedName={setFocusedName}
            />
          ))}
        </div>
      </div>
      <div className={styles.name}>{focusedName}</div>
    </>
  );
}
