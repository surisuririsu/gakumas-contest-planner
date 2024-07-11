import Item from "@/components/Item";
import styles from "./ItemList.module.scss";

export default function ItemList({ items }) {
  return (
    <div className={styles.list}>
      {items.map((itemId, index) => (
        <Item key={`${index}_${itemId}`} itemId={itemId} index={index} />
      ))}
    </div>
  );
}
