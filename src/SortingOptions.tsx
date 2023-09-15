import SortButtons from "./SortButtons";

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

type Props = {
  sortPlayerData: (
    attribute: "map" | "cleared" | "clearTime" | "index",
    direction: number,
    data: FlattenedData[]
  ) => void;
  playerData: FlattenedData[];
};

export default function SortingOptions({ sortPlayerData, playerData }: Props) {
  return (
    <div className="sort-container">
      <SortButtons sortPlayerData={sortPlayerData} playerData={playerData} attribute="map" />
      <SortButtons sortPlayerData={sortPlayerData} playerData={playerData} attribute="clearTime" />
      <SortButtons sortPlayerData={sortPlayerData} playerData={playerData} attribute="index" />
    </div>
  );
}
