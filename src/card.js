export class Card {
  #card;
  constructor(template) {
    this.#card = template;
  }
  produceCard(details) {
    const { team1Name, team2Name, winner, tossWinner, team1Score, team2Score, team1Wickets, team2Wickets } = details;
    this.#card = this.#card.replaceAll('%team1%', team1Name)
      .replaceAll('%team2%', team2Name)
      .replaceAll('%team_winner%', winner)
      .replaceAll('%tossWinner%', tossWinner)
      .replaceAll('%difference%', Math.abs(team1Score - team2Score))
      .replaceAll('%team1Wickets%', team1Wickets)
      .replaceAll('%team2Wickets%', team2Wickets);
    return 'succed';
  };
  fetchCard() {
    return this.#card;
  }
}
export const generateCard = () => {
  const data = JSON.parse(Deno.readTextFileSync('json/match1.json'));
  const template = Deno.readTextFileSync('html/template.html');
  const cards = data.map(da => {
    const card = new Card(template);
    card.produceCard(da);
    return card.fetchCard();
  });
  return cards;
};


