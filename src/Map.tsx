type MapData = {
  map: string;
  cleared: boolean;
  clearTime: Date;
};

export default function Map({ map, cleared, clearTime }: MapData) {
  return (
    <div className={"single-map" + (cleared ? " cleared-hoe" : " not-cleared")}>
      <div className="map-name">{map}</div>
      <div className="inner-left">
        <div className="cleared-text">{cleared ? "Cleared" : "Not cleared"}</div>
        <div className="clear-time">
          {clearTime.toISOString().substring(0, 4) !== "1970"
            ? clearTime.toISOString().substring(0, 10)
            : "N/A"}
        </div>
      </div>
    </div>
  );
}
