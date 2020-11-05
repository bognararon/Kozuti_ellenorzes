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
        expect(instance.óraStatMap.get(8)).toBe("FD-2717");
        expect(instance.óraStatMap.get(9)).toBe("GK-3407");
        expect(instance.óraStatMap.get(10)).toBe("RQ-8890");
        expect(instance.óraStatMap.get(11)).toBe("IN-5066");
        expect(instance.óraStatMap.get(12)).toBe("GC-0459");
        expect(instance.óraStatMap.get(13)).toBe("CH-1893");
    });

    it("Kategorizálás", async () => {
        // const helyesMap = new Map([
        //     ["B", 10],
        //     ["K", 12],
        //     ["M", 15],
        //     ["SZ", 317],
        // ]);
        expect(instance.kategóriaStatMap.get("B")).toBe(10);
        expect(instance.kategóriaStatMap.get("K")).toBe(12);
        expect(instance.kategóriaStatMap.get("M")).toBe(15);
        expect(instance.kategóriaStatMap.get("SZ")).toBe(317);
    });

    it("Leghosszabb forgalommentes időszak", async () => {
        expect(instance.leghosszabbForgalommentesIdőszak).toBe("8:57:48 - 9:1:6");
    });

    it("Rendszám szűrő példa", async () => {
        expect(instance.rendszámAzonosítás("HU*****")[0]).toBe("HU-1774");
        expect(instance.rendszámAzonosítás("HU*****")[1]).toBe("HU-6881");
        expect(instance.rendszámAzonosítás("HU*****")[2]).toBe("HU-1903");
    });

    it("vizsgalt.txt", async () => {
        const ellenőrzöttJárművek: string[] = instance.ellenőrzöttJárművekKiíratás;
        expect(ellenőrzöttJárművek.length).toBe(55);
    });
});
