export const ITEMS = [
  {
    id: 1,
    alias: "bakuonlion",
    name: "ばくおんライオン",
  },
  {
    id: 2,
    alias: "bakuonlion_plus",
    name: "ばくおんライオン+",
  },
];

export const ITEMS_BY_ID = ITEMS.reduce(
  (acc, cur) => ({
    ...acc,
    [cur.id]: cur,
  }),
  {}
);
