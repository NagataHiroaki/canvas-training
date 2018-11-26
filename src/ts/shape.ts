import Canvas from "./Canvas";
/**
 * 円を扱うクラス
 */
export class Circle {

  x: number;
  y: number;
  r: number;
  c: string;

  constructor(x: number, y: number, r: number, c: string) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.c = c;
  }

  init() {
    Canvas.addRenderObjs(this);
  }

  render() {
    // console.log('--- Circle render ---');
    Canvas.ctx.beginPath();
    Canvas.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
    if (this.c) {
      Canvas.ctx.fillStyle = this.c;
      Canvas.ctx.fill();
    } else {
      Canvas.ctx.stroke();
    }
  }
}

export const rectType = {
  fill: 'fill',
  stroke: 'stroke',
  clear: 'clear',
}

/**
 * 矩形を扱うクラス
 */
export class Rect {

  x1: number;
  x2: number;
  y1: number;
  y2: number;
  c:  string;
  type: string;

  constructor(x1: number, y1: number, x2: number,y2: number, c: string,type:string) {
    this.x1 = x1;
    this.x2 = x2;
    this.y1 = y1;
    this.y2 = y2;
    this.c = c;
    this.type = type;
  }

  init() {
    Canvas.addRenderObjs(this);
  }

  render() {
    // console.log('--- Rect render ---');
    Canvas.ctx.beginPath();

    switch(this.type) {
      case rectType.fill:
      Canvas.ctx.fillStyle = this.c;
        Canvas.ctx.fillRect(this.x1,this.y1,this.x2,this.y2);
        Canvas.ctx.fill();
        break;
      case rectType.stroke:
      Canvas.ctx.strokeStyle = this.c;
        Canvas.ctx.strokeRect(this.x1,this.y1,this.x2,this.y2);
        Canvas.ctx.closePath();
        break;
      default:break;
    }
  }
}
