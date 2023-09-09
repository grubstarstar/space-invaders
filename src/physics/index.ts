import { Scalar } from "./scalar";
import { Vector } from "./vector";

const fps = 60;
const frameDurationSeconds = 1 / fps;

export function calculateNextFrameOffset(
  v0: Vector,
  f: Vector,
  m: Scalar
): { s: Vector; v1: Vector } {
  // f = ma
  const accel = f.dividedBy(m);
  //   console.log("accel", accel);
  // a = v/t
  const v1 = accel.multiply(frameDurationSeconds);
  // v = d/t
  //   const d = v.multiply(frameDurationSeconds);
  //   console.log("v1", v1);
  // distance travelled.
  // s = (v0 + v1) t / 2
  const s = v0.add(v1).dividedBy(2);
  //   console.log("v0.add(v1).dividedBy(2)", v0.add(v1).dividedBy(2));
  //   console.log("s", s);
  return {
    s,
    v1,
  };
}
