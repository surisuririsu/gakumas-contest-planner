export const CARDS = [
  {
    id: 1,
    alias: "appealnokihon",
    name: "アピールの基本",
  },
  {
    id: 2,
    alias: "appealnokihon_plus",
    name: "アピールの基本+",
  },
];

export const CARDS_BY_ID = CARDS.reduce(
  (acc, cur) => ({
    ...acc,
    [cur.id]: cur,
  }),
  {}
);
