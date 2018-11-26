import Screen from "./Screen";
import Timeline from "./Timeline";
import Canvas from "./Canvas";
import Cursor from "./Cursor";
import * as shape from "./shape";

/**
 * 円をランダムに生成
 */
class RumCircles {
  length: number;
  circle: shape.Circle;
  circles: Array < shape.Circle > ;

  constructor(length: number) {
    this.length = length;
    this.circles = [];
  }

  getRum(type: string) {
    switch (type) {
      case 'x':
        return Math.floor(Math.random() * Canvas.width);
        break;
      case 'y':
        return Math.floor(Math.random() * Canvas.height);
        break;
      case 'r':
        return Math.floor(Math.random() * 100);
        break;
      case 'c':
        var clr = 'rgba(';
        for (let i = 0; i < 3; i++) {
          clr = clr + Math.floor(Math.random() * 255) + ',';
        }
        clr = clr + Math.floor(Math.random() * 10) / 10 + ')';
        return clr;
        break;
      default:
        break;
    }
  }

  init() {

    for (let i = 0; i < this.length; i++) {
      this.circles.push(
        new shape.Circle(
          Number(this.getRum('x')),
          Number(this.getRum('y')),
          Number(this.getRum('r')),
          String(this.getRum('c'))
        )
      );
      this.circles[i].init();
    }

    Timeline.addUpdateObjs(this);
  }

  update() {
    if (Timeline.timer % 60 !== 0) return;

    for (let i = 0; i < this.length; i++) {
      // console.log(this.circles[i]);
      this.circles[i].x = Number(this.getRum('x'));
      this.circles[i].y = Number(this.getRum('y'));
      this.circles[i].r = Number(this.getRum('r'));
      this.circles[i].c = String(this.getRum('c'));
    }
  }
}

const start = () => {
  const rCircles = new RumCircles(60);
  const rect1 = new shape.Rect(10,10,100,100,'rgba(0,0,0,0.5)',shape.rectType.fill);
  const rect2 = new shape.Rect(20,20,100,100,'rgba(0,0,0,0.5)',shape.rectType.fill);

  Screen.init();
  Timeline.init();
  Canvas.init();
  Cursor.init();

  rect1.init();
  rect2.init();
  rCircles.init();
}

window.addEventListener('load', start);
