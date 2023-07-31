export const times = (x, callback) => {
  const results = [];

  for (let i = 0; i < x; i++) {
    results.push(callback(i));
  }

  return results;
};

export const calculatePlayerUpperScore = (player) => {
  const MIN_SCORE_FOR_BONUS = 63;
  const BONUS_POINTS = 35;
  const scores = Object.values(player.upperSectionScores);
  const sum = scores.reduce((total, n) => total + n, 0);

  return sum >= MIN_SCORE_FOR_BONUS ? sum + BONUS_POINTS : sum;
};

export const calculatePlayerLowerScore = (player) => {
  const { yahtzeeBonus = 0, ...rest } = player.lowerSectionScores;
  const scores = Object.values(rest);
  const sum = scores.reduce((total, n) => total + n, 0);

  return sum + yahtzeeBonus * 100;
};

export const calculatePlayerGrandTotal = (player) => {
  return calculatePlayerUpperScore(player) + calculatePlayerLowerScore(player);
};
