import { useEffect, useState } from "react";
import { hellOnEarth } from "./Achievements";
import "./App.css";
import Map from "./components/Map";
import SortingOptions from "./components/SortingOptions";
import { AchievementData, FlattenedData, AchievementIndex } from "./Types";

const URLS = [
  {
    name: "Torje",
    steamId: "76561198051501978",
  },
  {
    name: "Piti",
    steamId: "76561198013938871",
  },
];

const createDateOrZero = (epochInSeconds: number): Date => {
  const epochInMs = epochInSeconds * 1000;
  return new Date(epochInMs);
};

const createMapList = (data: FlattenedData[]) => {
  const mapList = [];
  for (const map of data[0].achievements) {
    mapList.push(map.mapName);
  }
  return mapList;
};

const flattenData = ({ playerstats }: AchievementData, name: string): FlattenedData => {
  const achievementData = [];
  let clears = 0;
  for (const map of hellOnEarth) {
    const cleared = playerstats.achievements[map.index].achieved === 1;
    const data = {
      mapName: map.name,
      cleared: cleared,
      clearTime: createDateOrZero(playerstats.achievements[map.index].unlocktime),
      index: map.index,
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
  const [hideClearedMaps, setHideClearedMaps] = useState(false);

  const fetchData = (url: string, name: string) => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setPlayerData((prev) => [...prev, flattenData(data, name)]));
  };

  const sortPlayerData = (
    attribute: "mapName" | "cleared" | "clearTime" | "index",
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
    for (const { steamId, name } of URLS) {
      const url = "https://kf2-tracker-8bea7cdd90bc.herokuapp.com/" + steamId;
      fetchData(url, name);
    }
  }, []);

  const mapList = createMapList(playerData);

  return (
    <>
      <SortingOptions
        sortPlayerData={sortPlayerData}
        playerData={playerData}
        hideClearedMaps={hideClearedMaps}
        setHideClearedMaps={setHideClearedMaps}
      />
      <div className="map-list-container">
        {mapList.map((mapName) => (
          <div className="map-list-item">{mapName}</div>
        ))}
      </div>
      {playerData.map((player) => (
        <div className="player-container">
          <div className="player-header">
            <div>{player.name}</div>
            <div>
              Hell on Earth: {player.hoeClears} / {player.achievements.length} (
              {((player.hoeClears / player.achievements.length) * 100).toFixed(0)}%)
            </div>
          </div>
          {player.achievements.map(({ mapName, cleared, clearTime }) => {
            if (hideClearedMaps && cleared) return;
            return <Map mapName={mapName} cleared={cleared} clearTime={clearTime} />;
          })}
        </div>
      ))}
    </>
  );
}
