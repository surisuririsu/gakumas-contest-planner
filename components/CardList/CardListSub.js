import { useContext } from "react";
import {
  FaCirclePlus,
  FaCircleArrowUp,
  FaCircleArrowDown,
  FaCircleXmark,
} from "react-icons/fa6";
import { SkillCards } from "gakumas-data";
import LoadoutContext from "@/contexts/LoadoutContext";
import styles from "./CardList.module.scss";

export default function DeleteCardGroupButton({ groupIndex, cards }) {
  const { cardGroups, insertCardGroup, deleteCardGroup, swapCardGroups } =
    useContext(LoadoutContext);

  const cost = cards
    .filter((id) => id)
    .map(SkillCards.getById)
    .reduce(
      (acc, cur) => acc + (cur.sourceType == "pIdol" ? 0 : cur.contestPower),
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
          <FaCirclePlus />
        </button>
        <button
          className={styles.moveButton}
          onClick={() => swapCardGroups(groupIndex, groupIndex - 1)}
          disabled={groupIndex < 1}
        >
          <FaCircleArrowUp />
        </button>
        <button
          className={styles.moveButton}
          onClick={() => swapCardGroups(groupIndex, groupIndex + 1)}
          disabled={groupIndex >= cardGroups.length - 1}
        >
          <FaCircleArrowDown />
        </button>
        <button
          className={styles.deleteButton}
          onClick={() => deleteCardGroup(groupIndex)}
          disabled={cardGroups.length < 2}
        >
          <FaCircleXmark />
        </button>
      </div>
    </div>
  );
}
