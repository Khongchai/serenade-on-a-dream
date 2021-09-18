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

  speedDiff: number;

  constructor(speedDiff = 0.3) {
    this.curX = 0;
    this.curY = 0;

    this.diffX = 0;
    this.diffY = 0;

    this.delayedX = 0;
    this.delayedY = 0;

    this.speedDiff = speedDiff;
  }

  updateMouse(curX: number, curY: number) {
    this.curX = curX;
    this.curY = curY;

    //Calculate delayed mouse
    this.calculateDelayed();

    return { x: this.delayedX, y: this.delayedY };
  }

  calculateDelayed() {
    this.diffX = this.curX - this.delayedX;
    this.diffY = this.curY - this.delayedY;

    this.delayedX += this.diffX * this.speedDiff;
    this.delayedY += this.diffY * this.speedDiff;
  }
}
