export const IDOLS = [
  {
    id: 1,
    alias: "saki_boomboompow",
    title: "Boom Boom Pow",
    name: "花海 咲季",
    plan: "logic",
  },
  {
    id: 2,
    alias: "kotone_sekaiichikawaiiwatashi",
    title: "世界一可愛い私",
    name: "藤田 ことね",
    plan: "logic",
  },
];

export const IDOLS_BY_ID = IDOLS.reduce(
  (acc, cur) => ({
    ...acc,
    [cur.id]: cur,
  }),
  {}
);
