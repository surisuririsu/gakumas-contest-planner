import Image from "next/image";
import { useContext, useState } from "react";
import LoadoutContext from "@/contexts/LoadoutContext";
import { CONTEST_STAGES, generateSimulatorUrl } from "@/utils/simulator";
import styles from "./Simulator.module.scss";

export default function Simulator() {
  const { items, cardGroups } = useContext(LoadoutContext);
  const [stage, setStage] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const [vocal, setVocal] = useState(null);
  const [dance, setDance] = useState(null);
  const [visual, setVisual] = useState(null);
  const [hp, setHP] = useState(null);
  const selectedStage = CONTEST_STAGES.find((s) => s.id == stage);

  const simulatorUrl = generateSimulatorUrl(items, cardGroups, stage, [
    vocal,
    dance,
    visual,
    hp,
  ]);

  return (
    <>
      <div className={styles.select}>
        <button
          onClick={() => setShowOptions(!showOptions)}
          className={styles.option}
        >
          {selectedStage ? (
            <>
              ステージ: {selectedStage.name}
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
            <div className={styles.placeholder}>ステージ選択</div>
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
        <input
          placeholder="ボーカル"
          onChange={(e) => setVocal(e.target.value)}
        />
        <input
          placeholder="ダンス"
          onChange={(e) => setDance(e.target.value)}
        />
        <input
          placeholder="ビジュアル"
          onChange={(e) => setVisual(e.target.value)}
        />
        <input placeholder="体力" onChange={(e) => setHP(e.target.value)} />
      </div>
      {stage && vocal && dance && visual && hp && (
        <a className={styles.link} href={simulatorUrl} target="_blank">
          シミュレーターへGO!
        </a>
      )}
    </>
  );
}
