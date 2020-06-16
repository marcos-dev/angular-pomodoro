import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {


  defaultProps = {
    types: [
      { name: 'Pomodoro', time: 1500 },
      { name: 'Short Break', time: 300 },
      { name: 'Long Break', time: 900 }
    ]
  };

  selectedType = null
  time = 1500;
  running = false;
  interval = null;
  sound: any;

  public radius: number = 150;
  public stroke: number = 5;
  public normalizedRadius: number = 0
  public circumference: number = 0;
  public strokeDashoffset: number = 0;
  public vb = `0 0 ${this.radius * 2} ${this.radius * 2}`;

  constructor() {
    this.selectedType = this.defaultProps.types[0];
    this.normalizedRadius = this.radius - this.stroke * 2;
    this.circumference = this.normalizedRadius * 2 * Math.PI;
    this.strokeDashoffset = this.strokeDashoffset = this.circumference - (this.getProgress() / 100) * this.circumference;
  }


  ngOnInit(): void {

  }

  startTimer = () => {

    this.running = true,
      this.interval = setInterval(this.tick, 1000),
      this.time = this.time > 0 ? this.time : 1500

    //this.sound.pause();
    //this.sound.currentTime = 0;
  };

  resetTimer = () => {
    this.stopInterval();
    this.time = 1500,
      this.running = false
  };

  stopInterval = () => {
    clearInterval(this.interval);
    this.interval = null;
  };

  pauseTimer = () => {
    this.interval ? this.stopInterval() : this.startTimer();
  };

  tick = () => {
    if (this.time <= 1) {
      this.stopInterval();
      this.running = false;
      // if (this.sound) this.sound.play();
      try {
        navigator.serviceWorker.register('service-worker.js').then(sw => {
          sw.showNotification(`${this.selectedType.name} finished!`);
        });
      } catch (e) {
        console.log('Notification error', e);
      }
    }

    this.time = this.time - 1;
    this.strokeDashoffset = this.circumference - (this.getProgress() / 100) * this.circumference;
  };


  getStatus = () => {

    if (this.time === 0) return 'Finished';
    if (this.running && !this.interval) return 'Paused';
    if (this.running) return 'Running';
  };

  getProgress = () => {
    const current = this.time;
    const total = this.selectedType.time;
    return ((total - current) / total) * 100;
  };

  //TODO: Adicionar as funções em um helper ou utils
  pad2(num) {
    return num > 9 ? num : `0${num}`;
  }

  formatTime(time) {
    const minutes = this.pad2(Math.floor(time / 60));
    const seconds = this.pad2(Math.floor(time % 60));

    return `${minutes}:${seconds}`;
  }

}
