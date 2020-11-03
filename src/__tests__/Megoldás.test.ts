import fs from "fs";
import Megoldás from "../Megoldás";

describe("Megoldás osztály unit tesztek", () => {
    const instance: Megoldás = new Megoldás("jarmu.txt");

    it("Megoldás osztálypéldány ellenőrzése", async () => {
        expect(instance).toBeInstanceOf(Megoldás);
    });

    it("Dolgozott órák száma", async () => {
        expect(instance.dolgozottÓrákSzáma).toBe(6);
    });

    it("Műszaki ellenőrzés óránként", async () => {
        // const helyesMap = new Map([
        //     [8, "FD-2717"],
        //     [9, "GK-3407"],
        //     [10, "RQ-8890"],
        //     [11, "IN-5066"],
        //     [12, "GC-0459"],
        //     [13, "CH-1893"],
        // ]);
        expect(instance.óraStatMap.size).toBe(6);
    });

    it("Kategorizálás", async () => {
        // const helyesMap = new Map([
        //     ["B", 10],
        //     ["K", 12],
        //     ["M", 15],
        //     ["SZ", 317],
        // ]);
        expect(instance.kategóriaStatMap.size).toBe(4);
    });

    it("Leghosszabb forgalommentes időszak", async () => {
        expect(instance.leghosszabbForgalommentesIdőszak).toBe("8:57:48 - 9:1:6");
    });

    // it("Rendszám szűrő példa", async () => {
    //     const példaSzűrő = new String([["HU-1774"], ["HU-6881"], ["HU-1903"]]);
    //     expect(instance.rendszámAzonosítás).toBe(példaSzűrő);
    // });

    it("vizsgalt.txt", async () => {
        const ellenőrzöttJárművek: string[] = instance.ellenőrzöttJárművekKiíratás;
        expect(ellenőrzöttJárművek.length).toBe(55);
    });
});
