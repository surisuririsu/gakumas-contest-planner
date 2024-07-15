import { PItems, SkillCards } from "gakumas-data";
import { PItemData as SimulatorPItems } from "gakumas_contest_simulator/scripts/simulator/data/pItemData";
import { SkillCardData as SimulatorSkillCards } from "gakumas_contest_simulator/scripts/simulator/data/skillCardData";

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

const SIMULATOR_ITEM_NAME_FIXUPS = {
  140: "コール＆レスポンス",
  141: "コール＆レスポンス+",
  148: "２００％スマイル",
  149: "２００％スマイル+",
  280: "ＰＯＷ！",
  281: "ＰＯＷ！+",
};

export const SIMULATOR_ITEM_MAP = PItems.getAll().reduce((acc, cur) => {
  acc[cur.id] = SIMULATOR_ITEM_IDS_BY_NAME[cur.name] || -1;
  return acc;
}, {});

export const SIMULATOR_CARD_MAP = SkillCards.getAll().reduce((acc, cur) => {
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

if (MISMATCHED_ITEMS.length) console.log("Mismatched items", MISMATCHED_ITEMS);
if (MISMATCHED_CARDS.length) console.log("Mismatched cards", MISMATCHED_CARDS);
