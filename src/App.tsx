import { useEffect, useMemo, useState } from "react";

import "./App.css";
import { calculateNextFrameOffset } from "./physics";
import { Vector } from "./physics/vector";
import { KeyBoard, Keys } from "./KeyBoard";

function App() {
  const [particleState, setParticleState] = useState({
    s: new Vector(0, 0),
    v: new Vector(0, 0),
  });

  // const [m, setM] = useState(1);
  const m = 1;

  const [currentKey, setCurrentKey] = useState<Keys>();
  const [angle, setAngle] = useState<number>(180);

  useEffect(() => {
    const onKeydown = (e: KeyboardEvent) => {
      const key = e.key as Keys;
      setCurrentKey(key);
    };
    const onKeyup = () => {
      setCurrentKey(undefined);
    };
    window.addEventListener("keydown", onKeydown);
    window.addEventListener("keyup", onKeyup);
    return () => window.removeEventListener("keydown", onKeydown);
  }, []);

  const fMagnitude = useMemo(() => {
    switch (currentKey) {
      case "ArrowUp":
        return 2;
      case "ArrowDown":
        return -2;
      default:
        return 0;
    }
  }, [currentKey]);

  const isThrusting = fMagnitude > 0;

  useEffect(() => {
    requestAnimationFrame(() => {
      setAngle((angle) => {
        switch (currentKey) {
          case "ArrowLeft": {
            return (angle - 5) % 360;
          }
          case "ArrowRight": {
            return (angle + 5) % 360;
          }
          default: {
            return angle;
          }
        }
      });

      const fX = Math.cos(degreesToRadians(angle)) * fMagnitude;
      const fY = Math.sin(degreesToRadians(angle)) * fMagnitude;
      const f = new Vector(fX, fY);

      const { s, v1 } = calculateNextFrameOffset(particleState.v, f, m);
      setParticleState((state) => ({
        s: state.s.add(s),
        v: state.v.add(v1),
      }));
    });
  }, [particleState, setParticleState]);

  return (
    <>
      {/* <input
        type="range"
        min={1}
        max={100}
        value={m * 20}
        onChange={(e) => setM(Number(e.currentTarget.value) / 20)}
      /> */}
      <div
        style={{
          backgroundColor: "red",
          position: "relative",
          height: "100%",
          width: "100%",
        }}
      >
        <div
          style={{
            position: "absolute",
            fontSize: "3rem",
            // height: m * 16,
            // width: m * 16,
            // backgroundColor: "red",
            borderRadius: (m * 16) / 2,
            left: particleState.s.x,
            top: particleState.s.y,
            rotate: `${angle + 90}deg`,
          }}
        >
          <div style={{ position: "relative" }}>
            <div>{`💩`}</div>
            {isThrusting && (
              <div
                style={{ rotate: "180deg", position: "absolute", top: "3rem" }}
              >{`🔥`}</div>
            )}
          </div>
        </div>
      </div>
      <div
        style={{ position: "absolute", bottom: 0, left: "calc(50% - 6rem)" }}
      >
        <KeyBoard setCurrentKey={setCurrentKey} />
      </div>
    </>
  );
}

export default App;

function degreesToRadians(degrees: number) {
  var pi = Math.PI;
  return degrees * (pi / 180);
}
