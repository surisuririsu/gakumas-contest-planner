import Image from "next/image";
import { useDrag } from "react-dnd";
import styles from "./ItemBank.module.scss";

export default function ItemBankElement({ item, setFocusedName }) {
  const [, drag] = useDrag(() => ({
    type: "PITEM",
    item: { ...item, fromIndex: -1 },
  }));

  return (
    <div key={item.id} className={styles.item} ref={drag}>
      <Image
        src={`/items/${item.alias}.png`}
        width={60}
        height={60}
        alt={item.name}
        onMouseEnter={() => setFocusedName(item.name)}
        onMouseLeave={() => setFocusedName("")}
      />
    </div>
  );
}
