import { Pipe, PipeTransform } from "@angular/core";
@Pipe({
  name: "when",
  pure: true
})
export class WhenPipe implements PipeTransform {
  transform(dateTime: string): string {
    if (!dateTime) return;
    dateTime = new Date(dateTime).toISOString();
    const seconds = Math.floor(Number(new Date()) - Number(new Date(dateTime))) / 1000;
    if (seconds < 60) {
      return 'Just now';
    }
    const periods = {
      year: 365 * 24 * 60 * 60,
      month: (52 * 7 * 24 * 60 * 60) / 12,
      week: 7 * 24 * 60 * 60,
      day: 24 * 60 * 60,
      hour: 60 * 60,
      minute: 60,
      second: 1
    };
    let period;
    for (const p of Object.keys(periods)) {
      period = Math.floor(seconds / periods[p]);
      if (period > 0) {
        return period === 1 ? period + ' ' + p + ' ago' : period + ' ' + p + 's ago';
      }
    }
    return dateTime;
  }
}