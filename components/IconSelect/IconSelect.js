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
          <Image
            src={iconSrc}
            width={40}
            height={40}
            alt=""
            onClick={() => onChange(alias)}
          />
        </div>
      ))}
    </div>
  );
}
