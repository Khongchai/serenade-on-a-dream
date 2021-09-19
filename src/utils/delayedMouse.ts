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

  autopan: boolean;

  speedDiff: number;

  delta: number;

  constructor(speedDiff = 0.3, autopan = false, delta = 0) {
    this.curX = 0;
    this.curY = 0;

    this.diffX = 0;
    this.diffY = 0;

    this.delayedX = 0;
    this.delayedY = 0;

    this.autopan = autopan;

    this.speedDiff = speedDiff;

    this.delta = delta;
  }

  updateMouse(curX: number, curY: number, delta: number) {
    this.curX = curX;
    this.curY = curY;
    this.delta = delta;

    //Calculate delayed mouse
    if (!this.autopan) this.calculateDelayed();
    else {
      this.autoCurrent();
      this.calculateDelayed();
    }

    return { x: this.delayedX, y: this.delayedY };
  }

  setAutoPan(autopan: boolean) {
    this.autopan = autopan;
  }

  calculateDelayed() {
    this.diffX = this.curX - this.delayedX;
    this.diffY = this.curY - this.delayedY;

    this.delayedX += this.diffX * this.speedDiff;
    this.delayedY += this.diffY * this.speedDiff;
  }

  autoCurrent() {
    this.curX = Math.sin(this.delta);
    this.curY = Math.cos(this.delta);
  }
}
