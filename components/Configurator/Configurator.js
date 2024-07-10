import { useState } from "react";
import CardList from "@/components/CardList";
import ItemBank from "@/components/ItemBank";
import ItemList from "@/components/ItemList";
import styles from "./Configurator.module.scss";

export default function Configurator({ idolId, onClickIdol }) {
  const [items, setItems] = useState([0, 0, 0, 0]);
  const [cardGroups, setCardGroups] = useState([[0, 0, 0, 0, 0, 0]]);
  return (
    <div className={styles.configurator}>
      <ItemList items={items} />
      {cardGroups.map((cards) => (
        <CardList cards={cards} />
      ))}
      <hr />
      <ItemBank />
    </div>
  );
}
