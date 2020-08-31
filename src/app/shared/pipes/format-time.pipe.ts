import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatTime',
})
export class FormatTimePipe implements PipeTransform {
  transform(time: number): any {
    if (time) {
      let min: any = Math.floor(time / 60);
      let sec: any = time % 60;
      if (min < 10) {
        min = '0' + min;
      }
      if (sec < 10) {
        sec = '0' + sec;
      }
      return `${min}:${sec}`;
    } else {
      return '00:00';
    }
  }
}
