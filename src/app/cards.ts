export const ACE = Object.freeze<{ id: 'A', name: 'ACE' }>({id: 'A', name: 'ACE'});
export const TWO = Object.freeze<{ id: '2', name: 'TWO' }>({id: '2', name: 'TWO'});
export const THREE = Object.freeze<{ id: '3', name: 'THREE' }>({id: '3', name: 'THREE'});
export const FOUR = Object.freeze<{ id: '4', name: 'FOUR' }>({id: '4', name: 'FOUR'});
export const FIVE = Object.freeze<{ id: '5', name: 'FIVE' }>({id: '5', name: 'FIVE'});
export const SIX = Object.freeze<{ id: '6', name: 'SIX' }>({id: '6', name: 'SIX'});
export const SEVEN = Object.freeze<{ id: '7', name: 'SEVEN' }>({id: '7', name: 'SEVEN'});
export const EIGHT = Object.freeze<{ id: '8', name: 'EIGHT' }>({id: '8', name: 'EIGHT'});
export const NINE = Object.freeze<{ id: '9', name: 'NINE' }>({id: '9', name: 'NINE'});
export const TEN = Object.freeze<{ id: 'T', name: 'TEN' }>({id: 'T', name: 'TEN'});
export const JACK = Object.freeze<{ id: 'J', name: 'JACK' }>({id: 'J', name: 'JACK'});
export const QUEEN = Object.freeze<{ id: 'Q', name: 'QUEEN' }>({id: 'Q', name: 'QUEEN'});
export const KING = Object.freeze<{ id: 'K', name: 'KING' }>({id: 'K', name: 'KING'});

type Rank =
  typeof ACE | typeof TWO | typeof THREE | typeof FOUR | typeof FIVE | typeof SIX | typeof SEVEN |
  typeof EIGHT | typeof NINE | typeof TEN | typeof JACK | typeof QUEEN | typeof KING;

export const RANKS = Object.freeze({ACE, TWO, THREE, FOUR, FIVE, SIX, SEVEN, EIGHT, NINE, TEN, JACK, QUEEN, KING});

const CLUBS = Object.freeze<{ id: '♣', name: 'CLUBS', color: 'black' }>({id: '♣', name: 'CLUBS', color: 'black'});
const DIAMONDS = Object.freeze<{ id: '♦', name: 'DIAMONDS', color: 'red' }>({id: '♦', name: 'DIAMONDS', color: 'red'});
const HEARTS = Object.freeze<{ id: '♥', name: 'HEARTS', color: 'red' }>({id: '♥', name: 'HEARTS', color: 'red'});
const SPADES = Object.freeze<{ id: '♠', name: 'SPADES', color: 'black' }>({id: '♠', name: 'SPADES', color: 'black'});

type Suit = typeof CLUBS | typeof DIAMONDS | typeof HEARTS | typeof SPADES;

export const SUITS = Object.freeze({CLUBS, DIAMONDS, HEARTS, SPADES});

