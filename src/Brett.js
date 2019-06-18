import React from 'react';
import { Figur } from './Figur';

export class Brett extends React.Component {
    render() {
        const { hoehe, breite, spieler } = this.props;
        const zeilen = [];
        for (let zeile = 0; zeile < hoehe; zeile++) {
            let spalten = [];
            for (let spalte = 0; spalte < breite; spalte++) {
                let gerade = zeile % 2 === 0;
                let position = (breite * hoehe - 1) - (gerade ? spalte + (zeile * breite) : breite - 1 - spalte + (zeile * breite));
                var borderRadius = '0 0 0 0';
                var padding = '5px 0 5px 0';
                if (spalte === 0 && gerade) { // Rundung unten links
                    borderRadius = '0 0 0 20px';
                    padding = '0 0 5px 0';
                }
                else if (gerade && spalte === breite - 1) { // Rundung oben rechts
                    borderRadius = '0 20px 0 0';
                    padding = '5px 0 0 0';
                }
                else if (!gerade && spalte === breite - 1) { // rundung unten rechts
                    borderRadius = ' 0 0 20px 0';
                    padding = '0 0 5px 0';
                }
                else if (spalte === 0) { // Rundung oben links
                    borderRadius = '20px 0 0 0';
                    padding = '5px 0 0 0';
                }
                spalten.push(<td key={spalte} style={{
                    border: 0,
                    padding: padding,
                    width: 80,
                    height: 80,
                }}>
                    <div style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: borderRadius,
                        backgroundColor: 'yellow',
                        textAlign: 'center',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <h1>{position + 1}</h1>

                        {spieler.filter(s => s.position === position).map(s =>
                            <div key={s.id} style={{ position: 'absolute', marginTop: 15 * s.id - 10, }}>
                                <Figur farbe={s.farbe}/>
                            </div>)}
                    </div>


                </td>);
            }
            zeilen.push(<tr key={zeile}>{spalten}</tr>);
        }
        return (<table style={{ borderCollapse: 'collapse' }}>
            <tbody>{zeilen}</tbody>
        </table>);
    }

    
}
