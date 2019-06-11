import React from 'react';
import footprint from './footprint.svg';
import ladder from './ladder.svg';
import shuffleIcon from './shuffle.svg';
import hide from './hide.svg';

class Aktion extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ausgefuehrt: false,
        }
    }

    aufdecken() {

        const { aktion, aufdeckenFunktion, spielzugFunktion } = this.props;
        const { ausgefuehrt } = this.state;

        if (!aktion.aufgedeckt) {
            this.setState({
                ausgefuehrt: false
            });
            aufdeckenFunktion();
            setTimeout(spielzugFunktion, 1500);
        }
        else if (!ausgefuehrt) {
            spielzugFunktion();
            this.setState({
                ausgefuehrt: true
            });
        }

    }

    render() {

        const { aktion } = this.props;

        return (
            <>
                <svg height="100" width="100" onClick={this.aufdecken.bind(this)}>
                    <circle cx="50" cy="50" r="40" stroke="black" strokeWidth="2" fill="red" />
                    {aktion.aufgedeckt && aktion.logo}
                </svg>
            </>
        )
    }
}

class Spiel extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            gestartet: false,
            anzahlSpieler: 3,
            breite: 3,
            hoehe: 5,
            spieler: [],
            aktionen: [],
            aktuellerSpieler: 0,
            gewinner: null,
            aktuelleAktion: null,
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
            });
        }
        this.setState({
            gestartet: true,
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

        this.setState({
            gestartet: false,
            gewinner: null,
            aktionen: aktionen,
            aktuellerSpieler: 0,
            aktuelleAktion: null,
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
            return;
        }

        var spieler = this.state.spieler[aktuellerSpieler];

        console.log("spieler " + spieler.id + " spielt mit Aktion " + aktion.name);

        const positionVorher = spieler.position;

        spieler.position = aktion.schrittAktion(spieler.position, breite);

        console.log("spieler " + spieler.id + " springt von " + positionVorher + " auf Position " + spieler.position);

        let gewinner = this.ermittleGewinner();
        if (!gewinner) {

            aktion.boardAktion();

            // nächster Spieler
            if (this.state.anzahlSpieler > 1) {
                this.setState({
                    aktuellerSpieler: (aktuellerSpieler + 1) % anzahlSpieler,
                    aktuelleAktion: null
                });
            } else {
                this.setState({ aktuellerSpieler: 0, aktuelleAktion: null });
            }
        }
        else {
            this.setState({ gewinner: gewinner });
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

    render() {

        const { anzahlSpieler, breite, hoehe, spieler, aktionen } = this.state;

        const zeilen = [];

        for (let zeile = 0; zeile < hoehe; zeile++) {
            let spalten = [];
            for (let spalte = 0; spalte < breite; spalte++) {

                let gerade = zeile % 2 === 0;

                let position = (breite * hoehe - 1) - (gerade ? spalte + (zeile * breite) : breite - 1 - spalte + (zeile * breite));
                
                
                var borderRadius = '0 0 0 0';
                if(spalte===0 && gerade){
                    borderRadius = '0 0 0 20px';
                } else if(gerade && spalte===breite-1){
                    borderRadius = '0 20px 0 0';                
                } else if(!gerade && spalte===breite-1){
                    borderRadius = ' 0 0 20px 0';
                } else if(spalte===0){
                    borderRadius = '20px 0 0 0';
                } 

                spalten.push(<td key={spalte} style={{
                        'backgroundImage': 'ladder.svg',
                        borderRadius: borderRadius,
                        backgroundColor: 'yellow'
                    }}>{zeile}-{spalte} ({position})

                {spieler.filter(s => s.position === position).map(s => <div key={s.id}>Spieler {s.id}</div>)}

                </td>);
            }
            zeilen.push(<tr key={zeile}>{spalten}</tr>);
        }

        const brett = <table>
            <tbody>{zeilen}</tbody>
        </table>;

        const aktionenListe = <div>
            {aktionen.map(aktion =>
                <Aktion key={aktion.name} aktion={aktion} spielzugFunktion={() => this.spielzug(aktion)} aufdeckenFunktion={() => this.aufdecken(aktion)} />
            )}
        </div>

        return (<>

            {!this.state.gestartet && (
                <>
                    Hallo, wieviele Spieler?
                    <input value={anzahlSpieler} name="anzahlSpieler" onChange={(event) => this.setState({ anzahlSpieler: event.target.value })} />
                    <input type="button" defaultValue="Start"
                        onClick={this.starteSpiel.bind(this)} /></>)}

            {this.state.gewinner && (
                <>Gewinner ist Spieler {this.state.gewinner.id}</>)
            }

            {this.state.gestartet && <>
                Aktueller Spieler: Spieler {this.state.aktuellerSpieler}
                <div>
                    <table style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                        <tbody>
                            <tr>
                                <td width="50%">{aktionenListe}</td>
                                <td width="50%"> {brett}</td>
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