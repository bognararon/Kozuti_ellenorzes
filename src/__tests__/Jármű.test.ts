import Jármű from "../Jármű";

describe("Jármű osztály unit tesztek", () => {
    const instance1: Jármű = new Jármű("08 02 52 FD-2717");
    const instance2: Jármű = new Jármű("09 17 11 ZIL-208");

    it("Jármű osztálypéldányok ellenőrzése", async () => {
        expect(instance1).toBeInstanceOf(Jármű);
        expect(instance2).toBeInstanceOf(Jármű);
    });

    it("Rendszám", async () => {
        expect(instance1.rendszám).toBe("FD-2717");
        expect(instance2.rendszám).toBe("ZIL-208");
    });

    it("Áthaladás ideje", async () => {
        expect(instance1.áthaladásIdeje.getHours()).toBe(8);
        expect(instance1.áthaladásIdeje.getMinutes()).toBe(2);
        expect(instance1.áthaladásIdeje.getSeconds()).toBe(52);
        expect(instance2.áthaladásIdeje.getHours()).toBe(9);
        expect(instance2.áthaladásIdeje.getMinutes()).toBe(17);
        expect(instance2.áthaladásIdeje.getSeconds()).toBe(11);
    });

    it("Áthaladás ideje nullával", async () => {
        expect(instance1.áthaladásIdejeNullával).toBe("08 02 52");
        expect(instance2.áthaladásIdejeNullával).toBe("09 17 11");
    });
});
