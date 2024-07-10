import { useContext, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import CardBank from "@/components/CardBank";
import CardList from "@/components/CardList";
import ItemBank from "@/components/ItemBank";
import ItemList from "@/components/ItemList";
import IdolContext from "@/contexts/IdolContext";
import styles from "./Configurator.module.scss";

export default function Configurator() {
  const { items, cardGroups } = useContext(IdolContext);
  const [activeBank, setActiveBank] = useState("CARD");

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.configurator}>
        <div className={styles.section}>
          <ItemList items={items} />
          {cardGroups.map((cards, index) => (
            <CardList
              key={`${index}:${cards.join("-")}`}
              groupIndex={index}
              cards={cards}
            />
          ))}
        </div>
        <div className={`${styles.section} ${styles.banks}`}>
          <div className={styles.bankTabs}>
            <a
              className={activeBank === "CARD" ? styles.active : ""}
              onClick={() => setActiveBank("CARD")}
            >
              Skill Cards
            </a>
            <a
              className={activeBank === "PITEM" ? styles.active : ""}
              onClick={() => setActiveBank("PITEM")}
            >
              P Items
            </a>
          </div>
          {activeBank === "PITEM" && <ItemBank />}
          {activeBank === "CARD" && <CardBank />}
        </div>
      </div>
    </DndProvider>
  );
}
