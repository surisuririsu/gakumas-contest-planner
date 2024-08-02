"use client";
import { useContext, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import CardBank from "@/components/CardBank";
import CardList from "@/components/CardList";
import CostRanges from "@/components/CostRanges";
import DefaultCards from "@/components/DefaultCards";
import ItemBank from "@/components/ItemBank";
import ItemList from "@/components/ItemList";
import Simulator from "@/components/Simulator";
import LoadoutContext from "@/contexts/LoadoutContext";
import styles from "./Configurator.module.scss";

export default function Configurator() {
  const { items, cardGroups } = useContext(LoadoutContext);
  const [activeBank, setActiveBank] = useState("CARD");
  const [activeSubTool, setActiveSubTool] = useState(null);

  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

  return (
    <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
      <div className={styles.configurator}>
        <div className={styles.loadout}>
          <ItemList items={items} />
          {cardGroups.map((cards, index) => (
            <CardList
              key={`${index}:${cards.join("-")}`}
              groupIndex={index}
              cards={cards}
            />
          ))}
          <div className={styles.expanders}>
            <div className={styles.expanderButtons}>
              <button
                onClick={() =>
                  setActiveSubTool(
                    activeSubTool == "costRanges" ? null : "costRanges"
                  )
                }
              >
                コスト範囲
              </button>
              <button
                onClick={() =>
                  setActiveSubTool(
                    activeSubTool == "simulator" ? null : "simulator"
                  )
                }
              >
                シミュレーター
                <br />
                (かふぇもっとさん作)
              </button>
              <button
                onClick={() =>
                  setActiveSubTool(
                    activeSubTool == "defaultCards" ? null : "defaultCards"
                  )
                }
              >
                基本カード
              </button>
            </div>
            {activeSubTool == "costRanges" && <CostRanges />}
            {activeSubTool == "simulator" && <Simulator />}
            {activeSubTool == "defaultCards" && <DefaultCards />}
          </div>
        </div>
        <div className={styles.banks}>
          <div className={styles.bankTabs}>
            <button
              className={activeBank === "CARD" ? styles.active : ""}
              onClick={() => setActiveBank("CARD")}
            >
              スキルカード
            </button>
            <button
              className={activeBank === "PITEM" ? styles.active : ""}
              onClick={() => setActiveBank("PITEM")}
            >
              Pアイテム
            </button>
          </div>
          {activeBank === "PITEM" && <ItemBank />}
          {activeBank === "CARD" && <CardBank />}
        </div>
      </div>
    </DndProvider>
  );
}
