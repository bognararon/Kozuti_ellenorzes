import fs from "fs";
import http from "http";
import url from "url";
import Megoldás from "./Megoldás";

export default class Content {
    public content(req: http.IncomingMessage, res: http.ServerResponse): void {
        // favicon.ico kérés kiszolgálása:
        if (req.url === "/favicon.ico") {
            res.writeHead(200, { "Content-Type": "image/x-icon" });
            fs.createReadStream("favicon.ico").pipe(res);
            return;
        }
        // Weboldal inicializálása + head rész:
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.write("<!DOCTYPE html>");
        res.write("<html lang='hu'>");
        res.write("<head>");
        res.write("<style>input, pre {font-family:monospace; font-size:1em; font-weight:bold;}</style>");
        res.write("<meta name='viewport' content='width=device-width, initial-scale=1.0'>");
        res.write("<title>Közúti ellenőrzés</title>");
        res.write("</head>");
        res.write("<body><form><pre class='m-3'>");
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const params = url.parse(req.url as string, true).query;

        // Kezd a kódolást innen -->
        // 1. feladat
        const megold: Megoldás = new Megoldás("jarmu.txt");

        // 2. feladat
        res.write(`2. feladat: Legalább ${megold.dolgozottÓrákSzáma} óra hosszat dolgoztak\n`);

        // 3. feladat
        const óraStatMap: Map<number, string> = megold.óraStatMap;
        res.write("3. feladat:\n");
        for (const [key, value] of óraStatMap) {
            res.write(`\t${key} óra: ${value}\n`);
        }
        // 4. feladat
        const kategóriaStatMap: Map<string, number> = megold.kategóriaStatMap;
        res.write("4. feladat:\n");
        for (const [key, value] of kategóriaStatMap) {
            res.write(`\t${key}: ${value}\n`);
        }
        // 5. feladat
        res.write(`5. feladat: A leghosszabb forgalommentes időszak: ${megold.leghosszabbForgalommentesIdőszak}\n`);

        // 6. feladat
        let inputRendszam: string = params.inputRendszam as string;
        if (inputRendszam.length < 7) {
            do {
                inputRendszam += "*";
            } while (inputRendszam.length < 7);
        }
        res.write(`6. feladat: Adjon meg egy rendszámot [ 7 karakter legyen, pl.: HU*****]: <input type='text' name='inputRendszam' value='${inputRendszam}' style='max-width:100px;' maxlength="7" onChange='this.form.submit();'>\n`);
        const egyezőRendszámok: string[] = megold.rendszámAzonosítás(inputRendszam);
        res.write("<textarea rows='10' cols='8'>");
        for (const i of egyezőRendszámok) {
            res.write(`${i}\n`);
        }
        res.write("</textarea>\n");

        // 7. feladat
        megold.ellenőrzöttJárművekÁllománybaÍrása("vizsgalt.txt");
        const ellenőrzöttJárművek: string[] = megold.ellenőrzöttJárművekKiíratás;
        res.write("8. feladat: vizsgalt.txt\n");
        res.write("<textarea rows='10' cols='20'>");
        for (const i of ellenőrzöttJárművek) {
            res.write(`${i}\n`);
        }
        res.write("</textarea>");

        // <---- Fejezd be a kódolást

        res.write("</pre></form>");
        res.write("</body></html>");
        res.end();
    }
}
