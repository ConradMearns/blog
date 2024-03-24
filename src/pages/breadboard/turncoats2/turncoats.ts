// const stones_per_hand = 8;
// const stones_per_faction = 21;

const stones_per_hand = 2;
const stones_per_faction = 10;

export interface AdjacencyMap {
  [cellId: number]: number[];
}

export const adjacency: AdjacencyMap = {
  0: [1, 3, 4],
  1: [2, 4],
  2: [1, 5],
  3: [0, 4, 6],
  4: [0, 1, 3, 6, 7],
  5: [2, 8, 9],
  6: [3, 4, 7],
  7: [4, 6, 8],
  8: [7, 5, 9, 10],
  9: [5, 8, 10],
  10: [8, 9],
};

export const render_map = {
  0: { row: 0, col: 1 },
  1: { row: 0, col: 2 },
  2: { row: 0, col: 3 },
  3: { row: 1, col: 0 },
  4: { row: 1, col: 1 },
  5: { row: 1, col: 3 },
  6: { row: 2, col: 1 },
  7: { row: 2, col: 2 },
  8: { row: 2, col: 3 },
  9: { row: 2, col: 4 },
  10: { row: 3, col: 3 },
};

export interface Collection {
  red: number;
  blue: number;
  black: number;
}

export type Faction = keyof Collection;
// export type Faction = 'red' | 'blue' | 'black';

export interface CollectionSet {
  [key: number]: Collection;
}

export interface Game {
  cells: CollectionSet;
  hands: CollectionSet;
  bag: Collection;
  flag: Collection;
  axe: Collection;
  negotiates: number;
  num_players: number;
  turn: number;
}

interface Action {
  type: string;
  // Other properties as needed, such as parameters for the action
}

interface NegotiateAction extends Action {
  type: "negotiate";
  drawn: Faction;
  sacrifice: Faction;
}

interface RecruitAction extends Action {
  type: "recruit";
  faction: Faction;
  territory_id: number;
}

interface MarchAction extends Action {
  type: "march";
  from_territory_id: number;
  to_territory_id: number;
  faction: Faction;
  amount: number;
}

interface BattleAction extends Action {
  type: "battle";
  territory_id: number;
  attacking_faction: Faction;
  defending_faction: Faction;
  amount: number;
}

export function empty_cell() {
  return {
    red: 0,
    blue: 0,
    black: 0,
  };
}

export function collection_total(c: Collection) {
  return c.red + c.black + c.blue;
}

export function random_from(bag: Collection) {
  let contents: Faction[] = [];

  for (let colorKey in bag) {
    const color: Faction = colorKey as Faction;
    for (let i = 0; i < bag[color]; i++) {
      contents.push(color);
    }
  }

  let piece = contents.splice(
    Math.floor(Math.random() * contents.length),
    1
  )[0];

  return piece;
}

export function draw_from_bag(game: Game, player_num: number): Game {
  let color = random_from(game.bag);

  game.bag[color]--;
  game.hands[player_num][color]++;

  return game;
}

export function place_from_bag(
  game: Game,
  cell_idx: number,
  faction: Faction | null = null,
  amount: number = 1
): Game {
  for (let i = 0; i < amount; i++) {
    let color: Faction;

    if (faction !== null) {
      color = faction;
    } else {
      color = random_from(game.bag);
    }

    game.bag[color]--;
    game.cells[cell_idx][color]++;
  }
  return game;
}

export function empty_game(num_players: number): Game {
  const num_cells = 11;

  let game: Game = {
    cells: {},
    hands: {},
    bag: {
      red: stones_per_faction,
      blue: stones_per_faction,
      black: stones_per_faction,
    },
    flag: {
      red: 0,
      blue: 0,
      black: 0,
    },
    axe: {
      red: 0,
      blue: 0,
      black: 0,
    },
    negotiates: 0,
    num_players: num_players,
    turn: 0,
  };

  for (let i = 0; i < num_players; i++) {
    game.hands = {
      ...game.hands,
      [i]: {
        red: 0,
        blue: 0,
        black: 0,
      },
    };
  }

  for (let i = 0; i < num_cells; i++) {
    game.cells = {
      ...game.cells,
      [i]: {
        red: 0,
        blue: 0,
        black: 0,
      },
    };
  }

  return game;
}

export function populate(game: Game): Game {
  game = place_from_bag(game, 2, "red", 2);
  game = place_from_bag(game, 6, "blue", 2);
  game = place_from_bag(game, 10, "black", 2);

  for (let idx in game.cells) {
    if (collection_total(game.cells[idx]) < 2) {
      game = place_from_bag(game, parseInt(idx), null, 2);
    }
  }

  for (let p = 0; p < game.num_players; p++) {
    for (let c = 0; c < stones_per_hand; c++) {
      game = draw_from_bag(game, p);
    }
  }

  //   console.log(game)

  return game;
}

