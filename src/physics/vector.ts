import { Scalar } from "./scalar";

export class Vector {
  private _x;
  private _y;

  constructor(x: number, y: number) {
    this._x = x;
    this._y = y;
  }

  public get x(): number {
    return this._x;
  }

  public get y(): number {
    return this._y;
  }

  add(v: Vector) {
    return new Vector(this.x + v.x, this.y + v.y);
  }

  multiply(s: Scalar) {
    return new Vector(this.x * s, this.y * s);
  }

  dividedBy(s: Scalar) {
    return new Vector(this.x / s, this.y / s);
  }
}
