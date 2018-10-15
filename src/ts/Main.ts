/**
 * 円を扱うクラス
 */
class Circle {

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
    main.canvas.addRenderObjs(this);
  }

  render() {
    // console.log('--- Circle render ---');
    main.canvas.ctx.beginPath();
    main.canvas.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
    if (this.c) {
      main.canvas.ctx.fillStyle = this.c;
      main.canvas.ctx.fill();
    } else {
      main.canvas.ctx.stroke();
    }
  }
}

/**
 * Canvasを扱うクラス
 * 描画の更新はこのクラスのみで行う
 * 描画を更新したい場合は対象に追加
 * main.canvas.addRenderObjs(this)
 * this.render(){hoge}
 */
class Canvas {

  canvas: any;
  renderObjs: Array < any > ;
  width: number;
  height: number;
  ctx: CanvasRenderingContext2D;

  constructor() {
    this.canvas = document.getElementById("app");
    this.ctx = this.canvas.getContext("2d");
    this.renderObjs = [];
  }

  init() {
    main.screen.addResizeObj(this);
    main.timeline.addUpdateObjs(this);
    this.onResize();
  }

  addRenderObjs(obj: object) {
    // console.log('--- Canvas addRenderObjs ---');
    this.renderObjs.push(obj);
  }

  setArea() {
    this.width = document.body.clientWidth;
    this.height = Math.floor(window.innerHeight - 0.5);
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  onResize() {
    // console.log('--- Canvas onResize ---');

    this.setArea();
  }

  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  update() {
    this.render();
  }

  render() {
    this.clear();
    for (let i = 0; i < this.renderObjs.length; i++) {
      this.renderObjs[i].render();
    }
  }
}

/**
 * 時間を管理
 * 定期的に実行したいイベントを追加
 * main.timeline.addUpdateObjs(this)
 * this.update(){hoge}
 */
class Timeline {
  timer: number;
  updateObjs: Array < any > ;
  constructor() {
    this.timer = 0;
    this.updateObjs = [];
  }

  init() {
    this.play();
  }

  addUpdateObjs(obj: any) {
    this.updateObjs.push(obj);
  }

  play() {
    this.update();
  }

  update() {
    for (let i = 0; i < this.updateObjs.length; i++) {
      this.updateObjs[i].update();
    }

    requestAnimationFrame(this.update.bind(this));
    this.timer++;
  }

  stop() {

  }
}

/**
 * 画面サイズを管理
 * リサイズを検知・登録されたイベントの実行
 * main.screen.addResizeObjs(this)
 * this.onResize(){hoge}
 */
class ScreenModel {
  width: number;
  height: number;
  resizeObjs: Array < any > ;
  constructor() {
    this.width;
    this.height;

    this.resizeObjs = [];
  }

  init() {
    this.setSize();
    window.addEventListener('resize', () => {
      this.onResize();
    });
  }

  addResizeObj(obj: any) {
    // console.log('--- ScreenModel addResizeObj ---');
    this.resizeObjs.push(obj);
  }

  setSize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  }

  onResize() {
    // console.log('--- ScreenModel onResize ---');

    this.setSize();

    for (let i = 0; i < this.resizeObjs.length; i++) {
      this.resizeObjs[i].onResize();
    }
  }

}

/**
 * カーソルを管理
 */
class Cursor {
  x: number;
  y: number;
  cursorPointer: Circle;
  constructor() {
    this.x;
    this.y;
    this.cursorPointer = new Circle(0, 0, 20, 'rgba(255,0,0,0.1)');
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

/**
 * 円をランダムに生成
 */
class RumCircles {
  length: number;
  circle: Circle;
  circles: Array < Circle > ;

  constructor(length: number) {
    this.length = length;
    this.circles = [];
  }

  getRum(type: string) {
    switch (type) {
      case 'x':
        return Math.floor(Math.random() * main.canvas.width);
        break;
      case 'y':
        return Math.floor(Math.random() * main.canvas.height);
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
        new Circle(
          Number(this.getRum('x')),
          Number(this.getRum('y')),
          Number(this.getRum('r')),
          String(this.getRum('c'))
        )
      );
      this.circles[i].init();
    }

    main.timeline.addUpdateObjs(this);
  }

  update() {
    if (main.timeline.timer % 60 !== 0) return;

    for (let i = 0; i < this.length; i++) {
      // console.log(this.circles[i]);
      this.circles[i].x = Number(this.getRum('x'));
      this.circles[i].y = Number(this.getRum('y'));
      this.circles[i].r = Number(this.getRum('r'));
      this.circles[i].c = String(this.getRum('c'));
    }
  }
}

/**
 * 全体を包括
 */
class Main {
  rCircles: RumCircles;
  screen: ScreenModel;
  canvas: Canvas;
  timeline: Timeline;
  cursor: Cursor;

  constructor() {
    this.screen = new ScreenModel;
    this.canvas = new Canvas;
    this.timeline = new Timeline;
    this.cursor = new Cursor;
    this.rCircles = new RumCircles(60);
  }

  init() {
    // console.log('--- Main init ---');
    this.screen.init();
    this.timeline.init();
    this.canvas.init();
    this.cursor.init();
    this.rCircles.init();
  }
}

const main = new Main();

window.addEventListener('load', () => {
  main.init();
});
