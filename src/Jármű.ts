export default class Jármű {
    private _rendszám: string;
    private _áthaladásIdeje: Date;
    private _áthaladásIdejeNullával: string;

    public get rendszám(): string {
        return this._rendszám;
    }

    public get áthaladásIdeje(): Date {
        return this._áthaladásIdeje;
    }

    public get áthaladásIdejeNullával(): string {
        return this._áthaladásIdejeNullával;
    }

    constructor(sor: string) {
        const m: string[] = sor.split(" ");
        const ora: number = parseInt(m[0]);
        const perc: number = parseInt(m[1]);
        const mp: number = parseInt(m[2]);
        const datum = new Date(0, 0, 0, ora, perc, mp);
        this._áthaladásIdeje = datum;
        this._áthaladásIdejeNullával = `${m[0]} ${m[1]} ${m[2]}`;
        this._rendszám = m[3];
    }
}
