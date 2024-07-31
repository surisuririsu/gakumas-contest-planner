import { PItems, SkillCards } from "gakumas-data";
import { ContestData } from "gakumas_contest_simulator/scripts/simulator/data/contestData";
import { PIdolData as SimulatorPIdols } from "gakumas_contest_simulator/scripts/simulator/data/pIdolData";
import { PItemData as SimulatorPItems } from "gakumas_contest_simulator/scripts/simulator/data/pItemData";
import { SkillCardData as SimulatorSkillCards } from "gakumas_contest_simulator/scripts/simulator/data/skillCardData";

export const CONTEST_STAGES = ContestData.getAll().reduce((acc, cur) => {
  const stages = cur.stages.map((stage, stageIdx) => ({
    id: `${cur.id}:${stageIdx}`,
    name: `${cur.name} ${stage.name}`,
    criteria: cur.criteria,
    plan: stage.plan,
  }));
  return stages.concat(acc);
}, []);

const SIMULATOR_ITEM_IDS_BY_NAME = SimulatorPItems.getAll().reduce(
  (acc, cur) => ({
    ...acc,
    [cur.name]: cur.id,
  }),
  {}
);

const SIMULATOR_CARD_IDS_BY_NAME = SimulatorSkillCards.getAll().reduce(
  (acc, cur) => ({
    ...acc,
    [cur.name]: cur.id,
  }),
  {}
);

const SIMULATOR_P_IDOL_IDS_BY_SIMULATOR_CARD_ID =
  SimulatorPIdols.getAll().reduce(
    (acc, cur) => ({
      ...acc,
      [cur.unique_skillCard_id]: cur.id,
      [cur.unique_skillCard_id + 1]: cur.id,
    }),
    {}
  );

const SIMULATOR_ITEM_NAME_FIXUPS = {
  140: "コール＆レスポンス",
  141: "コール＆レスポンス+",
  148: "２００％スマイル",
  149: "２００％スマイル+",
  280: "ＰＯＷ！",
  281: "ＰＯＷ！+",
};

const SIMULATOR_ITEM_MAP = PItems.getAll().reduce((acc, cur) => {
  acc[cur.id] = SIMULATOR_ITEM_IDS_BY_NAME[cur.name] || -1;
  return acc;
}, {});

const SIMULATOR_CARD_MAP = SkillCards.getAll().reduce((acc, cur) => {
  acc[cur.id] =
    SIMULATOR_CARD_IDS_BY_NAME[
      SIMULATOR_ITEM_NAME_FIXUPS[cur.id] || cur.name
    ] || -1;
  return acc;
}, {});

const MISMATCHED_ITEMS = PItems.getAll().filter(
  (item) => SIMULATOR_ITEM_MAP[item.id] === -1
);
const MISMATCHED_CARDS = SkillCards.getAll().filter(
  (card) => SIMULATOR_CARD_MAP[card.id] === -1
);

const SIMULATOR_URL_BASE =
  "https://katabami83.github.io/gakumas_contest_simulator";

export function generateSimulatorUrl(items, cardGroups, stage, status) {
  const mainIdolCard = cardGroups[0]
    .map((cid) => SkillCards.getById(cid))
    .find((c) => c?.sourceType == "pIdol");
  const subIdolCard = cardGroups[1]
    .map((cid) => SkillCards.getById(cid))
    .find((c) => c?.sourceType == "pIdol");
  const mainIdolCardSimulatorId = SIMULATOR_CARD_MAP[mainIdolCard?.id] || -1;
  const subIdolCardSimulatorId = SIMULATOR_CARD_MAP[subIdolCard?.id] || -1;

  const itemSimulatorIds = items
    .filter((i) => PItems.getById(i) && PItems.getById(i).sourceType != "pIdol")
    .map((i) => SIMULATOR_ITEM_MAP[i] || -1);

  const cardSimulatorIds = cardGroups
    .slice(0, 2)
    .map((cg, idx) =>
      [idx ? subIdolCardSimulatorId : mainIdolCardSimulatorId].concat(
        cg
          .filter(
            (cid) =>
              SkillCards.getById(cid) &&
              SkillCards.getById(cid).sourceType != "pIdol"
          )
          .map((cid) => SIMULATOR_CARD_MAP[cid] || -1)
      )
    );

  const simulatorParams = new URLSearchParams();
  simulatorParams.set("contest_stage", stage);
  simulatorParams.set(
    "p_idol",
    `${
      SIMULATOR_P_IDOL_IDS_BY_SIMULATOR_CARD_ID[mainIdolCardSimulatorId] || -1
    }:${
      SIMULATOR_P_IDOL_IDS_BY_SIMULATOR_CARD_ID[subIdolCardSimulatorId] || -1
    }`
  );
  simulatorParams.set("status", status.join(":"));
  simulatorParams.set("p_items", itemSimulatorIds.join(":"));
  simulatorParams.set(
    "cards",
    cardSimulatorIds.map((cg) => cg.join(":")).join("_")
  );

  return `${SIMULATOR_URL_BASE}/?${simulatorParams.toString()}`;
}

if (MISMATCHED_ITEMS.length) console.log("Mismatched items", MISMATCHED_ITEMS);
if (MISMATCHED_CARDS.length) console.log("Mismatched cards", MISMATCHED_CARDS);
