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

  reverseDirectionX: 1 | -1;
  reverseDirectionY: 1 | -1;

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

    //Determines the autoRotate direction
    this.reverseDirectionX = (Math.floor(Math.random() * 3) - 1 || 1) as 1 | -1;
    this.reverseDirectionY = (Math.floor(Math.random() * 3) - 1 || 1) as 1 | -1;
  }

  updateMouse(curX: number, curY: number, delta: number) {
    this.curX = curX;
    this.curY = curY;
    this.delta += delta;

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
    //Also adds a sprinkle of hand-held motion
    this.diffX = this.curX - this.delayedX + Math.sin(this.delta * 0.5) * 0.02;
    this.diffY = this.curY - this.delayedY + Math.cos(this.delta) * 0.02;

    //Tween animation will be the integral of the right hand expression
    this.delayedX += this.diffX * this.speedDiff;
    this.delayedY += this.diffY * this.speedDiff;
  }

  autoCurrent() {
    this.curX = Math.sin(this.delta * 0.15) * 0.4;
    this.curY = Math.cos(this.delta * 0.1) * 0.2;

    this.curX *= this.reverseDirectionX;
    this.curY *= this.reverseDirectionY;
  }
}
