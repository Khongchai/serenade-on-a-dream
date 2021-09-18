/**
 * Call this whereever requestanimationframe() is called.
 *
 * To use the delayed coordinate (tween, ease, whatever you wanna call it),
 * call the updateMouse method in the request animationframe() and use the returned x, y coordinate
 */
export class DelayedMouse {
  curX: number;
  curY: number;
  diffX: number;
  diffY: number;
  delayedX: number;
  delayedY: number;

  delta: number;

  constructor() {
    this.curX = 0;
    this.curY = 0;

    this.diffX = 0;
    this.diffY = 0;

    this.delayedX = 0;
    this.delayedY = 0;

    this.delta = 0;
  }

  updateMouse(curX: number, curY: number, delta: number) {
    this.curX = curX;
    this.curY = curY;

    this.delta = delta;

    //Calculate delayed mouse
    this.calculateDelayed();

    return { x: this.delayedX, y: this.delayedY };
  }

  calculateDelayed() {
    const speedDiff = 0.03;
    this.diffX = this.curX - this.delayedX;
    this.diffY = this.curY - this.delayedY;

    this.delayedX += this.diffX * speedDiff;
    this.delayedY += this.diffY * speedDiff;
  }
}
