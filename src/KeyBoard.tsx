export type Keys = "ArrowUp" | "ArrowDown" | "ArrowLeft" | "ArrowRight";

const style: Record<"row" | "grid", React.CSSProperties> = {
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
  },
  grid: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // height: "3rem",
    // width: "3rem",
  },
};

export const KeyBoard = ({
  setCurrentKey,
}: {
  setCurrentKey: React.Dispatch<React.SetStateAction<Keys | undefined>>;
}) => {
  return (
    <div>
      <div style={style.row}>
        <div style={style.grid}></div>
        <div style={style.grid}>
          <Key
            onPointerDown={() => setCurrentKey("ArrowUp")}
            onPointerUp={() => setCurrentKey(undefined)}
            direction="up"
          />
        </div>

        <div style={style.grid}></div>
      </div>
      <div style={style.row}>
        <div style={style.grid}>
          <Key
            onPointerDown={() => setCurrentKey("ArrowLeft")}
            onPointerUp={() => setCurrentKey(undefined)}
            direction="left"
          />
        </div>
        <div style={style.grid}>
          <Key
            onPointerDown={() => setCurrentKey("ArrowDown")}
            onPointerUp={() => setCurrentKey(undefined)}
            direction="down"
          />
        </div>

        <div style={style.grid}>
          <Key
            onPointerDown={() => setCurrentKey("ArrowRight")}
            onPointerUp={() => setCurrentKey(undefined)}
            direction="right"
          />
        </div>
      </div>
    </div>
  );
};

const Key = ({
  onPointerDown,
  onPointerUp,
  direction,
}: {
  direction: "left" | "right" | "up" | "down";
  onPointerDown: () => void;
  onPointerUp: () => void;
}) => {
  const rotate = (function () {
    switch (direction) {
      case "up":
        return "⬆️";
      case "down":
        return "⬇️";
      case "left":
        return "⬅️";
      case "right":
        return "➡️";
    }
  })();
  return (
    <button
      style={{
        backgroundColor: "#242424",
        height: "4rem",
        width: "4rem",
        flex: 1,
        rotate: `${rotate}deg`,
        fontSize: "4rem",
        lineHeight: "4rem",
        alignSelf: "center",
        userSelect: "none",
      }}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
    >
      {rotate}
    </button>
  );
};
