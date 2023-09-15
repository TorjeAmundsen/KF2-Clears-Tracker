import { useEffect, useState } from "react";
import { hellOnEarth } from "./Achievements";
import "./App.css";
import Map from "./Map";
import SortingOptions from "./SortingOptions";

type AchievementData = {
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

type FlattenedData = {
  name: string;
  hoeClears: number;
  achievements: {
    map: string;
    cleared: boolean;
    clearTime: Date;
    index: number;
  }[];
};

const URLS = {
  TORJE: {
    name: "Torje",
    url: "https://torjeamundsen.github.io/kf2-data/torje.json",
  },
  PITI: {
    name: "Piti",
    url: "https://torjeamundsen.github.io/kf2-data/piti.json",
  },
};

const createDateOrZero = (epochInSeconds: number): Date => {
  return new Date(epochInSeconds * 1000);
};

const flattenData = ({ playerstats }: AchievementData, name: string): FlattenedData => {
  const achievementData = [];
  let clears = 0;
  for (const [, value] of Object.entries(hellOnEarth)) {
    const cleared = playerstats.achievements[value.index].achieved === 1;
    const data = {
      map: value.name,
      cleared: cleared,
      clearTime: createDateOrZero(playerstats.achievements[value.index].unlocktime),
      index: value.index,
    };
    achievementData.push(data);
    if (cleared) clears++;
  }
  return {
    name: name,
    hoeClears: clears,
    achievements: achievementData,
  };
};

export default function App() {
  const [playerData, setPlayerData] = useState<FlattenedData[]>([]);
  /* const [hideClearedMaps, setHideClearedMaps] = useState(false); */

  const fetchData = async (url: string, name: string) => {
    const response = await fetch(url);
    const data = await response.json();
    setPlayerData((prev) => [...prev, flattenData(data, name)]);
  };

  const sortPlayerData = (
    attribute: "map" | "cleared" | "clearTime" | "index",
    direction: number,
    data: FlattenedData[]
  ) => {
    const dataCopy = [...data];
    for (const player of dataCopy) {
      player.achievements.sort((a, b) => {
        if (a[attribute] === b[attribute]) return 0;
        return a[attribute] > b[attribute] ? direction : -direction;
      });
    }
    setPlayerData(dataCopy);
  };

  useEffect(() => {
    setPlayerData([]);
    for (const [, player] of Object.entries(URLS)) {
      fetchData(player.url, player.name);
    }
  }, []);

  return (
    <>
      <SortingOptions sortPlayerData={sortPlayerData} playerData={playerData} />
      {playerData.map((player) => (
        <div className="player-container">
          <div className="player-header">
            <div>{player.name}</div>
            <div>
              Hell on Earth: {player.hoeClears} / {player.achievements.length} (
              {((player.hoeClears / player.achievements.length) * 100).toFixed(0)}%)
            </div>
          </div>
          {player.achievements.map(({ map, cleared, clearTime }) => {
            /* if (hideClearedMaps && !cleared) return; */
            return <Map map={map} cleared={cleared} clearTime={clearTime} />;
          })}
        </div>
      ))}
    </>
  );
}
