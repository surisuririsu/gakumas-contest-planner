import Image from "next/image";
import { useDrag } from "react-dnd";
import styles from "./CardBank.module.scss";

export default function CardBankElement({ card, setFocusedName }) {
  const [, drag] = useDrag(() => ({
    type: "CARD",
    item: { ...card, fromIndex: [-1, 0] },
  }));

  return (
    <div key={card.id} className={styles.card} ref={drag}>
      <Image
        src={`/cards/${card.alias}.png`}
        width={80}
        height={80}
        alt={card.name}
        onMouseEnter={() => setFocusedName(card.name)}
        onMouseLeave={() => setFocusedName(" ")}
      />
    </div>
  );
}
