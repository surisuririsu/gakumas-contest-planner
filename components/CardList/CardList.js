import CardListElement from "./CardListElement";
import CardListSub from "./CardListSub";
import styles from "./CardList.module.scss";

export default function CardList({ groupIndex, cards }) {
  return (
    <div>
      <div className={styles.list}>
        {cards.map((cardId, index) => (
          <CardListElement
            key={`${index}_${cardId}`}
            groupIndex={groupIndex}
            index={index}
            cardId={cardId}
          />
        ))}
      </div>
      <CardListSub groupIndex={groupIndex} cards={cards} />
    </div>
  );
}
