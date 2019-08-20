
export const MSG = {

    SPIELER_WELCHE_FARBE : (spieler) => `Spieler ${spieler.id+1}, welche Farbe möchtest du?`,
    SPIELER_WELCHES_ALTER : (spieler) => `Spieler ${spieler.id+1}, wie alt bist du?`,
    SPIELER_FARBE_IST_DRAN: (spieler) => `Spieler ${spieler.farbe.name}, du bist dran!`,
    SPIELER_NUMMBER_IST_DRAN: (spieler) => `Spieler ${spieler.id}, du bist dran!`,
    GEWINNER : `Du hast gewonnen!`,
    KARTE_SCHON_AUFGEDECKT: `Karte schon aufgedeckt, wähle eine andere.`,
};