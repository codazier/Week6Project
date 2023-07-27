console.log ("Let's play a game of War!")

class Player {
    constructor(name) {
        this.name = name;
        this.score = 0;
    }
}

class Game {
    constructor() {
        this.deck = this.makeDeck();
        this.player1 = new Player('');
        this.player2 = new Player('');
        this.splitDeck();
    }

    splitDeck() {
        this.player1.hand = this.deck.splice(0, 26);
        this.player2.hand = this.deck.splice(0, 26);
    }

    makeDeck() {
        let newDeck = [];
        let rank = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        let suit = ["♠", "♣", "♥", "♦"];

        for (let r of rank) {
            for (let s of suit) {
                let card = new Card(r, s);
                newDeck.push(card);
            }
        }

        newDeck = this.shuffle(newDeck);

        return newDeck;
    }

    shuffle(array) {
        let currentIndex = array.length,
            randomIndex;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }

        return array;
    }

    gameLogic() {
        while (this.player1.hand.length !== 0 && this.player2.hand.length !== 0) {
            const player1Card = this.player1.hand.shift();
            const player2Card = this.player2.hand.shift();

            console.log(`
                Player 1 Card: ${player1Card.rank}${player1Card.suit}
                Player 2 Card: ${player2Card.rank}${player2Card.suit}
            `);

            if (this.getCardValue(player1Card) > this.getCardValue(player2Card)) {
                this.player1.score++;
                console.log(`
                    Player 1 gets a point!
                    Current Score: p1: ${this.player1.score}, p2: ${this.player2.score}
                `);
            } else if (this.getCardValue(player1Card) < this.getCardValue(player2Card)) {
                this.player2.score++;
                console.log(`
                    Player 2 gets a point!
                    Current Score: p1: ${this.player1.score}, p2: ${this.player2.score}
                `);
            } else {
                console.log(`
                    It's a tie! No points for anyone...
                    Current Score: p1: ${this.player1.score}, p2: ${this.player2.score}
                `);
            }
        }

        console.log('GAME OVER');
        console.log(`Final Score: 
            Player 1: ${this.player1.score}
            Player 2: ${this.player2.score}
        `);

        if (this.player1.score > this.player2.score) {
            console.log('Player 1 wins!!!');
        } else if (this.player1.score < this.player2.score) {
            console.log('Player 2 wins!!!');
        } else {
            console.log("It's a tie!");
        }
    }

    getCardValue(card) {
        const rankValue = {
            '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'J': 11, 'Q': 12, 'K': 13, 'A': 14
        };

        return rankValue[card.rank];
    }
}

class Card {
    constructor(rank, suit) {
        this.rank = rank;
        this.suit = suit;
    }
}

const game = new Game();
game.gameLogic();