// Hexagons
const hexPadding = 10;

export function hex_x(
  col: number,
  row: number,
  bias_x: number = 240,
  hexSize = 60
) {
  return (
    bias_x +
    col * (hexSize * Math.sqrt(3) + hexPadding) +
    ((row % 2) * hexSize * Math.sqrt(3)) / 2
  );
}

export function hex_y(row: number, bias_y: number = 240, hexSize = 60) {
  return bias_y + row * (hexSize * 1.5 + hexPadding);
}

// define a function to draw a hexagon at the specified position
export function hexagonPoints(x: number, y: number, hexSize = 30) {
  let points = [
    [x, y + hexSize],
    [x + (hexSize * Math.sqrt(3)) / 2, y + hexSize / 2],
    [x + (hexSize * Math.sqrt(3)) / 2, y - hexSize / 2],
    [x, y - hexSize],
    [x - (hexSize * Math.sqrt(3)) / 2, y - hexSize / 2],
    [x - (hexSize * Math.sqrt(3)) / 2, y + hexSize / 2],
  ];
  return points;
}

export function drawHexagon(x: number, y: number, hexSize = 30) {
  let points = hexagonPoints(x, y, hexSize);
  let pointString = points.map((p) => p.join(",")).join(" ");
  return pointString;
}

interface GameTreeNode {
  winning_player: string | null;
  winning_faction: Faction | null;
  action: Action | null;
  game: Game;
  children: GameTreeNode[];
}

// ties in the territory are settled by the majority in the axe
// ties in the axe are settled by the majority in the flag

export function dominant(collection: Collection, tiebreaker: Faction | null) {
  let maxCount = 0;
  let dominantFaction: Faction | null = null;

  for (let faction of Object.keys(collection)) {
    const count = collection[faction as Faction];
    if (count > maxCount) {
      maxCount = count;
      dominantFaction = faction as Faction;
    } else if (count === maxCount) {
      if (tiebreaker !== null && count > 0) {
        dominantFaction = tiebreaker;
      } else {
        dominantFaction = null;
      }
    }
  }

  return dominantFaction;
}

export function dominant_collection(collection: Collection, game: Game) {
  const winning_flag = dominant(game.flag, null);
  const winning_axe = dominant(game.axe, winning_flag);
  return dominant(collection, winning_axe);
}

export function dominant_faction(game: Game) {
  let cell_counts: Collection = { red: 0, blue: 0, black: 0 };

  for (let cell in game.cells) {
    const winner = dominant_collection(game.cells[cell], game);
    if (winner !== null) {
      cell_counts[winner]++;
    }
  }

  return dominant_collection(cell_counts, game);
}

export function dominant_player(game: Game) {
  const winning_faction = dominant_faction(game);

  if (winning_faction === null) {
    return null
  }

  let maxCount = 0;
  let dominant_player: string | null = null

  for (let player_id in game.hands) {
    if (game.hands[player_id][winning_faction] == maxCount) {
      dominant_player = null
    }
    if (game.hands[player_id][winning_faction] > maxCount) {
      maxCount = game.hands[player_id][winning_faction]
      dominant_player = player_id
    }
  }

  return dominant_player
}

export function factions_in_collection(colelction: Collection): Faction[] {
  const f: Faction[] = ["red", "blue", "black"];
  const factions: Faction[] = [];

  for (let faction in f) {
    if (colelction[f[faction]] > 0) {
      factions.push(f[faction]);
    }
  }

  return factions;
}

export function factions_in_hand(game: Game, player_id: number): Faction[] {
  return factions_in_collection(game.hands[player_id]);
}

export function generateGameTree(
  action: Action | null,
  game: Game,
  depth: number
): GameTreeNode {
  const winning_player = dominant_player(game);
  const winning_faction = dominant_faction(game);

  if (depth === 0) {
    return { winning_player, winning_faction, action, game, children: [] };
  } else {
    // Generate possible actions
    const possibleActions: Action[] = generatePossibleActions(game);

    // Generate child nodes for each possible action
    const children: GameTreeNode[] = [];
    for (const action of possibleActions) {
      const newGameState = applyAction(game, action);
      const childNode = generateGameTree(action, newGameState, depth - 1);
      children.push(childNode);
    }

    return { winning_player, winning_faction, action, game, children };
  }
}

export function generatePossibleNegotiateActions(
  game: Game
): NegotiateAction[] {
  const factions_in_bag = factions_in_collection(game.bag);

  const factions: Faction[] = ["red", "blue", "black"];
  const negotiateActions: NegotiateAction[] = [];

  // Generate combinations of drawn and sacrifice factions
  factions_in_bag.forEach((drawn) => {
    new Set([...factions, drawn]).forEach((sacrifice) => {
      negotiateActions.push({ type: "negotiate", drawn, sacrifice });
    });
  });

  return negotiateActions;
}

