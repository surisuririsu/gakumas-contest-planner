import { ContestData } from "gakumas_contest_simulator/scripts/simulator/data/contestData";

export const CONTEST_STAGES = ContestData.getAll().reduce((acc, cur) => {
  const stages = cur.stages.map((stage, stageIdx) => ({
    id: `${cur.id}:${stageIdx}`,
    name: `${cur.name} ${stage.name}`,
    criteria: cur.criteria,
    plan: stage.plan,
  }));
  return stages.concat(acc);
}, []);
