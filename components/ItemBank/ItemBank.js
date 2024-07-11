import { useContext, useState } from "react";
import { useDrop } from "react-dnd";
import Item from "@/components/Item";
import IdolContext from "@/contexts/IdolContext";
import LoadoutContext from "@/contexts/LoadoutContext";
import { MEMORABLE_ITEMS } from "@/constants/items";
import styles from "./ItemBank.module.scss";

export default function ItemBank() {
  const { plan, idol } = useContext(IdolContext);
  const { changeItem } = useContext(LoadoutContext);
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
            <Item
              key={item.id}
              itemId={item.id}
              index={-1}
              onMouseEnter={() => setFocusedName(item.name)}
              onMouseLeave={() => setFocusedName("")}
            />
          ))}
        </div>
      </div>
      <div className={styles.name}>{focusedName}</div>
    </>
  );
}
