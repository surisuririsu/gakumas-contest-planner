import { useState } from "react";
import Image from "next/image";
import { CARDS_BY_ID } from "@/constants/cards";
import { IDOLS_BY_ID } from "@/constants/idols";
import { ITEMS_BY_ID } from "@/constants/items";
import styles from "./Configurator.module.scss";

export default function Configurator({ idolId, onClickIdol }) {
  const [items, setItems] = useState([1, 1, 1, 1]);
  const [mainCards, setMainCards] = useState([1, 1, 1, 1, 1, 1]);
  const [subCards, setsubCards] = useState([1, 1, 1, 1, 1, 1]);
  const { alias, name, plan, title } = IDOLS_BY_ID[idolId];
  return (
    <div className={styles.configurator}>
      <div className={styles.idol} onClick={onClickIdol}>
        <Image src={`/idols/${alias}.png`} width={45} height={80} alt="" />
        <div className={styles.text}>
          <div>【{title}】</div>
          <div className={styles.name}>{name}</div>
        </div>
        <Image src={`/plans/${plan}.png`} width={40} height={40} alt="" />
      </div>
      <div className={styles.items}>
        {items.map((itemId) => {
          const item = ITEMS_BY_ID[itemId];
          return (
            <div>
              <Image
                src={`/items/${item ? item.alias : "placeholder"}.png`}
                width={60}
                height={60}
                alt=""
              />
            </div>
          );
        })}
      </div>
      <div className={styles.cards}>
        <div className={styles.main}>
          {mainCards.map((cardId) => {
            const card = CARDS_BY_ID[cardId];
            return (
              <div>
                <Image
                  src={`/cards/${card ? card.alias : "placeholder"}.png`}
                  width={80}
                  height={80}
                  alt=""
                />
              </div>
            );
          })}
        </div>
        <div className={styles.sub}>
          {subCards.map((cardId) => {
            const card = CARDS_BY_ID[cardId];
            return (
              <div>
                <Image
                  src={`/cards/${card ? card.alias : "placeholder"}.png`}
                  width={80}
                  height={80}
                  alt=""
                />
              </div>
            );
          })}
        </div>
      </div>
      <hr />
    </div>
  );
}
