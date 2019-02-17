
export interface ISetInterval {
    start(fn: any, interval: number, key: string): void;
    clear(key: string): void;
}

export class SetInterval implements ISetInterval {
    private key: {[key: string]: any} = {};

    public start(fn: any, interval: number, key: string) {
        if (this.key[key] === undefined) {
            this.key[key] = setInterval(() => fn(), interval)
        }
    }

    public clear(key: string) {
        if (this.key[key] !== undefined) {
            clearInterval(this.key[key]);
            this.key[key] = undefined;
        }
    }

}

export default SetInterval;