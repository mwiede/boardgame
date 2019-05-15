import React from 'react';
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



class Spiel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {

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

        const ermittleGewinner = (spieler) => {
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

        const anzahlSpieler = 3;
        const breite = 3;
        const hoehe = 5;

        const zeilen = [];

        for (let zeile = 0; zeile < hoehe; zeile++) {
            let spalten = [];
            for (let spalte = 0; spalte < breite; spalte++) {
                spalten.push(<td key={spalte}>{zeile}-{spalte}</td>);
            }
            zeilen.push(<tr key={zeile}>{spalten}</tr>);
        }

        const brett = <table border="1"><tbody>{zeilen}</tbody></table>;

        const aktionenListe = <ul>{aktionen.filter(aktion => !aktion.aufgedeckt)
            .map(aktion => <li key={aktion.name}>{aktion.name}</li>)}</ul>

        return (<>

            Hallo, wieviele Spieler?

        <input defaultValue={anzahlSpieler} name="anzahlSpieler" />
            <input type="button" defaultValue="Start" />

            <table>
                <tbody>
                    <tr>
                        <td>{aktionenListe}</td>
                        <td> {brett}</td>
                    </tr>
                </tbody>
            </table>

        </>)
    }
}

export default Spiel;