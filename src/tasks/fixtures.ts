import * as chance from 'chance';

import { dateToTimestamp } from '../utils/date';
import { range } from '../utils/fp';

export const generateTask = () => ({
    content: chance().name()
});

export const createTaskInterval = (taskId: number) => {
    const ts = dateToTimestamp(chance().date({
        year: 2018,
        month: 9,
        day: 20
    }) as Date);
    return {
        task: taskId,
        start: ts,
        stop: ts + chance().integer({ min: 0, max: 3600 * 5 }),
    };
};


export const generateTaskIntervals = (taskId: number, count: number = 0) => range(0, count).map(_ => createTaskInterval(taskId));