const ACE_OF_CLUBS = Object.freeze({
  id: '1♣' as '1♣', name: 'ACE_OF_CLUBS' as 'ACE_OF_CLUBS', rank: ACE, suit: CLUBS, color: 'black' as 'black'
});
const TWO_OF_CLUBS = Object.freeze({
  id: '2♣' as '2♣', name: 'TWO_OF_CLUBS' as 'TWO_OF_CLUBS', rank: TWO, suit: CLUBS, color: 'black' as 'black'
});
const THREE_OF_CLUBS = Object.freeze({
  id: '3♣' as '3♣', name: 'THREE_OF_CLUBS' as 'THREE_OF_CLUBS', rank: THREE, suit: CLUBS, color: 'black' as 'black'
});
const FOUR_OF_CLUBS = Object.freeze({
  id: '4♣' as '4♣', name: 'FOUR_OF_CLUBS' as 'FOUR_OF_CLUBS', rank: FOUR, suit: CLUBS, color: 'black' as 'black'
});
const FIVE_OF_CLUBS = Object.freeze({
  id: '5♣' as '5♣', name: 'FIVE_OF_CLUBS' as 'FIVE_OF_CLUBS', rank: FIVE, suit: CLUBS, color: 'black' as 'black'
});
const SIX_OF_CLUBS = Object.freeze({
  id: '6♣' as '6♣', name: 'SIX_OF_CLUBS' as 'SIX_OF_CLUBS', rank: SIX, suit: CLUBS, color: 'black' as 'black'
});
const SEVEN_OF_CLUBS = Object.freeze({
  id: '7♣' as '7♣', name: 'SEVEN_OF_CLUBS' as 'SEVEN_OF_CLUBS', rank: SEVEN, suit: CLUBS, color: 'black' as 'black'
});
const EIGHT_OF_CLUBS = Object.freeze({
  id: '8♣' as '8♣', name: 'EIGHT_OF_CLUBS' as 'EIGHT_OF_CLUBS', rank: EIGHT, suit: CLUBS, color: 'black' as 'black'
});
const NINE_OF_CLUBS = Object.freeze({
  id: '9♣' as '9♣', name: 'NINE_OF_CLUBS' as 'NINE_OF_CLUBS', rank: NINE, suit: CLUBS, color: 'black' as 'black'
});
const TEN_OF_CLUBS = Object.freeze({
  id: 'T♣' as 'T♣', name: 'TEN_OF_CLUBS' as 'TEN_OF_CLUBS', rank: TEN, suit: CLUBS, color: 'black' as 'black'
});
const JACK_OF_CLUBS = Object.freeze({
  id: 'J♣' as 'J♣', name: 'JACK_OF_CLUBS' as 'JACK_OF_CLUBS', rank: JACK, suit: CLUBS, color: 'black' as 'black'
});
const QUEEN_OF_CLUBS = Object.freeze({
  id: 'Q♣' as 'Q♣', name: 'QUEEN_OF_CLUBS' as 'QUEEN_OF_CLUBS', rank: QUEEN, suit: CLUBS, color: 'black' as 'black'
});
const KING_OF_CLUBS = Object.freeze({
  id: 'K♣' as 'K♣', name: 'KING_OF_CLUBS' as 'KING_OF_CLUBS', rank: KING, suit: CLUBS, color: 'black' as 'black'
});

const ACE_OF_DIAMONDS = Object.freeze({
  id: '1♦' as '1♦', name: 'ACE_OF_DIAMONDS' as 'ACE_OF_DIAMONDS', rank: ACE, suit: DIAMONDS, color: 'red' as 'red'
});
const TWO_OF_DIAMONDS = Object.freeze({
  id: '2♦' as '2♦', name: 'TWO_OF_DIAMONDS' as 'TWO_OF_DIAMONDS', rank: TWO, suit: DIAMONDS, color: 'red' as 'red'
});
const THREE_OF_DIAMONDS = Object.freeze({
  id: '3♦' as '3♦', name: 'THREE_OF_DIAMONDS' as 'THREE_OF_DIAMONDS', rank: THREE, suit: DIAMONDS, color: 'red' as 'red'
});
const FOUR_OF_DIAMONDS = Object.freeze({
  id: '4♦' as '4♦', name: 'FOUR_OF_DIAMONDS' as 'FOUR_OF_DIAMONDS', rank: FOUR, suit: DIAMONDS, color: 'red' as 'red'
});
const FIVE_OF_DIAMONDS = Object.freeze({
  id: '5♦' as '5♦', name: 'FIVE_OF_DIAMONDS' as 'FIVE_OF_DIAMONDS', rank: FIVE, suit: DIAMONDS, color: 'red' as 'red'
});
const SIX_OF_DIAMONDS = Object.freeze({
  id: '6♦' as '6♦', name: 'SIX_OF_DIAMONDS' as 'SIX_OF_DIAMONDS', rank: SIX, suit: DIAMONDS, color: 'red' as 'red'
});
const SEVEN_OF_DIAMONDS = Object.freeze({
  id: '7♦' as '7♦', name: 'SEVEN_OF_DIAMONDS' as 'SEVEN_OF_DIAMONDS', rank: SEVEN, suit: DIAMONDS, color: 'red' as 'red'
});
const EIGHT_OF_DIAMONDS = Object.freeze({
  id: '8♦' as '8♦', name: 'EIGHT_OF_DIAMONDS' as 'EIGHT_OF_DIAMONDS', rank: EIGHT, suit: DIAMONDS, color: 'red' as 'red'
});
const NINE_OF_DIAMONDS = Object.freeze({
  id: '9♦' as '9♦', name: 'NINE_OF_DIAMONDS' as 'NINE_OF_DIAMONDS', rank: NINE, suit: DIAMONDS, color: 'red' as 'red'
});
const TEN_OF_DIAMONDS = Object.freeze({
  id: 'T♦' as 'T♦', name: 'TEN_OF_DIAMONDS' as 'TEN_OF_DIAMONDS', rank: TEN, suit: DIAMONDS, color: 'red' as 'red'
});
const JACK_OF_DIAMONDS = Object.freeze({
  id: 'J♦' as 'J♦', name: 'JACK_OF_DIAMONDS' as 'JACK_OF_DIAMONDS', rank: JACK, suit: DIAMONDS, color: 'red' as 'red'
});
const QUEEN_OF_DIAMONDS = Object.freeze({
  id: 'Q♦' as 'Q♦', name: 'QUEEN_OF_DIAMONDS' as 'QUEEN_OF_DIAMONDS', rank: QUEEN, suit: DIAMONDS, color: 'red' as 'red'
});
const KING_OF_DIAMONDS = Object.freeze({
  id: 'K♦' as 'K♦', name: 'KING_OF_DIAMONDS' as 'KING_OF_DIAMONDS', rank: KING, suit: DIAMONDS, color: 'red' as 'red'
});

