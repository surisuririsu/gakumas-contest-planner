import { useContext } from "react";
import LoadoutContext from "@/contexts/LoadoutContext";
import { CARDS_BY_ID, COST_BY_RARITY } from "@/constants/cards";
import styles from "./CardList.module.scss";

export default function DeleteCardGroupButton({ groupIndex, cards }) {
  const { cardGroups, insertCardGroup, deleteCardGroup, swapCardGroups } =
    useContext(LoadoutContext);
  const cost = cards.reduce(
    (acc, cur) => acc + (COST_BY_RARITY[CARDS_BY_ID[cur]?.rarity] || 0),
    0
  );

  return (
    <div className={styles.sub}>
      <div>Estimated card cost: {cost}</div>
      <div className={styles.buttonGroup}>
        <button
          className={styles.addButton}
          onClick={() => insertCardGroup(groupIndex + 1)}
        >
          ➕
        </button>
        <button
          className={styles.moveButton}
          onClick={() => swapCardGroups(groupIndex, groupIndex - 1)}
          disabled={groupIndex < 1}
        >
          ⬆️
        </button>
        <button
          className={styles.moveButton}
          onClick={() => swapCardGroups(groupIndex, groupIndex + 1)}
          disabled={groupIndex >= cardGroups.length - 1}
        >
          ⬇️
        </button>
        <button
          className={styles.deleteButton}
          onClick={() => deleteCardGroup(groupIndex)}
          disabled={cardGroups.length < 2}
        >
          🗑️
        </button>
      </div>
    </div>
  );
}
