import { useContext, useState } from "react";
import { useDrop } from "react-dnd";
import IdolContext from "@/contexts/IdolContext";
import { MEMORABLE_ITEMS } from "@/constants/items";
import ItemBankElement from "./ItemBankElement";
import styles from "./ItemBank.module.scss";

export default function ItemBank() {
  const { plan, idol, changeItem } = useContext(IdolContext);
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
