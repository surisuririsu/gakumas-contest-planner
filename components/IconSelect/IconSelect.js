import Image from "next/image";
import styles from "./IconSelect.module.scss";

export default function IconSelect({ options, selected, onChange }) {
  return (
    <div className={styles.container}>
      {options.map(({ alias, iconSrc }) => (
        <div
          key={alias}
          className={`${styles.option} ${
            selected === alias ? styles.selected : ""
          }`}
        >
          <div className={styles.imageWrapper}>
            <Image
              src={iconSrc}
              fill
              alt=""
              onClick={() => onChange(alias)}
              sizes="2.5em"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
