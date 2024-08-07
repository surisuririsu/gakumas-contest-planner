const RARITY_VALUES = {
  N: 0,
  T: 1,
  R: 2,
  SR: 3,
  SSR: 4,
};

const SOURCE_TYPE_VALUES = {
  produce: 0,
  pIdol: 1,
  support: 2,
};

const PLAN_VALUES = {
  free: 0,
  sense: 1,
  logic: 2,
};

const TYPE_VALUES = {
  trouble: 0,
  active: 1,
  mental: 2,
};

export function comparePItems(a, b) {
  if (a.rarity != b.rarity) {
    return RARITY_VALUES[a.rarity] - RARITY_VALUES[b.rarity];
  }
  if (a.sourceType != b.sourceType) {
    return SOURCE_TYPE_VALUES[a.sourceType] - SOURCE_TYPE_VALUES[b.sourceType];
  }
  if (a.plan != b.plan) {
    return PLAN_VALUES[a.plan] - PLAN_VALUES[b.plan];
  }
  if (a.pIdolId != b.pIdolId) {
    return a.pIdolId - b.pIdolId;
  }
  return 0;
}

export function compareSkillCards(a, b) {
  if (a.rarity != b.rarity) {
    return RARITY_VALUES[a.rarity] - RARITY_VALUES[b.rarity];
  }
  if (a.sourceType != b.sourceType) {
    return SOURCE_TYPE_VALUES[a.sourceType] - SOURCE_TYPE_VALUES[b.sourceType];
  }
  if (a.unlockPlv != b.unlockPlv) {
    return a.unlockPlv - b.unlockPlv;
  }
  if (a.plan != b.plan) {
    return PLAN_VALUES[a.plan] - PLAN_VALUES[b.plan];
  }
  if (a.pIdolId != b.pIdolId) {
    return a.pIdolId - b.pIdolId;
  }
  if (a.type != b.type) {
    return TYPE_VALUES[a.type] - TYPE_VALUES[b.type];
  }
  return 0;
}
