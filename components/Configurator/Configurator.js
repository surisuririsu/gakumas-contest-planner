import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import CardBank from "@/components/CardBank";
import CardList from "@/components/CardList";
import ItemBank from "@/components/ItemBank";
import ItemList from "@/components/ItemList";
import styles from "./Configurator.module.scss";

export default function Configurator({ plan, idol }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialItems = searchParams.get("items") || "0-0-0-0";
  const initialCards = searchParams.get("cards") || "0-0-0-0-0-0";

  const [activeBank, setActiveBank] = useState("CARD");
  const [items, setItems] = useState(
    initialItems.split("-").map((n) => parseInt(n, 10))
  );
  // const [cardGroups, setCardGroups] = useState([
  //   initialCards.split("-").map((n) => parseInt(n, 10)),
  // ]);
  const [cardGroups, setCardGroups] = useState(
    initialCards
      .split("_")
      .map((group) => group.split("-").map((n) => parseInt(n, 10)))
  );

  useEffect(() => {
    router.replace(`/?${createQueryString("items", items.join("-"))}`);
  }, [items]);

  useEffect(() => {
    router.replace(
      `/?${createQueryString(
        "cards",
        cardGroups.map((group) => group.join("-")).join("_")
      )}`
    );
  }, [cardGroups]);

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const handleChangeItem = (index, itemId) => {
    setItems((currentItems) => {
      const newItems = [...currentItems];
      newItems[index] = itemId;
      return newItems;
    });
  };

  const handleChangeCard = (index, cardId) => {
    setCardGroups((currentCards) => {
      const newCards = [...currentCards];
      newCards[index[0]][index[1]] = cardId;
      return newCards;
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.configurator}>
        <div className={styles.section}>
          <ItemList items={items} changeItem={handleChangeItem} />
          {cardGroups.map((cards, index) => (
            <CardList
              key={index}
              groupIndex={index}
              cards={cards}
              changeCard={handleChangeCard}
            />
          ))}
        </div>
        <div className={styles.section}>
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
          {activeBank === "PITEM" && (
            <ItemBank plan={plan} idol={idol} changeItem={handleChangeItem} />
          )}
          {activeBank === "CARD" && (
            <CardBank plan={plan} idol={idol} changeCard={handleChangeCard} />
          )}
        </div>
      </div>
    </DndProvider>
  );
}
