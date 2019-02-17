import { range } from './fp';

export const SECONDS_IN_MINUTE = 60;
export type SECONDS_IN_MINUTE = typeof SECONDS_IN_MINUTE;

export const MINUTES_IN_HOUR = 60;
export type MINUTES_IN_HOUR = typeof MINUTES_IN_HOUR;

export const SECONDS_IN_HOUR = MINUTES_IN_HOUR * SECONDS_IN_MINUTE;
export type SECONDS_IN_HOUR = typeof SECONDS_IN_HOUR;

export const SECONDS_IN_DAY = SECONDS_IN_HOUR * 24;
export type SECONDS_IN_DAY = typeof SECONDS_IN_DAY;

export const DAYS_IN_WEEK = 7;
export type DAYS_IN_WEEK = typeof DAYS_IN_WEEK;

export const HOURS_IN_DAY = 24;
export type HOURS_IN_DAY = typeof HOURS_IN_DAY;

export const getNextMonthNumber = (month: number) => (month + 1) % 12;
export const getPrevMonthNumber = (month: number) => !!month ? (month - 1) : 11;
export const getWeekDays = () => ['sun', 'mon', 'tus', 'wed', 'thu', 'fri', 'sat'];

export const getWeekTimestamps = (startFrom: number) => {
    /*
        Takes ```startFrom``` timestamp day and return timestamps
        for next seven days starting from ```startFrom``` arg.
    */


    // clean redundant seconds from startFrom, roll it back to 00:00
    const startStamp = getDayStartTimeStamp(startFrom);

    return range(0, DAYS_IN_WEEK).map(n => startStamp + (n * SECONDS_IN_DAY * DAYS_IN_WEEK));
}

export const getDayHours = () => HOURS_IN_DAY;

export const getMonths = () => [
    'January',
    'Fabruary',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];
export const getShortMonthName = (monthNumber: number) => ['jan', 'fab', 'mart', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'][monthNumber % 12];
export const getMonthName = (monthNumber: number) => getMonths()[monthNumber % 12];
export const dateToTimestamp = (date: Date) => Math.round(date.getTime() / 1000);
export const clockToTimestamp = (hours: number, minutes: number): number | false => {
    if (hours > 23 || minutes > 59) {
        return false;
    }
    return (hours * SECONDS_IN_HOUR) + (minutes * SECONDS_IN_MINUTE);
};

export function now(): number {
    return dateToTimestamp(new Date());
}

export function millisecondsNow(): number {
    return Math.round(new Date().getTime());
}

export const timestampToDate = (timestamp: number) => new Date(timestamp * 1000);

export const getDayEndTimeStamp = (timestamp: number) => {
    const date = timestampToDate(timestamp + SECONDS_IN_DAY);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return dateToTimestamp(date);
}

export const getDayStartTimeStamp = (timestamp: number) => {
    const date = timestampToDate(timestamp);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return dateToTimestamp(date);
}
export const tsToClockSeconds = (ts: number) => ts % SECONDS_IN_DAY;

export const timestampToDateShort = (timestamp: number): string => {
    const date = timestampToDate(timestamp);
    return `${date.getDate()} ${getShortMonthName(date.getMonth())}`;
}

export const timestampToWeekDayShort = (timestamp: number): string => {
    const date = timestampToDate(timestamp);
    return `${getWeekDays()[date.getDay()]}`;
}

export function tsToTimeString(ts: number): string {
    const dt = timestampToDate(ts);
    const hours = dt.getHours();
    const minutes = dt.getMinutes();
    return (hours < 10 ? '0' + hours : hours) + ':' + (minutes < 10 ? '0' + minutes : minutes);
}

export function tsToTimeStringWithSeconds(ts: number): string {
    const dt = timestampToDate(ts);
    const hours = dt.getHours();
    const minutes = dt.getMinutes();
    const seconds = dt.getSeconds();
    return (hours < 10 ? '0' + hours : hours) + ':' + (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds);
}

export function secondsToMinutesLength(seconds: number): string {
    const secondsLeft = seconds % 60;
    const minutes = Math.floor(seconds / 60);
    return `${minutes >= 10 ? minutes : '0' + minutes}:${secondsLeft >= 10 ? secondsLeft : '0' + secondsLeft}`;
}

export function secondsToHoursLength(seconds: number): string {
    const secondsLeft = seconds % 60;
    const minutes = Math.floor(seconds / 60) % 60;
    const hours = Math.floor(seconds / (60 * 60));
    return `
        ${hours >= 10 ? hours : '0' + hours}:${minutes >= 10 ? minutes : '0' + minutes}:${secondsLeft >= 10 ? secondsLeft : '0' + secondsLeft}
    `;
}

export const sliceTime = (numberOfSlices: number, sliceLength: number, sliceStart: number) => range(0, numberOfSlices).reduce((prev, curr) => {
    const prevInterval = prev.pop();

    if (prevInterval === undefined) {
        return prev.concat([
            [sliceStart - sliceLength, sliceStart]
        ]);
    } else {
        return prev.concat([
            prevInterval,
            [ prevInterval[0] - sliceLength, prevInterval[0], ]
        ]);
    }
}, [] as Array<[number, number]>);

export const hourIntervals = (hours: number, timeStart: number) => sliceTime(hours, SECONDS_IN_HOUR, timeStart);
export const dayIntervals = (days: number, timeStart: number) => sliceTime(days, SECONDS_IN_DAY, timeStart);
export const daysAgo = (startTimestamp: number, days: number) => startTimestamp - (SECONDS_IN_DAY * days);

export const getNumberOfDays = (month: number, year: number): number => new Date(year, month + 1, 0).getDate();
export const getWeekDay = (month: number, year: number, day: number): number => new Date(year, month, day).getDay();
export function getDaysArray(month: number, year: number): number[] {

    const numberOfDays: number = getNumberOfDays(month, year);
    const daysInPrevMonth: number = getNumberOfDays(getPrevMonthNumber(month), year);

    const firstWeekDay: number = getWeekDay(month, year, 1);
    const lastWeekDay: number = getWeekDay(month, year, numberOfDays);

    const monthDays: number[] = range(1, numberOfDays + 1);

    const monthStart: number[] = range(daysInPrevMonth - firstWeekDay + 1, daysInPrevMonth + 1);

    const monthEnd: number[] = range(1, 7 - lastWeekDay);

    return [...monthStart, ...monthDays, ...monthEnd];
}

export function getWeekNumber(year: number, month: number, date: number) {
    return Math.floor(getDaysArray(month, year).indexOf(date) / 7 + 1);
}

export function getDaysIntervals(startDayTimestamp: number, daysCount: number): number[] {
    return range(1, daysCount + 1).map(d => startDayTimestamp + SECONDS_IN_DAY * d);
}

export function getDaysArrayWithTimestamps(month: number, year: number): number[][] {
    const firstWeekDay: number = getWeekDay(month, year, 1);
    const firstTimestamp = dateToTimestamp(new Date(year, month, firstWeekDay * -1 + 1));
    return getDaysArray(month, year).map((d, i) => [d, firstTimestamp + SECONDS_IN_DAY * i]);
}

export function getMonthWeeksCount(year: number, month: number): number {
    const numberOfDays = new Date(year, month + 1, 0).getDate();
    const firstWeekday = new Date(year, month, 1).getDay();
    return Math.ceil((numberOfDays + firstWeekday) / DAYS_IN_WEEK);
}

