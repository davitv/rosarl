
export const clone = <T>(obj: T): T => JSON.parse(JSON.stringify(obj));
export const inArray = (arr: any[], item: any) => arr.indexOf(item) !== -1;


import { isEmpty } from './check';

export function last<T>(arr: T[]): T {
    if (isEmpty(arr)) {
        throw new Error('Empty array cannot have last element');
    }
    return clone(arr[arr.length - 1]);
}

export function first<T>(arr: T[]): T | undefined {
    return arr[0]
};

export function any(arr: boolean[]): boolean {
    for (let i = 0, j = arr.length; i < j; i++) {
        if (arr[i]) {
            return true;
        }
    }
    return false;
}

export function flatten<T>(arr: T[][]): T[] {
    const res: T[] = [];
    for (let i = 0, j = arr.length; i < j; i++) {
        arr[i].map(el => res.push(el));
    }
    return res;
}

export function all(arr: boolean[]): boolean {
    for (let i = 0, j = arr.length; i < j; i++) {
        if (arr[i] === false) {
            return false;
        }
    }
    return true;
}

export function range(start: number, end: number): number[] {
    const ret: number[] = [];
    for (let i = start; i < end; i++) {
        ret.push(i);
    }
    return ret;
}


export function setDiff<T>(a: Set<T>, b: Set<T>) {
    const ret: Set<T> = new Set();

    const difference = (a: Set<T>, b: Set<T>) => {
        // Difference (a \ b): create a set that
        // contains those elements of set a that are not in set b.
        return Array.from(a).filter(el => !b.has(el));
    }
    const diff = difference(a, b);
    const diff1 = difference(b, a);

    return new Set([...Array.from(diff), ...Array.from(diff1)]);
}

export const groupByValue = <T>(arr: T[]): T[][] => {
    const ret: T[][] = [];
    for (const a of arr) {
        let shouldPush = true;
        for (const aArr of ret) {
            if (aArr.filter(al => a === al).length > 0) {
                    aArr.push(a)
                    shouldPush = false;
            }
        }
        if (shouldPush) {
            ret.push([a]);
        }
    }

    return ret;
}

export const groupBy = <T>(arr: T[], func: (a: T, b: T) => boolean): T[][] => {
    const ret: T[][] = [];
    for (const a of arr) {
        let shouldPush = true;
        for (const aArr of ret) {
            if (aArr.filter(al => func(al, a)).length > 0) {
                    aArr.push(a)
                    shouldPush = false;
            }
        }
        if (shouldPush) {
            ret.push([a]);
        }
    }

    return ret;
}

export const updateStorageItems = (items: any[], data: any[], key='id'): any[] => {
    const clonedState = clone(items);

    const existingIds = clonedState.map(item => item[key]);
    const addItems = data.filter(d => existingIds.indexOf(d[key]) === -1);
    return clonedState.map((d) => {
        const [ updateItem ] = data.filter(p => p[key] === d[key]);
        return {
            ...d,
            ...updateItem,
        }
    }).concat(addItems);
};

/**
 * A function that emits a side effect and does not return anything.
 */
export type Procedure = (...args: any[]) => void;

export interface IOptions{
  isImmediate: boolean;
}

export const debounce = <F extends Procedure>(
  func: F,
  waitMilliseconds = 50,
  options: IOptions = {
    isImmediate: false
  },
): F => {
  let timeoutId: number | undefined;

  return function(this: any, ...args: any[]) {
    const context = this;

    const doLater = () => {
      timeoutId = undefined;
      if (!options.isImmediate) {
        func.apply(context, args);
      }
    }

    const shouldCallNow = options.isImmediate && timeoutId === undefined;

    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
    }

    timeoutId = window.setTimeout(doLater, waitMilliseconds);

    if (shouldCallNow) {
      func.apply(context, args);
    }
  } as any
}

export const addOrRemove = <T>(arr: T[], el: T): T[] => {
    const index = arr.indexOf(el);
    const clonedArr = clone(arr);
    if (index !== -1) {
        clonedArr.splice(index, 1)
    } else {
        clonedArr.push(el)
    }

    return clonedArr;
}

export const sortByOrder = <T extends {order: number}>(a: T, b: T) => {
    if (a.order < b.order) {
        return -1;
    }

    if (b.order < a.order) {
        return 1;
    }

    return 0;
};

export const insert = <T extends {id: number, order: number}>(item: T, destinationList: T[], destinationIndex: number) => {
    const clonedItems: T[] = clone(destinationList);
    clonedItems.sort(sortByOrder);
    clonedItems.splice(destinationIndex, 0, item)
    return clonedItems.map((item: any, index) => ({
        ...item,
        order: index,
    }));
};


export const reorder = <T extends {id: number, order: number;}>(items: T[], source: number, destination: number) => {
    const clonedItems: T[] = clone(items);

    clonedItems.sort(sortByOrder);
    const [ splicedElement ] = clonedItems.splice(source, 1);
    clonedItems.splice(destination, 0, splicedElement);
    return clonedItems.map((item, index) => ({
        id: item.id,
        order: index
    }));
};