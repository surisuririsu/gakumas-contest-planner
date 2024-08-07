import { useContext, useState } from "react";
import { useDrop } from "react-dnd";
import { PIdols, PItems } from "gakumas-data";
import Item from "@/components/Item";
import IdolContext from "@/contexts/IdolContext";
import LoadoutContext from "@/contexts/LoadoutContext";
import { comparePItems } from "@/utils/sort";
import styles from "./ItemBank.module.scss";

export default function ItemBank() {
  const { plan, idol } = useContext(IdolContext);
  const { changeCard, changeItem } = useContext(LoadoutContext);
  const [focusedName, setFocusedName] = useState("");
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
  const signatureItems = PItems.getFiltered({
    pIdolIds: filteredPIdols.map((pi) => pi.id),
  });
  const nonSignatureItems = PItems.getFiltered({
    plans: [plan, "free"],
    modes: ["stage"],
    sourceTypes: ["support"],
  }).sort(comparePItems);

  return (
    <>
      <div className={styles.bank} ref={drop}>
        <div className={styles.bankInner}>
          {signatureItems.concat(nonSignatureItems).map((item) => (
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
