import CardListElement from "./CardListElement";
import styles from "./CardList.module.scss";

export default function CardList({ groupIndex, cards, changeCard }) {
  return (
    <div className={styles.list}>
      {cards.map((cardId, index) => (
        <CardListElement
          key={`${index}_${cardId}`}
          groupIndex={groupIndex}
          index={index}
          cardId={cardId}
          changeCard={changeCard}
        />
      ))}
    </div>
  );
}
