"use client";
import Image from "next/image";
import { IDOLS } from "@/constants/idols";
import styles from "./IdolPicker.module.scss";

export default function IdolPicker({ onPickIdol }) {
  return (
    <div className={styles.container}>
      {IDOLS.map(({ id, alias, title, name, plan }) => (
        <div key={id} className={styles.idol} onClick={() => onPickIdol(id)}>
          <Image
            className={styles.plan}
            src={`/plans/${plan}.png`}
            width={40}
            height={40}
            alt=""
          />
          <div className={styles.content}>
            <span className={styles.title}>{title}</span>
            <span className={styles.name}>{name}</span>
          </div>
          <Image src={`/idols/${alias}.png`} width={180} height={320} alt="" />
        </div>
      ))}
    </div>
  );
}
