import { ArrowDown } from "./ArrowDown";
import { ArrowUp } from "./ArrowUp";
import { FlattenedData } from "../Types";

type Props = {
  sortPlayerData: (
    attribute: "mapName" | "cleared" | "clearTime" | "index",
    direction: number,
    data: FlattenedData[]
  ) => void;
  playerData: FlattenedData[];
  attribute: "mapName" | "cleared" | "clearTime" | "index";
};

const getHeaderText = (attribute: "mapName" | "cleared" | "clearTime" | "index") => {
  if (attribute === "mapName") return "Sort by map name";
  if (attribute === "cleared") return "Sort by cleared/not cleared";
  if (attribute === "clearTime") return "Sort by clear time";
  if (attribute === "index") return "Sort by map release date";
};

export default function SortButtons({ sortPlayerData, playerData, attribute }: Props) {
  return (
    <>
      <div className="sort-inner-container">
        <div className="sort-inner-wrapper">
          <div>{getHeaderText(attribute)}</div>
          <button
            onClick={() => sortPlayerData(attribute, attribute === "mapName" ? 1 : -1, playerData)}
          >
            <ArrowDown />
          </button>
          <button
            onClick={() => sortPlayerData(attribute, attribute === "mapName" ? -1 : 1, playerData)}
            className="sort-up"
          >
            <ArrowUp />
          </button>
        </div>
      </div>
    </>
  );
}
