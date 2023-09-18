import SortButtons from "./SortButtons";
import { FlattenedData } from "../Types";

type Props = {
  sortPlayerData: (
    attribute: "mapName" | "cleared" | "clearTime" | "index",
    direction: number,
    data: FlattenedData[]
  ) => void;
  playerData: FlattenedData[];
  hideClearedMaps: boolean;
  setHideClearedMaps: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SortingOptions({
  sortPlayerData,
  playerData,
  hideClearedMaps,
  setHideClearedMaps,
}: Props) {
  return (
    <div className="sort-container">
      <button onClick={() => setHideClearedMaps((prev) => !prev)}>
        {hideClearedMaps ? "Show " : "Hide "}cleared maps
      </button>
      <SortButtons sortPlayerData={sortPlayerData} playerData={playerData} attribute="mapName" />
      <SortButtons sortPlayerData={sortPlayerData} playerData={playerData} attribute="clearTime" />
      <SortButtons sortPlayerData={sortPlayerData} playerData={playerData} attribute="index" />
    </div>
  );
}
