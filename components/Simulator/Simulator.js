import Image from "next/image";
import { useContext, useState } from "react";
import LoadoutContext from "@/contexts/LoadoutContext";
import { CONTEST_STAGES } from "@/constants/contestStages";
import { generateSimulatorUrl } from "@/utils/simulator";
import styles from "./Simulator.module.scss";

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
      <button className={styles.link} onClick={() => setVisible(true)}>
        Simulator (by かふぇもっと)
      </button>
    );
  }

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
