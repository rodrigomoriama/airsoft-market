import {DateTimeModel} from '../../domain/date-time-model';

export class ConvertDateTimeHelper {

  static convertEpochToDate(epochDate: any): string {
    // Used to Convert an epoch to human readable date:
    // https://www.epochconverter.com/
    // https://www.epochconverter.com/programming/#javascript
    let date = new Date(epochDate * 1000);
    let day: string = date.getUTCDate().toString();
    let month: string = (date.getUTCMonth() + 1).toString();
    let year: string = date.getFullYear().toString();

    if (date.getUTCDate() < 10) {
      day = '0' + date.getUTCDate();
    }
    if ((date.getUTCMonth() + 1) < 10) {
      month = '0' + (date.getUTCMonth() + 1);
    }

    return `${day}/${month}/${year}`;
  }

  static convertEpochToDateTime(epochDate: any): string {

    let date = new Date(epochDate * 1000);
    // console.log('convertEpochToDateTime ==> ',date);

    let day: string = date.getUTCDate().toString();
    let month: string = (date.getUTCMonth() + 1).toString();
    let year: string = date.getFullYear().toString();

    let hour: string = date.getUTCHours().toString();
    let minute: string = date.getUTCMinutes().toString();
    let second: string = date.getUTCSeconds().toString();

    if (date.getUTCDate() < 10) {
      day = '0' + date.getUTCDate();
    }
    if ((date.getUTCMonth() + 1) < 10) {
      month = '0' + (date.getUTCMonth() + 1);
    }

    if (date.getUTCHours() < 10) {
      hour = '0' + date.getUTCHours().toString();
    }
    if (date.getUTCMinutes() < 10) {
      minute = '0' + date.getUTCMinutes().toString();
    }
    if (date.getUTCSeconds() < 10) {
      second = '0' + date.getUTCSeconds().toString();
    }

    return `${day}/${month}/${year} ${hour}:${minute}:${second}`;
  }

  static convertEpochToDateTimeObject(epochDate: any): DateTimeModel {

    if (!epochDate) {
      return {
        day: '',
        month: '',
        year: '',
        hour: '',
        minute: '',
        second: ''
      };
    }

    let date = new Date(epochDate * 1000);
    // console.log('convertEpochToDateTime ==> ',date);

    let day: string = date.getUTCDate().toString();
    let month: string = (date.getUTCMonth() + 1).toString();
    let year: string = date.getFullYear().toString();

    let hour: string = date.getUTCHours().toString();
    let minute: string = date.getUTCMinutes().toString();
    let second: string = date.getUTCSeconds().toString();

    if (date.getUTCDate() < 10) {
      day = '0' + date.getUTCDate();
    }
    if ((date.getUTCMonth() + 1) < 10) {
      month = '0' + (date.getUTCMonth() + 1);
    }

    if (date.getUTCHours() < 10) {
      hour = '0' + date.getUTCHours().toString();
    }
    if (date.getUTCMinutes() < 10) {
      minute = '0' + date.getUTCMinutes().toString();
    }
    if (date.getUTCSeconds() < 10) {
      second = '0' + date.getUTCSeconds().toString();
    }

    return {
      day: day,
      month: month,
      year: year,
      hour: hour,
      minute: minute,
      second: second
    };
  }

  static convertEpochToDateObject(epochDate: any): Date {
    return new Date(epochDate * 1000);
  }

  static convertEpochToDateObjectOffset(epochTime: number): Date {
    const dt = new Date(epochTime);
    return new Date(dt.getTime() + dt.getTimezoneOffset() * 60000);
  }

  static convertEpochToFormattedDate(epochTime: number, locale: string): string {
    const dt = new Date(epochTime);
    return  dt.toLocaleDateString(locale) + ' ' + dt.toLocaleTimeString(locale);
  }

  static convertSecondToHour(secs: any): any {
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let h: string = hours.toString();
    let m: string = minutes.toString();
    let s: string = seconds.toString();

    if (hours < 10) {
      h = '0' + hours;
    }
    if (minutes < 10) {
      m = '0' + minutes;
    }
    if (seconds < 10) {
      s = '0' + seconds;
    }

    return {
      'hours': h,
      'minutes': m,
      'seconds': s
    };
  }

  static convertHourToSecond(hour: any): number {
    // hour needs to be this format -> HH:MM
    let a = hour.split(':'); // split it at the colons

    // minutes are worth 60 seconds. Hours are worth 60 minutes.
    return ((+a[0]) * (60 * 60)) + ((+a[1]) * 60);
  }

  static convertDateToEpoch(date: any): number | string {
    if (!date) {
      return '';
    }

    const myDate = new Date(date);
    return myDate.getTime() / 1000.0;
  }
}
