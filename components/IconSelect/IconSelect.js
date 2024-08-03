import Image from "next/image";
import styles from "./IconSelect.module.scss";

export default function IconSelect({ options, selected, onChange }) {
  return (
    <div className={styles.container}>
      {options.map(({ id, iconSrc, alt }) => (
        <button
          key={id}
          className={`${styles.option} ${
            selected === id ? styles.selected : ""
          }`}
          onClick={() => onChange(id)}
        >
          <div className={styles.imageWrapper}>
            <Image src={iconSrc} fill alt={alt} sizes="2.5em" />
          </div>
        </button>
      ))}
    </div>
  );
}
