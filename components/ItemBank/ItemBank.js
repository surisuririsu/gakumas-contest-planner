import { useState } from "react";
import Image from "next/image";
import { ITEMS } from "@/constants/items";
import styles from "./ItemBank.module.scss";

export default function ItemBank({ plan, idol }) {
  const [focusedName, setFocusedName] = useState("");
  return (
    <div>
      <div className={styles.bank}>
        {ITEMS.map(({ id, alias, name }) => (
          <div key={id} className={styles.item}>
            <Image
              src={`/items/${alias}.png`}
              width={60}
              height={60}
              alt={name}
              onMouseEnter={() => setFocusedName(name)}
              onMouseLeave={() => setFocusedName("")}
            />
          </div>
        ))}
      </div>
      <div className={styles.name}>{focusedName}</div>
    </div>
  );
}
