// Konfigurasi Rank Mobile Legends sesuai urutan hierarki (Index = bobot/harga dasar)
export const ML_RANKS = [
    'Warrior I', 'Warrior II', 'Warrior III',
    'Elite I', 'Elite II', 'Elite III',
    'Master I', 'Master II', 'Master III', 'Master IV',
    'Grandmaster I', 'Grandmaster II', 'Grandmaster III', 'Grandmaster IV', 'Grandmaster V',
    'Epic I', 'Epic II', 'Epic III', 'Epic IV', 'Epic V',
    'Legend I', 'Legend II', 'Legend III', 'Legend IV', 'Legend V',
    'Mythic', 'Mythical Honor', 'Mythical Glory', 'Mythical Immortal'
  ] as const;
  
  export type MLRank = typeof ML_RANKS[number];