const ACE_OF_HEARTS = Object.freeze({
  id: '1♥' as '1♥', name: 'ACE_OF_HEARTS' as 'ACE_OF_HEARTS', rank: ACE, suit: HEARTS, color: 'red' as 'red'
});
const TWO_OF_HEARTS = Object.freeze({
  id: '2♥' as '2♥', name: 'TWO_OF_HEARTS' as 'TWO_OF_HEARTS', rank: TWO, suit: HEARTS, color: 'red' as 'red'
});
const THREE_OF_HEARTS = Object.freeze({
  id: '3♥' as '3♥', name: 'THREE_OF_HEARTS' as 'THREE_OF_HEARTS', rank: THREE, suit: HEARTS, color: 'red' as 'red'
});
const FOUR_OF_HEARTS = Object.freeze({
  id: '4♥' as '4♥', name: 'FOUR_OF_HEARTS' as 'FOUR_OF_HEARTS', rank: FOUR, suit: HEARTS, color: 'red' as 'red'
});
const FIVE_OF_HEARTS = Object.freeze({
  id: '5♥' as '5♥', name: 'FIVE_OF_HEARTS' as 'FIVE_OF_HEARTS', rank: FIVE, suit: HEARTS, color: 'red' as 'red'
});
const SIX_OF_HEARTS = Object.freeze({
  id: '6♥' as '6♥', name: 'SIX_OF_HEARTS' as 'SIX_OF_HEARTS', rank: SIX, suit: HEARTS, color: 'red' as 'red'
});
const SEVEN_OF_HEARTS = Object.freeze({
  id: '7♥' as '7♥', name: 'SEVEN_OF_HEARTS' as 'SEVEN_OF_HEARTS', rank: SEVEN, suit: HEARTS, color: 'red' as 'red'
});
const EIGHT_OF_HEARTS = Object.freeze({
  id: '8♥' as '8♥', name: 'EIGHT_OF_HEARTS' as 'EIGHT_OF_HEARTS', rank: EIGHT, suit: HEARTS, color: 'red' as 'red'
});
const NINE_OF_HEARTS = Object.freeze({
  id: '9♥' as '9♥', name: 'NINE_OF_HEARTS' as 'NINE_OF_HEARTS', rank: NINE, suit: HEARTS, color: 'red' as 'red'
});
const TEN_OF_HEARTS = Object.freeze({
  id: 'T♥' as 'T♥', name: 'TEN_OF_HEARTS' as 'TEN_OF_HEARTS', rank: TEN, suit: HEARTS, color: 'red' as 'red'
});
const JACK_OF_HEARTS = Object.freeze({
  id: 'J♥' as 'J♥', name: 'JACK_OF_HEARTS' as 'JACK_OF_HEARTS', rank: JACK, suit: HEARTS, color: 'red' as 'red'
});
const QUEEN_OF_HEARTS = Object.freeze({
  id: 'Q♥' as 'Q♥', name: 'QUEEN_OF_HEARTS' as 'QUEEN_OF_HEARTS', rank: QUEEN, suit: HEARTS, color: 'red' as 'red'
});
const KING_OF_HEARTS = Object.freeze({
  id: 'K♥' as 'K♥', name: 'KING_OF_HEARTS' as 'KING_OF_HEARTS', rank: KING, suit: HEARTS, color: 'red' as 'red'
});

