import { readPuzzle } from './readPuzzle';

function getPrimeNumbers(length: number): number[] {
  const primes = [];
  let i = 3;
  while (primes.length < length) {
    if (isPrime(i)) primes.push(i);
    i++;
  }
  return primes;
}

function isPrime(num: number): boolean {
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
}

function getCardMappings(cards: string[]) {
  const mapping: { [card: string]: number } = {};
  const primes = getPrimeNumbers(cards.length);
  let i = 0;
  for (let card of cards) {
    mapping[card] = primes[primes.length - i - 1];
    i++;
  }
  return mapping;
}

class CamelCards {
  public static getType(cards: string, useJokers?: boolean): number {
    if (this.isFiveOfKind(cards, useJokers)) return 6;
    if (this.isFourOfKind(cards, useJokers)) return 5;
    if (this.isFullHouse(cards, useJokers)) return 4;
    if (this.isThreeOfKind(cards, useJokers)) return 3;
    if (this.isTwoPair(cards, useJokers)) return 2;
    if (this.isOnePair(cards, useJokers)) return 1;
    if (this.isHighCard(cards, useJokers)) return 0;
    return 0;
  }

  private static getCardsCounter(cards: string): { [key: string]: number } {
    const values = cards.split('');
    const counter: { [key: string]: number } = {};
    for (let card of values) counter[card] = (counter[card] || 0) + 1;
    return counter;
  }

  private static isFiveOfKind(cards: string, jokers?: boolean): boolean {
    if (!jokers) {
      const values = cards.split('');
      return new Set(values).size === 1;
    }
    const counter = this.getCardsCounter(cards);
    const uniqueValues = Object.keys(counter).length;
    if (uniqueValues === 1) return true;
    if (uniqueValues === 2 && counter['J']) return true;
    return false;
  }

  private static isFourOfKind(cards: string, jokers?: boolean): boolean {
    const counter = this.getCardsCounter(cards);
    if (!jokers) {
      return Object.values(counter).some((count) => count === 4);
    }
    const hasJoker = counter['J'];
    const uniqueValues = Object.keys(counter).length;
    const pairCount = Object.values(counter).filter((count) => count === 2).length;
    if (!hasJoker && Object.values(counter).some((count) => count === 4)) return true;
    if (uniqueValues == 3 && Object.values(counter).some((count) => count === 3) && hasJoker)
      return true;
    if (uniqueValues == 3 && pairCount === 2 && hasJoker === 2) return true;
    return false;
  }

  private static isFullHouse(cards: string, jokers?: boolean): boolean {
    const counter = this.getCardsCounter(cards);
    if (!jokers) {
      const uniqueValues = Object.keys(counter).length;
      return uniqueValues === 2 && Object.values(counter).some((count) => count === 3);
    }
    const hasJoker = counter['J'];
    const uniqueValues = Object.keys(counter).length;
    if (!hasJoker && uniqueValues === 2 && Object.values(counter).some((count) => count === 3))
      return true;
    const pairCount = Object.values(counter).filter((count) => count === 2).length;
    if (uniqueValues === 3 && pairCount === 2 && hasJoker) return true;
    return false;
  }

  private static isThreeOfKind(cards: string, jokers?: boolean): boolean {
    const counter = this.getCardsCounter(cards);
    if (!jokers) {
      return Object.values(counter).some((count) => count === 3);
    }
    const hasJoker = counter['J'];
    const uniqueValues = Object.keys(counter).length;
    const pairCount = Object.values(counter).filter((count) => count === 2).length;
    if (!hasJoker && Object.values(counter).some((count) => count === 3)) return true;
    if (uniqueValues === 4 && pairCount == 1 && counter['J']) return true;
    return false;
  }

  private static isTwoPair(cards: string, jokers?: boolean): boolean {
    const counter = this.getCardsCounter(cards);
    const pairCount = Object.values(counter).filter((count) => count === 2).length;
    if (!jokers) {
      return pairCount === 2;
    }
    const hasJoker = counter['J'];
    if (!hasJoker && pairCount === 2) return true;
    return false;
  }

  private static isOnePair(cards: string, jokers?: boolean): boolean {
    const counter = this.getCardsCounter(cards);
    if (!jokers) {
      return Object.values(counter).some((count) => count === 2);
    }
    const hasJoker = counter['J'];
    const uniqueValues = Object.keys(counter).length;
    if (Object.values(counter).some((count) => count === 2)) return true;
    if (uniqueValues === 5 && hasJoker) return true;
    return false;
  }

  private static isHighCard(cards: string, jokers?: boolean): boolean {
    // Implement high card logic here if needed
    return true;
  }
}

class Player {
  public handType: number;

  constructor(
    public cards: string,
    public bid: number,
    public cardValues: {
      [card: string]: number;
    },
    private useJokers?: boolean,
  ) {
    this.handType = CamelCards.getType(cards, this.useJokers);
  }

  versus(otherPlayer: Player) {
    const otherHandType = otherPlayer.handType;
    if (this.handType > otherHandType) return 1;
    if (this.handType < otherHandType) return -1;
    else {
      for (let i = 0; i < this.cards.length; i++) {
        const thisCard = this.cardValues[this.cards[i]];
        const otherCard = this.cardValues[otherPlayer.cards[i]];
        if (thisCard > otherCard) return 1;
        if (thisCard < otherCard) return -1;
      }
      return 1;
    }
  }

  print() {
    let p = this.cards;
    p += '\n' + this.bid;
    p += '\n' + this.handType;
    p += '\n---------------------';
    console.log(p);
  }
}

function getWinnings(input: string, cards: string[], useJokers?: boolean) {
  const players: Player[] = [];
  const cardValues = getCardMappings(cards);
  for (let line of input.split('\n')) {
    if (line === '') break;
    const [cards, bid] = line.split(' ');
    players.push(new Player(cards, Number(bid), cardValues, useJokers));
  }
  players.sort((a, b) => a.versus(b));
  let totalWinnings = 0;
  for (let i = 0; i < players.length; i++) {
    const player = players[i];
    totalWinnings += player.bid * (i + 1);
  }
  return totalWinnings;
}

function part1(input: string) {
  const cards = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];
  return getWinnings(input, cards);
}

function part2(input: string) {
  const cards = ['A', 'K', 'Q', 'T', '9', '8', '7', '6', '5', '4', '3', '2', 'J'];
  const useJokers = true;
  return getWinnings(input, cards, useJokers);
}

const test = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`;

const input = readPuzzle('day7');
console.log('part 1', part1(input));
console.log('part 2', part2(input));
