import React from 'react';

export function FarbEingabe(props) {
    const { spieler, farben, setzeSpielerFarbe } = props;
    return (<div>Spieler {spieler.id + 1}, Welche Farbe möchtest du?<br />
        {farben.map((farbe) => <svg key={farbe.css} height="100" width="100" onClick={() => setzeSpielerFarbe(spieler, farbe)}>
            <circle cx="50" cy="50" r="30" stroke="black" strokeWidth="2" fill={farbe.css} />
        </svg>)}
    </div>);
}
