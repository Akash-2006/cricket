import { describe, it } from 'jsr:@std/testing/bdd';
import { assertEquals } from 'jsr:@std/assert/equals';
import { Card } from '../src/card.js';

describe('creating the card', () => {
  it('creating the card with all informations present', () => {
    const template = `
      <div>
        <h2>Mumbai Indians vs Chennai Super Kings</h2>
        <p>Winner: Mumbai Indians</p>
        <p>Toss Winner: Chennai Super Kings</p>
        <p>Score Difference: 13</p>
        <p>Mumbai Indians Wickets: 6</p>
        <p>Chennai Super Kings Wickets: 8</p>
      </div>
    `;

    const details = {
      team1Name: "Mumbai Indians",
      team2Name: "Chennai Super Kings",
      winner: "Mumbai Indians",
      tossWinner: "Chennai Super Kings",
      team1Score: 185,
      team2Score: 172,
      team1Wickets: 6,
      team2Wickets: 8
    };
    const card = new Card(template);
    card.produceCard(details);
    assertEquals(card.fetchCard(), template);
  });
});