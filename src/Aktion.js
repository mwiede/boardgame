import React from 'react';
export class Aktion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ausgefuehrt: false,
        };
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
        return (<>
            <svg height="100" width="100" onClick={this.aufdecken.bind(this)}>
                <circle cx="50" cy="50" r="40" stroke="black" strokeWidth="2" fill="red" />
                {aktion.aufgedeckt && aktion.logo}
            </svg>
        </>);
    }
}
