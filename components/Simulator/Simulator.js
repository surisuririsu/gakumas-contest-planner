import Image from "next/image";
import { useContext, useState } from "react";
import { PItems } from "gakumas-data";
import LoadoutContext from "@/contexts/LoadoutContext";
import { CONTEST_STAGES } from "@/constants/contestStages";
import { CARDS_BY_ID } from "@/constants/cards";
import { SIMULATOR_ITEM_MAP } from "@/utils/simulator";
import styles from "./Simulator.module.scss";

const SIMULATOR_URL_BASE =
  "https://katabami83.github.io/gakumas_contest_simulator";

export default function Simulator() {
  const { items, cardGroups } = useContext(LoadoutContext);
  const [visible, setVisible] = useState(false);
  const [stage, setStage] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const [vocal, setVocal] = useState(null);
  const [dance, setDance] = useState(null);
  const [visual, setVisual] = useState(null);
  const [hp, setHP] = useState(null);
  const selectedStage = CONTEST_STAGES.find((s) => s.id == stage);

  if (cardGroups.length < 2) return null;
  if (!visible) {
    return (
      <a className={styles.link} onClick={() => setVisible(true)}>
        Simulator (by かふぇもっと)
      </a>
    );
  }

  const mainIdolCard = cardGroups[0]
    .map((cid) => CARDS_BY_ID[cid])
    .find((c) => c?.rarity?.startsWith("P"));
  const subIdolCard = cardGroups[1]
    .map((cid) => CARDS_BY_ID[cid])
    .find((c) => c?.rarity?.startsWith("P"));

  const itemSimulatorIds = items
    .filter((i) => PItems.getById(i) && PItems.getById(i).sourceType != "pIdol")
    .map((i) => SIMULATOR_ITEM_MAP[i] || -1);

  const cardSimulatorIds = cardGroups
    .slice(0, 2)
    .map((cg, idx) =>
      [(idx ? subIdolCard : mainIdolCard)?.simulatorId].concat(
        cg
          .filter(
            (cid) =>
              CARDS_BY_ID[cid] && !CARDS_BY_ID[cid].rarity?.startsWith("P")
          )
          .map((cid) => CARDS_BY_ID[cid].simulatorId || -1)
      )
    );

  const simulatorParams = new URLSearchParams();
  simulatorParams.set("contest_stage", stage);
  simulatorParams.set(
    "p_idol",
    `${mainIdolCard?.simulatorPIdolId || -1}:${
      subIdolCard?.simulatorPIdolId || -1
    }`
  );
  simulatorParams.set("status", [vocal, dance, visual, hp].join(":"));
  simulatorParams.set("p_items", itemSimulatorIds.join(":"));
  simulatorParams.set(
    "cards",
    cardSimulatorIds.map((cg) => cg.join(":")).join("_")
  );
  const simulatorUrl = `${SIMULATOR_URL_BASE}/?${simulatorParams.toString()}`;

  return (
    <>
      <div className={styles.select}>
        <button
          onClick={() => setShowOptions(!showOptions)}
          className={styles.option}
        >
          {selectedStage ? (
            <>
              Stage: {selectedStage.name}
              <div className={styles.imageWrapper}>
                <Image
                  src={`/plans/${selectedStage.plan}.png`}
                  fill
                  alt=""
                  sizes="1.5em"
                />
              </div>
              <div className={styles.status}>
                {Object.values(selectedStage.criteria).map((c, i) => (
                  <div key={i} style={{ flex: c }}></div>
                ))}
              </div>
            </>
          ) : (
            <div className={styles.placeholder}>Select stage</div>
          )}
        </button>

        {showOptions && (
          <>
            {CONTEST_STAGES.map(({ id, name, criteria, plan }) => (
              <button
                key={id}
                className={styles.option}
                value={id}
                onClick={() => {
                  setStage(id);
                  setShowOptions(false);
                }}
              >
                {name}
                <div className={styles.imageWrapper}>
                  <Image src={`/plans/${plan}.png`} fill alt="" sizes="1.5em" />
                </div>
                <div className={styles.status}>
                  {Object.values(criteria).map((c, i) => (
                    <div key={i} style={{ flex: c }}></div>
                  ))}
                </div>
              </button>
            ))}
          </>
        )}
      </div>
      <div className={styles.statusInputs}>
        <input placeholder="Vocal" onChange={(e) => setVocal(e.target.value)} />
        <input placeholder="Dance" onChange={(e) => setDance(e.target.value)} />
        <input
          placeholder="Visual"
          onChange={(e) => setVisual(e.target.value)}
        />
        <input placeholder="HP" onChange={(e) => setHP(e.target.value)} />
      </div>
      {stage && vocal && dance && visual && hp && (
        <a className={styles.link} href={simulatorUrl} target="_blank">
          Go to simulator
        </a>
      )}
    </>
  );
}
