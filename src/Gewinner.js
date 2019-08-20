import React from 'react';
export function Gewinner(props) {
    const { gewinner } = props;
    return (<>
        <h1>Ende!</h1>
        Gewinner ist: <br />
        <svg height="100" width="100">
            <circle cx="50" cy="50" r="30" stroke="black" strokeWidth="2" fill={gewinner.farbe.css} />
            <text x="50%" y="50%" textAnchor="middle">
                Spieler {gewinner.id}
            </text>
        </svg>
    </>);
}
