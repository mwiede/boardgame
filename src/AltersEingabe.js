import React from 'react';
export function AltersEingabe(props) {
    const { spieler, zahlen, setzeSpielerAlter } = props;
    return <div>Spieler {spieler.id + 1}, Wie alt bist du?<br />
        {zahlen.map((zahl) => <svg key={zahl} height="100" width="100" onClick={() => setzeSpielerAlter(spieler, zahl)}>
            <circle cx="50" cy="50" r="30" stroke="black" strokeWidth="2" fill="white" />
            <text x="50%" y="50%" textAnchor="middle">{zahl}</text>
        </svg>)}
    </div>;
}