const ACE_OF_SPADES = Object.freeze({
  id: '1♠' as '1♠', name: 'ACE_OF_SPADES' as 'ACE_OF_SPADES', rank: ACE, suit: SPADES, color: 'black' as 'black'
});
const TWO_OF_SPADES = Object.freeze({
  id: '2♠' as '2♠', name: 'TWO_OF_SPADES' as 'TWO_OF_SPADES', rank: TWO, suit: SPADES, color: 'black' as 'black'
});
const THREE_OF_SPADES = Object.freeze({
  id: '3♠' as '3♠', name: 'THREE_OF_SPADES' as 'THREE_OF_SPADES', rank: THREE, suit: SPADES, color: 'black' as 'black'
});
const FOUR_OF_SPADES = Object.freeze({
  id: '4♠' as '4♠', name: 'FOUR_OF_SPADES' as 'FOUR_OF_SPADES', rank: FOUR, suit: SPADES, color: 'black' as 'black'
});
const FIVE_OF_SPADES = Object.freeze({
  id: '5♠' as '5♠', name: 'FIVE_OF_SPADES' as 'FIVE_OF_SPADES', rank: FIVE, suit: SPADES, color: 'black' as 'black'
});
const SIX_OF_SPADES = Object.freeze({
  id: '6♠' as '6♠', name: 'SIX_OF_SPADES' as 'SIX_OF_SPADES', rank: SIX, suit: SPADES, color: 'black' as 'black'
});
const SEVEN_OF_SPADES = Object.freeze({
  id: '7♠' as '7♠', name: 'SEVEN_OF_SPADES' as 'SEVEN_OF_SPADES', rank: SEVEN, suit: SPADES, color: 'black' as 'black'
});
const EIGHT_OF_SPADES = Object.freeze({
  id: '8♠' as '8♠', name: 'EIGHT_OF_SPADES' as 'EIGHT_OF_SPADES', rank: EIGHT, suit: SPADES, color: 'black' as 'black'
});
const NINE_OF_SPADES = Object.freeze({
  id: '9♠' as '9♠', name: 'NINE_OF_SPADES' as 'NINE_OF_SPADES', rank: NINE, suit: SPADES, color: 'black' as 'black'
});
const TEN_OF_SPADES = Object.freeze({
  id: 'T♠' as 'T♠', name: 'TEN_OF_SPADES' as 'TEN_OF_SPADES', rank: TEN, suit: SPADES, color: 'black' as 'black'
});
const JACK_OF_SPADES = Object.freeze({
  id: 'J♠' as 'J♠', name: 'JACK_OF_SPADES' as 'JACK_OF_SPADES', rank: JACK, suit: SPADES, color: 'black' as 'black'
});
const QUEEN_OF_SPADES = Object.freeze({
  id: 'Q♠' as 'Q♠', name: 'QUEEN_OF_SPADES' as 'QUEEN_OF_SPADES', rank: QUEEN, suit: SPADES, color: 'black' as 'black'
});
const KING_OF_SPADES = Object.freeze({
  id: 'K♠' as 'K♠', name: 'KING_OF_SPADES' as 'KING_OF_SPADES', rank: KING, suit: SPADES, color: 'black' as 'black'
});

export type Face =
  typeof ACE_OF_CLUBS | typeof TWO_OF_CLUBS | typeof THREE_OF_CLUBS | typeof FOUR_OF_CLUBS | typeof FIVE_OF_CLUBS |
  typeof SIX_OF_CLUBS | typeof SEVEN_OF_CLUBS | typeof EIGHT_OF_CLUBS | typeof NINE_OF_CLUBS | typeof TEN_OF_CLUBS |
  typeof JACK_OF_CLUBS | typeof QUEEN_OF_CLUBS | typeof KING_OF_CLUBS | typeof ACE_OF_DIAMONDS | typeof TWO_OF_DIAMONDS |
  typeof THREE_OF_DIAMONDS | typeof FOUR_OF_DIAMONDS | typeof FIVE_OF_DIAMONDS | typeof SIX_OF_DIAMONDS | typeof SEVEN_OF_DIAMONDS |
  typeof EIGHT_OF_DIAMONDS | typeof NINE_OF_DIAMONDS | typeof TEN_OF_DIAMONDS | typeof JACK_OF_DIAMONDS | typeof QUEEN_OF_DIAMONDS |
  typeof KING_OF_DIAMONDS | typeof ACE_OF_HEARTS | typeof TWO_OF_HEARTS | typeof THREE_OF_HEARTS | typeof FOUR_OF_HEARTS |
  typeof FIVE_OF_HEARTS | typeof SIX_OF_HEARTS | typeof SEVEN_OF_HEARTS | typeof EIGHT_OF_HEARTS | typeof NINE_OF_HEARTS |
  typeof TEN_OF_HEARTS | typeof JACK_OF_HEARTS | typeof QUEEN_OF_HEARTS | typeof KING_OF_HEARTS | typeof ACE_OF_SPADES |
  typeof TWO_OF_SPADES | typeof THREE_OF_SPADES | typeof FOUR_OF_SPADES | typeof FIVE_OF_SPADES | typeof SIX_OF_SPADES |
  typeof SEVEN_OF_SPADES | typeof EIGHT_OF_SPADES | typeof NINE_OF_SPADES | typeof TEN_OF_SPADES | typeof JACK_OF_SPADES |
  typeof QUEEN_OF_SPADES | typeof KING_OF_SPADES;

