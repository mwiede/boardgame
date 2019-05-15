
/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

const spiel = (anzahlSpieler, breite, hoehe) => {

    let spieler = [];

    let einSchritt = {
        name: 'einSchritt',
        schrittAktion: position => position + 1,
        boardAktion: () => { },
        aufgedeckt: false,
    };

    let zweiSchritte = {
        name: 'zweiSchritte',
        schrittAktion: position => position + 2,
        boardAktion: () => { },
        aufgedeckt: false,
    };

    let mischen = {
        name: 'mischen',
        schrittAktion: position => position,
        boardAktion: () => {
            aktionen.forEach(aktion => { aktion.aufgedeckt = false; });
            shuffle(aktionen)
        },
        aufgedeckt: false,
    };

    let zudecken = {
        name: 'zudecken',
        schrittAktion: position => position,
        boardAktion: () => {
            aktionen.forEach(aktion => { aktion.aufgedeckt = false; });
        },
        aufgedeckt: false,
    };

    const leiterSprosse = position => {
        return 2 * breite - 1 - (2 * (position % breite)) + position;
    };

    let leiter1 = {
        name: 'Leiter - 3 Sprossen',
        schrittAktion: position => leiterSprosse(leiterSprosse(leiterSprosse(position))),
        boardAktion: () => { },
        aufgedeckt: false,
    };

    let leiter2 = {
        name: 'Leiter - 2 Sprossen',
        schrittAktion: position => leiterSprosse(leiterSprosse(position)),
        boardAktion: () => { },
        aufgedeckt: false,
    };

    let aktionen = [einSchritt, zweiSchritte, mischen, zudecken, leiter1, leiter2];

    const ermittleGewinner = () => {
        let gewinnerFeld = breite * hoehe;
        for (let index = 0; index < spieler.length; index++) {
            if (spieler[index].position >= gewinnerFeld) {
                return spieler[index];
            }
        }
        return false;
    }

    const spielzug = spieler => {

        var zugedeckteAktionen = aktionen.filter(aktion => !aktion.aufgedeckt);

        // per Zufall
        var min = 0;
        var max = zugedeckteAktionen.length;
        var zufall = Math.floor(Math.random() * (+max - +min)) + +min;

        var aktion = zugedeckteAktionen[zufall];

        console.log("spieler " + spieler.id + " spielt mit Aktion " + aktion.name);

        const positionVorher = spieler.position;

        spieler.position = aktion.schrittAktion(spieler.position);

        console.log("spieler " + spieler.id + " springt von " + positionVorher + " auf Position " + spieler.position);

        aktion.aufgedeckt = true;

        aktion.boardAktion();

    }

    const spielen = () => {

        for (let index = 0; index < anzahlSpieler; index++) {
            spieler.push({
                id: index,
                position: 0,
            });
        }

        var aktuellerSpieler = 0;
        var gewinner = null;
        while (!gewinner) {

            spielzug(spieler[aktuellerSpieler]);

            aktuellerSpieler = (aktuellerSpieler + 1) % anzahlSpieler;
            /*
                        aktuell next
                        0       1      1%3=1
                        1       2      2%3=2
                        2       0      3%3=0
            */

            gewinner = ermittleGewinner();
        }

        console.log("Gewinner: " + JSON.stringify(gewinner));

    }

    spielen();


};

spiel(3, 3, 6);
