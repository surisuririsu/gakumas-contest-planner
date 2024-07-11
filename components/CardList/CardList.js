import Card from "@/components/Card";
import CardListSub from "./CardListSub";
import styles from "./CardList.module.scss";

export default function CardList({ groupIndex, cards }) {
  return (
    <div>
      <div className={styles.list}>
        {cards.map((cardId, index) => (
          <Card
            key={`${index}_${cardId}`}
            cardId={cardId}
            index={[groupIndex, index]}
          />
        ))}
      </div>
      <CardListSub groupIndex={groupIndex} cards={cards} />
    </div>
  );
}
