import Image from "next/image";
import { IDOLS_BY_ID } from "@/constants/idols";
import styles from "./Configurator.module.scss";

export default function Configurator({ idolId, onClickIdol }) {
  const { alias, name, plan, title } = IDOLS_BY_ID[idolId];
  return (
    <div className={styles.configurator}>
      <div className={styles.idol} onClick={onClickIdol}>
        <Image src={`/idols/${alias}.png`} width={45} height={80} alt="" />
        <div>
          <div>【{title}】</div>
          <div className={styles.name}>{name}</div>
        </div>
        <Image src={`/plans/${plan}.png`} width={40} height={40} alt="" />
      </div>
      <div className={styles.items}></div>
      <div className={styles.skills}></div>
    </div>
  );
}