export type FaceId = '1♣' | '2♣' | '3♣' | '4♣' | '5♣' | '6♣' | '7♣' | '8♣' | '9♣' | 'T♣' | 'J♣' | 'Q♣' | 'K♣' |
  '1♦' | '2♦' | '3♦' | '4♦' | '5♦' | '6♦' | '7♦' | '8♦' | '9♦' | 'T♦' | 'J♦' | 'Q♦' | 'K♦' |
  '1♥' | '2♥' | '3♥' | '4♥' | '5♥' | '6♥' | '7♥' | '8♥' | '9♥' | 'T♥' | 'J♥' | 'Q♥' | 'K♥' |
  '1♠' | '2♠' | '3♠' | '4♠' | '5♠' | '6♠' | '7♠' | '8♠' | '9♠' | 'T♠' | 'J♠' | 'Q♠' | 'K♠';


export const FACES = Object.freeze({
  '1♣': ACE_OF_CLUBS, '2♣': TWO_OF_CLUBS, '3♣': THREE_OF_CLUBS, '4♣': FOUR_OF_CLUBS, '5♣': FIVE_OF_CLUBS,
  '6♣': SIX_OF_CLUBS, '7♣': SEVEN_OF_CLUBS, '8♣': EIGHT_OF_CLUBS, '9♣': NINE_OF_CLUBS, 'T♣': TEN_OF_CLUBS,
  'J♣': JACK_OF_CLUBS, 'Q♣': QUEEN_OF_CLUBS, 'K♣': KING_OF_CLUBS,

  '1♦': ACE_OF_DIAMONDS, '2♦': TWO_OF_DIAMONDS, '3♦': THREE_OF_DIAMONDS, '4♦': FOUR_OF_DIAMONDS, '5♦': FIVE_OF_DIAMONDS,
  '6♦': SIX_OF_DIAMONDS, '7♦': SEVEN_OF_DIAMONDS, '8♦': EIGHT_OF_DIAMONDS, '9♦': NINE_OF_DIAMONDS, 'T♦': TEN_OF_DIAMONDS,
  'J♦': JACK_OF_DIAMONDS, 'Q♦': QUEEN_OF_DIAMONDS, 'K♦': KING_OF_DIAMONDS,

  '1♥': ACE_OF_HEARTS, '2♥': TWO_OF_HEARTS, '3♥': THREE_OF_HEARTS, '4♥': FOUR_OF_HEARTS, '5♥': FIVE_OF_HEARTS,
  '6♥': SIX_OF_HEARTS, '7♥': SEVEN_OF_HEARTS, '8♥': EIGHT_OF_HEARTS, '9♥': NINE_OF_HEARTS, 'T♥': TEN_OF_HEARTS,
  'J♥': JACK_OF_HEARTS, 'Q♥': QUEEN_OF_HEARTS, 'K♥': KING_OF_HEARTS,

  '1♠': ACE_OF_SPADES, '2♠': TWO_OF_SPADES, '3♠': THREE_OF_SPADES, '4♠': FOUR_OF_SPADES, '5♠': FIVE_OF_SPADES,
  '6♠': SIX_OF_SPADES, '7♠': SEVEN_OF_SPADES, '8♠': EIGHT_OF_SPADES, '9♠': NINE_OF_SPADES, 'T♠': TEN_OF_SPADES,
  'J♠': JACK_OF_SPADES, 'Q♠': QUEEN_OF_SPADES, 'K♠': KING_OF_SPADES,
});

export const DECK = Object.freeze(Object.values(FACES));
export const FACE_IDS = Object.freeze(Object.keys(FACES) as FaceId[]);


