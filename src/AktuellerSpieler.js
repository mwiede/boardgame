import React from 'react';
export function AktuellerSpieler(props) {
    const { spieler } = props;
    return (<>
        Aktueller Spieler:<br />
        <svg height="100" width="100">
            <circle cx="50" cy="50" r="30" stroke="black" strokeWidth="2" fill={spieler.farbe.css} />
            <text x="50%" y="50%" textAnchor="middle">
                Spieler {spieler.id + 1}
            </text>

        </svg>
    </>);
}