export function generatePossibleRecruitActions(game: Game): RecruitAction[] {
  const factions = factions_in_hand(game, currentPlayer(game));
  const recruitActions: RecruitAction[] = [];

  // Generate combinations of drawn and sacrifice factions
  factions.forEach((faction) => {
    for (let cell in game.cells) {
      recruitActions.push({
        type: "recruit",
        territory_id: parseInt(cell),
        faction,
      });
    }
  });

  return recruitActions;
}

export function cellsWithFaction(game: Game, faction: Faction) {
  const matches = [];
  for (let c in game.cells) {
    if (game.cells[c][faction] > 0) {
      matches.push(c);
    }
  }
  return matches;
}

function range(n: number): number[] {
  return Array.from({ length: n }, (_, i) => i + 1);
}

export function generatePossibleMarchActions(game: Game): MarchAction[] {
  // const factions: Faction[] = ['red', 'blue', 'black'];
  const factions = factions_in_hand(game, currentPlayer(game));
  const marchActions: MarchAction[] = [];

  factions.forEach((faction) => {
    for (let f in cellsWithFaction(game, faction)) {
      for (let t in adjacency[f]) {
        const cells = range(game.cells[f][faction]);
        for (let n in cells) {
          marchActions.push({
            type: "march",
            faction: faction,
            from_territory_id: parseInt(f),
            to_territory_id: parseInt(t),
            amount: cells[parseInt(n)],
          });
        }
      }
    }
  });

  return marchActions;
}

export function generatePossibleBattleActions(game: Game): BattleAction[] {
  // const factions: Faction[] = ['red', 'blue', 'black'];
  const factions = factions_in_hand(game, currentPlayer(game));
  const battleActions: BattleAction[] = [];

  // amount: number

  factions.forEach((attacking_faction) => {
    for (let f in cellsWithFaction(game, attacking_faction)) {
      const defending_factions = factions_in_collection(game.cells[f]).filter(
        (faction) => faction !== attacking_faction
      );
      for (let df in defending_factions) {
        const cells = range(game.cells[f][attacking_faction]);
        for (let n in cells) {
          battleActions.push({
            type: "battle",
            attacking_faction,
            defending_faction: defending_factions[df],
            territory_id: parseInt(f),
            amount: cells[parseInt(n)],
          });
        }
      }
    }
  });

  return battleActions;
}

export function generatePossibleActions(game: Game): Action[] {
  return [
    ...generatePossibleNegotiateActions(game),
    ...generatePossibleRecruitActions(game),
    ...generatePossibleMarchActions(game),
    ...generatePossibleBattleActions(game),
  ];
}

function deepCopy<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

function currentPlayer(game: Game) {
  return game.turn % game.num_players;
}

function applyNegotiateAction(game: Game, action: NegotiateAction) {
  game.bag[action.drawn]--;
  game.hands[currentPlayer(game)][action.drawn]++;
  game.hands[currentPlayer(game)][action.sacrifice]--;
  game.bag[action.sacrifice]++;

  game.negotiates++;
  return game;
}

function applyRecruitAction(game: Game, action: RecruitAction) {
  game.hands[currentPlayer(game)][action.faction]--;
  game.cells[action.territory_id][action.faction]++;

  return game;
}

function applyMarchAction(game: Game, action: MarchAction) {
  game.hands[currentPlayer(game)][action.faction]--;
  game.flag[action.faction]++;

  game.cells[action.from_territory_id][action.faction] -= action.amount;
  game.cells[action.to_territory_id][action.faction] += action.amount;

  return game;
}

function applyBattleAction(game: Game, action: BattleAction) {
  game.hands[currentPlayer(game)][action.attacking_faction]--;
  game.axe[action.attacking_faction]++;

  game.cells[action.territory_id][action.defending_faction] -= action.amount;

  return game;
}

// Function to apply an action to the game state and produce a new game state
function applyAction(game: Game, action: Action): Game {
  const game_copy: Game = deepCopy(game);
  let new_game = game_copy;
  // const newGameState: Game = { ...game }; // Clone the current game state

  if (action.type === "negotiate") {
    new_game = applyNegotiateAction(game_copy, action as NegotiateAction);
  }

  if (action.type === "recruit") {
    new_game = applyRecruitAction(game_copy, action as RecruitAction);
  }

  if (action.type == "march") {
    new_game = applyMarchAction(game_copy, action as MarchAction);
  }

  if (action.type == "battle") {
    new_game = applyBattleAction(game_copy, action as BattleAction);
  }

  new_game.turn++;

  return new_game;
}

// Example usage
// const initialGame: Game = /* Initialize your initial game state */;
// const depth = 3; // Depth of the game tree
// const gameTree = generateGameTree(initialGame, depth);
// console.log(gameTree);
