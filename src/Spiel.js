import React from 'react';
import footprint from './footprint.svg';
import ladder from './ladder.svg';
import shuffleIcon from './shuffle.svg';
import hide from './hide.svg';
import { Brett } from './Brett';
import { Aktion } from './Aktion';
import { MSG } from './messages';
import Speech from 'speak-tts' // es6
import { FarbEingabe } from './FarbEingabe';
import { AltersEingabe } from './AltersEingabe';
import { Gewinner } from './Gewinner';
import { AktuellerSpieler } from './AktuellerSpieler';

const speech = new Speech() // will throw an exception if not browser supported
if (speech.hasBrowserSupport()) { // returns a boolean
    console.log("speech synthesis supported")

    speech.init().then((data) => {
        // The "data" object contains the list of available voices and the voice synthesis params
        console.log("Speech is ready, voices are available", data)
    }).catch(e => {
        console.error("An error occured while initializing : ", e)
    })
}

class Spiel extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            play: false,
            gestartet: false,
            anzahlSpieler: 3,
            breite: 4,
            hoehe: 6,
            spieler: [],
            aktionen: [],
            aktuellerSpieler: 0,
            gewinner: null,
            aktuelleAktion: null,
            vorleseText: '',
        }
        this.spielzug.bind(this);
    }

    starteSpiel() {
        this.init();
        let spieler = [];
        for (let index = 0; index < this.state.anzahlSpieler; index++) {
            spieler.push({
                id: index,
                position: 0,
                farbe: null,
                alter: null,
            });
        }
        this.setState({
            gestartet: false,
            anzahlSpieler: this.state.anzahlSpieler,
            spieler: spieler,
        });
    }

    init() {
        const shuffle = (a) => {
            for (let i = a.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [a[i], a[j]] = [a[j], a[i]];
            }
            return a;
        }

        const leiterSprosse = (position, breite) => {
            return 2 * breite - 1 - (2 * (position % breite)) + position;
        }

        let einSchritt = {
            name: 'einSchritt',
            logo: <image x="35" y="30" width="40" height="40" xlinkHref={footprint} />,
            schrittAktion: position => position + 1,
            boardAktion: () => { },
            aufgedeckt: false,
        };

        let zweiSchritte = {
            name: 'zweiSchritte',
            logo: <>
                <image x="15" y="30" width="40" height="40" xlinkHref={footprint} />
                <image x="45" y="30" width="40" height="40" xlinkHref={footprint} />
            </>,
            schrittAktion: position => position + 2,
            boardAktion: () => { },
            aufgedeckt: false,
        };

        let mischen = {
            name: 'mischen',
            logo: <image x="35" y="30" width="40" height="40" xlinkHref={shuffleIcon} />,
            schrittAktion: position => position,
            boardAktion: () => {
                aktionen.forEach(aktion => { aktion.aufgedeckt = false; });
                this.setState({ aktionen: shuffle(aktionen) });
            },
            aufgedeckt: false,
        };

        let zudecken = {
            name: 'zudecken',
            logo: <image x="35" y="30" width="40" height="40" xlinkHref={hide} />,
            schrittAktion: position => position,
            boardAktion: () => {
                aktionen.forEach(aktion => { aktion.aufgedeckt = false; });
            },
            aufgedeckt: false,
        };



        let leiter1 = {
            name: 'Leiter - 3 Sprossen',
            logo: <><image x="15" y="30" width="40" height="40" xlinkHref={ladder} />
                <image x="45" y="30" width="40" height="40" xlinkHref={ladder} /></>,
            schrittAktion: (position, breite) => leiterSprosse(leiterSprosse(leiterSprosse(position, breite), breite), breite),
            boardAktion: () => { },
            aufgedeckt: false,
        };

        let leiter2 = {
            name: 'Leiter - 2 Sprossen',
            logo: <image x="30" y="30" width="40" height="40" xlinkHref={ladder} />,
            schrittAktion: (position, breite) => leiterSprosse(leiterSprosse(position, breite), breite),
            boardAktion: () => { },
            aufgedeckt: false,
        };

        let aktionen = [einSchritt, zweiSchritte, mischen, zudecken, leiter1, leiter2];

        let farben = [
            { css: 'red', name: 'rot' },
            { css: 'blue', name: 'blau' },
            { css: 'yellow', name: 'gelb' },
            { css: 'magenta', name: 'rosa' },
            { css: 'green', name: 'grün' },
            { css: 'orange', name: 'orange' },
        ];

        this.setState({
            gestartet: false,
            gewinner: null,
            aktionen: aktionen,
            aktuellerSpieler: 0,
            aktuelleAktion: null,
            farben: farben,
            spieler: [],
        });
    }

    ermittleGewinner() {
        let spieler = this.state.spieler;
        let gewinnerFeld = this.state.breite * this.state.hoehe;
        for (let index = 0; index < spieler.length; index++) {
            if (spieler[index].position >= gewinnerFeld) {
                return spieler[index];
            }
        }
        return false;
    }

    spielzug(aktion) {

        const { aktuellerSpieler, breite, anzahlSpieler, aktuelleAktion } = this.state;

        if (aktion !== aktuelleAktion) {
            console.log('falsche Aktion');
            this.say(MSG.KARTE_SCHON_AUFGEDECKT);
            return;
        }

        var spieler = this.state.spieler[aktuellerSpieler];

        console.log("spieler " + spieler.id + " spielt mit Aktion " + aktion.name);

        const positionVorher = spieler.position;

        spieler.position = aktion.schrittAktion(spieler.position, breite);

        this.say(aktion.name);

        console.log("spieler " + spieler.id + " springt von " + positionVorher + " auf Position " + spieler.position);

        let gewinner = this.ermittleGewinner();
        if (!gewinner) {

            aktion.boardAktion();

            // nächster Spieler
            if (this.state.anzahlSpieler > 1) {
                const naechsterSpielerId = (aktuellerSpieler + 1) % anzahlSpieler;
                this.say(MSG.SPIELER_FARBE_IST_DRAN(this.state.spieler[naechsterSpielerId]), true);
                this.setState({
                    aktuellerSpieler: naechsterSpielerId,
                    aktuelleAktion: null
                });
            } else {
                this.setState({ aktuellerSpieler: 0, aktuelleAktion: null });
            }
        }
        else {
            this.setState({ gewinner: gewinner }, () => {
                this.say(MSG.GEWINNER);
            });
        }

    }

    aufdecken(aktion) {
        if (aktion.aufgedeckt) {
            console.log('aktuelleAktion schon aufgedeckt.');
            return;
        }
        if (this.state.aktuelleAktion) {
            console.log('aktuelleAktion gesetzt. Aufdecken nicht erlaubt');
            return;
        }
        let tmp = [...this.state.aktionen];
        tmp.forEach(a => { if (a === aktion) aktion.aufgedeckt = true; })
        this.setState({
            aktionen: tmp,
            aktuelleAktion: aktion
        });
    }

    say(msg, queue) {
        speech.speak({
            text: msg,
            queue: queue | false // current speech will be interrupted,
        });
    }

    spielerDatenEingegeben() {
        for (let index = 0; index < this.state.spieler.length; index++) {
            const element = this.state.spieler[index];
            if (!element.farbe) {
                this.say(MSG.SPIELER_WELCHE_FARBE(element));
                return element;
            } else if (!element.alter) {
                this.say(MSG.SPIELER_WELCHES_ALTER(element));
                return element;
            }
        }
        return null;
    }

    setzeSpielerFarbe(spielerMitEingabe, farbe) {
        const { spieler, farben } = this.state;
        spielerMitEingabe.farbe = farbe;
        spieler[spieler.indexOf(spielerMitEingabe)] = spielerMitEingabe;
        this.say(farbe.name);
        this.setState({
            spieler: spieler,
            farben: farben.filter(item => item !== farbe)
        }, this.starten);
    }

    setzeSpielerAlter(spielerMitEingabe, alter) {
        const { spieler } = this.state;
        spielerMitEingabe.alter = alter;
        this.setState({
            spieler: spieler,
        }, this.starten);
    }

    starten() {
        const fehlenNochEingaben = this.spielerDatenEingegeben();
        if (!fehlenNochEingaben) {
            this.say(MSG.SPIELER_FARBE_IST_DRAN(this.state.spieler[this.state.aktuellerSpieler]))
            this.setState({ gestartet: true });
        }
    }
    render() {

        const { play, anzahlSpieler, breite, hoehe, spieler, aktionen, farben, gestartet, aktuellerSpieler } = this.state;

        const aktionenListe = <div>
            {aktionen.map(aktion =>
                <Aktion key={aktion.name} aktion={aktion} spielzugFunktion={() => this.spielzug(aktion)} aufdeckenFunktion={() => this.aufdecken(aktion)} />
            )}
        </div>

        const spielerMitEingabe = this.spielerDatenEingegeben();

        const zahlen = [...Array(10).keys()].slice(3, 10);

        return (<>

            {!play &&
                <svg height="100" width="100" onClick={() => this.setState({ play: true })}>
                    <circle cx="50" cy="50" r="30" stroke="black" strokeWidth="2" fill="white" />
                    <text x="54%" y="50%" textAnchor="middle" alignmentBaseline="middle" fontSize="10vh">&#9654;</text>
                </svg>
            }

            {play && !gestartet && spieler.length === 0 && (
                <div>
                    Hallo, wieviele Spieler?<br />
                    <input value={anzahlSpieler} name="anzahlSpieler" onChange={(event) =>
                        this.setState({ anzahlSpieler: event.target.value })} />
                    <input type="button" defaultValue="Start"
                        onClick={this.starteSpiel.bind(this)} /></div>)}

            {spieler.length > 0 && spielerMitEingabe && !spielerMitEingabe.farbe &&
                <FarbEingabe spieler={spielerMitEingabe} farben={farben} setzeSpielerFarbe={this.setzeSpielerFarbe.bind(this)} />
            }

            {spieler.length > 0 && spielerMitEingabe && spielerMitEingabe.farbe && !spielerMitEingabe.alter &&
                <AltersEingabe spieler={spielerMitEingabe} zahlen={zahlen} setzeSpielerAlter={this.setzeSpielerAlter.bind(this)} />
            }

            {this.state.gestartet && <>
                <div>
                    <table style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                        <tbody>
                            <tr>
                                <td width="50%">
                                    {!this.state.gewinner &&
                                        <AktuellerSpieler spieler={spieler[aktuellerSpieler]} />
                                    }

                                    {this.state.gewinner && <Gewinner gewinner={spieler[this.state.gewinner.id]}/>}

                                    <br />

                                    {aktionenListe}</td>
                                <td width="50%"><Brett hoehe={hoehe} breite={breite} spieler={spieler} /></td>
                            </tr>
                        </tbody>
                    </table>

                    <p>
                        <input type="button" defaultValue="Neues Spiel" onClick={this.init.bind(this)} />
                    </p>
                </div>
            </>
            }
        </>)


    }
}
export default Spiel;