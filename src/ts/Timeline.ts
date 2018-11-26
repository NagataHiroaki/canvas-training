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
    this.update();
  }

  addUpdateObjs(obj: any) {
    this.updateObjs.push(obj);
  }

  // play() {
  //   this.update();
  // }

  // stop() {

  // }

  update() {
    for (let i = 0; i < this.updateObjs.length; i++) {
      this.updateObjs[i].update();
    }

    requestAnimationFrame(this.update.bind(this));
    this.timer++;
  }
}

export default new Timeline
