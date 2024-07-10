import ItemListElement from "./ItemListElement";
import styles from "./ItemList.module.scss";

export default function ItemList({ items }) {
  return (
    <div className={styles.list}>
      {items.map((itemId, index) => (
        <ItemListElement
          key={`${index}_${itemId}`}
          index={index}
          itemId={itemId}
        />
      ))}
    </div>
  );
}
