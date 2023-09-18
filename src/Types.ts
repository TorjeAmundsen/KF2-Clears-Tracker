export type AchievementData = {
  playerstats: {
    achievements: [
      {
        apiname: string;
        achieved: number;
        unlocktime: number;
      }
    ];
    gameName: string;
    steamID: string;
    success: boolean;
  };
};

export type FlattenedData = {
  name: string;
  hoeClears: number;
  achievements: {
    mapName: string;
    cleared: boolean;
    clearTime: Date;
    index: number;
  }[];
};
