import * as shape from "./shape";
/**
 * カーソルを管理
 */
class Cursor {
  x: number;
  y: number;
  cursorPointer: shape.Circle;
  constructor() {
    this.x;
    this.y;
    this.cursorPointer = new shape.Circle(0, 0, 20, 'rgba(255,0,0,0.1)');
  }

  init() {
    this.cursorPointer.init();
    window.addEventListener('mousemove', (e) => {
      this.onMouseMove(e);
    });
  }
  onMouseMove(e: MouseEvent) {
    this.setPos(e);
    this.cursorPointer.x = this.x;
    this.cursorPointer.y = this.y;
  }

  setPos(e: MouseEvent) {
    this.x = e.pageX;
    this.y = e.pageY;
  }
}


export default new Cursor();
