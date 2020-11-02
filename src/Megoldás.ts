import fs from "fs";
import Jármű from "./Jármű";
export default class Megoldas {
    private _járművek: Jármű[] = [];

    public get dolgozottÓrákSzáma(): number {
        const minDolgozottDate: number = this._járművek[this._járművek.length - 1].áthaladásIdeje.getHours() + 1 - this._járművek[0].áthaladásIdeje.getHours();
        return minDolgozottDate;
    }

    public get óraStatMap(): Map<number, string> {
        const statMap: Map<number, string> = new Map<number, string>();
        this._járművek.forEach(i => {
            if (!statMap.has(i.áthaladásIdeje.getHours())) {
                statMap.set(i.áthaladásIdeje.getHours(), i.rendszám);
            }
        });
        return statMap;
    }

    public get kategóriaStatMap(): Map<string, number> {
        const statMap: Map<string, number> = new Map<string, number>();
        let b: number = 0;
        let k: number = 0;
        let m: number = 0;
        let sz: number = 0;

        this._járművek.forEach(i => {
            const rendszámElsőBetű: string = i.rendszám[0];
            if (rendszámElsőBetű == "B") {
                b++;
            } else if (rendszámElsőBetű == "K") {
                k++;
            } else if (rendszámElsőBetű == "M") {
                m++;
            } else {
                sz++;
            }
        });
        statMap.set("B", b);
        statMap.set("K", k);
        statMap.set("M", m);
        statMap.set("SZ", sz);
        return statMap;
    }

    public get leghosszabbForgalommentesIdőszak(): string {
        const maxIdőszak: Date = new Date(0, 0, 0, 0, 0, 0);
        let elsőJármű: Date = new Date(0, 0, 0, 0, 0, 0);
        let másodikJármű: Date = new Date(0, 0, 0, 0, 0, 0);
        for (let i = 0; i < this._járművek.length - 1; i++) {
            elsőJármű = this._járművek[i].áthaladásIdeje;
            másodikJármű = this._járművek[i + 1].áthaladásIdeje;
            if (másodikJármű.getTime() - elsőJármű.getTime() > maxIdőszak.getTime()) {
                maxIdőszak.setTime(másodikJármű.getTime() - elsőJármű.getTime());
            }
        }
        for (let i = 0; i < this._járművek.length - 1; i++) {
            elsőJármű = this._járművek[i].áthaladásIdeje;
            másodikJármű = this._járművek[i + 1].áthaladásIdeje;
            if (másodikJármű.getTime() - elsőJármű.getTime() == maxIdőszak.getTime()) {
                return `${elsőJármű.getHours()}:${elsőJármű.getMinutes()}:${elsőJármű.getSeconds()} - ${másodikJármű.getHours()}:${másodikJármű.getMinutes()}:${másodikJármű.getSeconds()}`;
            }
        }
        return "Hiba történt!";
    }

    constructor(forrás: string) {
        fs.readFileSync(forrás)
            .toString()
            .split("\n")
            .forEach(i => {
                const aktSor = i.trim();
                this._járművek.push(new Jármű(aktSor));
            });
    }

    public ellenőrzöttJárművekÁllománybaÍrása(állományNeve: string): void {
        const ki: string[] = [];
        let ellenőrzöttJármű: Date = this._járművek[0].áthaladásIdeje;
        ellenőrzöttJármű.setMinutes(ellenőrzöttJármű.getMinutes() + 5);
        ki.push(`${this._járművek[0].áthaladásIdejeNullával} ${this._járművek[0].rendszám}`);
        this._járművek.forEach(i => {
            if (i.áthaladásIdeje.getTime() > ellenőrzöttJármű.getTime()) {
                ellenőrzöttJármű = i.áthaladásIdeje;
                ellenőrzöttJármű.setMinutes(ellenőrzöttJármű.getMinutes() + 5);
                ki.push(`${i.áthaladásIdejeNullával} ${i.rendszám}`);
            }
        });
        fs.writeFileSync(állományNeve, ki.join("\r\n") + "\r\n");
    }
}
