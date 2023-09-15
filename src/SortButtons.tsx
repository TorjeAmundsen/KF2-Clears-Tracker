import { ArrowDown } from "./ArrowDown";
import { ArrowUp } from "./ArrowUp";

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
  attribute: "map" | "cleared" | "clearTime" | "index";
};

const getHeaderText = (attribute: "map" | "cleared" | "clearTime" | "index") => {
  if (attribute === "map") return "Sort by map name";
  if (attribute === "cleared") return "Sort by cleared/not cleared";
  if (attribute === "clearTime") return "Sort by clear time";
  if (attribute === "index") return "Sort by map release date";
};

export default function SortButtons({ sortPlayerData, playerData, attribute }: Props) {
  return (
    <>
      <div className="sort-inner-container">
        <div>{getHeaderText(attribute)}</div>
        <button onClick={() => sortPlayerData(attribute, 1, playerData)}>
          <ArrowDown />
        </button>
        <button onClick={() => sortPlayerData(attribute, -1, playerData)} className="sort-up">
          <ArrowUp />
        </button>
      </div>
    </>
  );
}
