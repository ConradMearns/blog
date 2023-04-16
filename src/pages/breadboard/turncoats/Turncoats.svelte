<script>
  import { onMount } from "svelte";

  import Flag from "./flag.svg";
  import Axe from "./battle-axe.svg";

  let hexPadding = 10; // the padding between each hexagon

  const TerritoryType = {
    Normal: "transparent",
    Blocked: "gray",
    Red: "red",
    Blue: "skyblue",
    Black: "black",
  };

  const PieceType = {
    Red: "red",
    Blue: "skyblue",
    Black: "black",
  };

  function winning_color_in(place) {
    let count = {};
    let maxCount = 0;
    let winner = "none";

    for (let i = 0; i < place.length; i++) {
      let piece = place[i];
      count[piece] = (count[piece] || 0) + 1;

      if (count[piece] > maxCount) {
        maxCount = count[piece];
        winner = piece;
      } else if (count[piece] === maxCount) {
        winner = "none";
      }
    }

    return winner;
  }

  class Territory {
    constructor(row, col, type) {
      this.col = col;
      this.row = row;
      this.type = type;
      this.pieces = [];
    }

    winning_color() {
      // TODO: Not duplicated to winning_color_in because
      // flag and axe rules need to be added
      let count = {};
      let maxCount = 0;
      let winner = "green";

      for (let i = 0; i < this.pieces.length; i++) {
        let piece = this.pieces[i];
        count[piece] = (count[piece] || 0) + 1;

        if (count[piece] > maxCount) {
          maxCount = count[piece];
          winner = piece;
        } else if (count[piece] === maxCount) {
          winner = "green";
        }
      }

      return winner;
    }
  }

  class Game {
    constructor(player_count) {
      this.player_count = player_count;
      this.current_player = 0;
      this.turn_count = 0;
      this.territories = [];
      this.bag = [];
      this.hands = [];
      this.flag = []
      this.axe = []
    }

    setup() {
      this.bag = Array(21)
        .fill([PieceType.Red, PieceType.Blue, PieceType.Black])
        .flat();

      // TODO: Reset Grid Pieces
      this.territories = [
        new Territory(0, 1, TerritoryType.Normal),
        new Territory(0, 2, TerritoryType.Normal),
        new Territory(0, 3, TerritoryType.Red),
        new Territory(1, 0, TerritoryType.Normal),
        new Territory(1, 1, TerritoryType.Normal),
        new Territory(1, 3, TerritoryType.Normal),
        new Territory(2, 1, TerritoryType.Blue),
        new Territory(2, 2, TerritoryType.Normal),
        new Territory(2, 3, TerritoryType.Normal),
        new Territory(2, 4, TerritoryType.Normal),
        new Territory(3, 3, TerritoryType.Black),
        // new Territory(1, 2, TerritoryType.Blocked),
      ];

      this.hands = Array.from(Array(this.player_count), () => []);

      // console.log("Territory")
      for (let i = 0; i < this.territories.length; i++) {
        for (let j = 0; j < 2; j++) {
          if (this.territories[i].type == TerritoryType.Red) {
            this.territories[i].pieces.push(pull_stone_from_bag(PieceType.Red));
          } else if (this.territories[i].type == TerritoryType.Blue) {
            this.territories[i].pieces.push(pull_stone_from_bag(PieceType.Blue));
          } else if (this.territories[i].type == TerritoryType.Black) {
            this.territories[i].pieces.push(pull_stone_from_bag(PieceType.Black));
          } else {
            this.territories[i].pieces.push(pull_from_bag());
          }
        }
      }

      // Hands
      for (let i = 0; i < hands.length; i++) {
        for (let j = 0; j < 8; j++) {
          hands[i].push(pull_from_bag());
        }
      }
    }

    next_turn() {
      this.turn_count += 1;
      this.current_player += 1;
      this.current_player %= this.player_count;
    }
  }

  let territories = [];
  let bag = [];
  let hand_count = 2;
  let hands = [];

  let current_turn = 0;

  function pull_stone_from_bag(stone) {
    const index = bag.indexOf(stone);
    let piece = bag.splice(index, 1)[0];
    bag = bag;
    return piece;
  }

  function remove_stone_from(stone, place) {
    const index = place.indexOf(stone);
    place.splice(index, 1)[0];
    return place;
  }

  function pull_from_bag() {
    let piece = bag.splice(Math.floor(Math.random() * bag.length), 1)[0];
    bag = bag;
    return piece;
  }

  function reset() {
    console.log("Resetting!");

    bag = Array(21)
      .fill([PieceType.Red, PieceType.Blue, PieceType.Black])
      .flat();

    // TODO: Reset Grid Pieces
    territories = [
      new Territory(0, 1, TerritoryType.Normal),
      new Territory(0, 2, TerritoryType.Normal),
      new Territory(0, 3, TerritoryType.Red),
      new Territory(1, 0, TerritoryType.Normal),
      new Territory(1, 1, TerritoryType.Normal),
      new Territory(1, 3, TerritoryType.Normal),
      new Territory(2, 1, TerritoryType.Blue),
      new Territory(2, 2, TerritoryType.Normal),
      new Territory(2, 3, TerritoryType.Normal),
      new Territory(2, 4, TerritoryType.Normal),
      new Territory(3, 3, TerritoryType.Black),
      // new Territory(1, 2, TerritoryType.Blocked),
    ];

    hands = Array.from(Array(hand_count), () => []);

    // console.log("Territory")
    for (let i = 0; i < territories.length; i++) {
      for (let j = 0; j < 2; j++) {
        if (territories[i].type == TerritoryType.Red) {
          territories[i].pieces.push(pull_stone_from_bag(PieceType.Red));
        } else if (territories[i].type == TerritoryType.Blue) {
          territories[i].pieces.push(pull_stone_from_bag(PieceType.Blue));
        } else if (territories[i].type == TerritoryType.Black) {
          territories[i].pieces.push(pull_stone_from_bag(PieceType.Black));
        } else {
          territories[i].pieces.push(pull_from_bag());
        }
      }
    }

    // Hands
    for (let i = 0; i < hands.length; i++) {
      for (let j = 0; j < 8; j++) {
        hands[i].push(pull_from_bag());
      }
    }
  }

  function hex_x(col, row, bias_x, hexSize = 60) {
    return (
      bias_x +
      col * (hexSize * Math.sqrt(3) + hexPadding) +
      ((row % 2) * hexSize * Math.sqrt(3)) / 2
    );
  }

  function hex_y(row, bias_y, hexSize = 60) {
    return bias_y + row * (hexSize * 1.5 + hexPadding);
  }

  // define a function to draw a hexagon at the specified position
  function hexagonPoints(x, y, hexSize = 30) {
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

  function drawHexagon(x, y, hexSize = 30) {
    let points = hexagonPoints(x, y, hexSize);
    let pointString = points.map((p) => p.join(",")).join(" ");
    return pointString;
  }

  function next_turn() {
    current_turn += 1;
    current_turn %= hand_count;
  }

  // ACTIONS

  let current_action;

  const ActionTypes = {
    Negotiate: "Negotiate",
    Recruit: "Recruit",
    Battle: "Battle",
    March: "March",
  };
  class GenericAction {
    constructor() {
      this.doing_text = "Uhh";
    }
    cancel() {}
    resolve() {}
  }
  class Negotiate {
    constructor() {
      this.type = ActionTypes.Negotiate;
      this.doing_text = "Negotiating...";
      this.new_stone = pull_from_bag();
      this.sacrifice = undefined;
    }
    cancel() {
      bag.push(this.new_stone);
      bag = bag;
    }
    resolve() {
      bag.push(this.sacrifice);
      bag = bag;

      remove_stone_from(this.sacrifice, hands[current_turn]);
      hands[current_turn].push(this.new_stone);
      hands[current_turn] = hands[current_turn];

      console.log(current_turn, "negotiated for", this.new_stone);

      next_turn();
    }
  }
  class Recruit {
    constructor() {
      this.type = ActionTypes.Recruit;
      this.doing_text = "Recruiting...";
      this.recruit = undefined;
      this.territory = undefined;
    }
    cancel() {}
    resolve() {
      remove_stone_from(this.recruit, hands[current_turn]);
      hands[current_turn] = hands[current_turn];

      territories[this.territory].pieces.push(this.recruit);
      territories = territories;

      next_turn();
    }
  }

  function negotiate() {
    current_action = new Negotiate();
  }

  function recruit() {
    current_action = new Recruit();
  }

  reset();

  let game = new Game(hand_count)

  $: hand_count, reset();
  $: game.player_count = hand_count, game.setup();
</script>

<h1>Turncoats</h1>

Hands:
<input bind:value={hand_count} type="range" min="2" max="5" />
{hand_count}

<br />

<button on:click={reset}>Reset State</button>

<br />

<hr />

{#if current_action}
  <p>{current_action.doing_text}</p>

  {#if current_action.type == ActionTypes.Negotiate}
    Drew: {current_action.new_stone}
    Swap:
    <select bind:value={current_action.sacrifice}>
      {#each hands[current_turn].map((piece) => ({ text: piece })) as piece}
        <option value={piece.text}>
          {piece.text}
        </option>
      {/each}
    </select>
    <br />
    <button
      on:click={() => {
        current_action.resolve();
        current_action = undefined;
      }}>Negotiate!</button
    >
  {:else if current_action.type == ActionTypes.Recruit}
    Recruit:
    <select bind:value={current_action.recruit}>
      {#each hands[current_turn].map((piece) => ({ text: piece })) as piece}
        <option value={piece.text}>
          {piece.text}
        </option>
      {/each}
    </select>
    to
    <select bind:value={current_action.territory}>
      {#each territories.map((t, i) => ({ text: i })) as t, i (i)}
        <option value={i}>
          {i}
        </option>
      {/each}
    </select>
    <br />
    <button
      on:click={() => {
        current_action.resolve();
        current_action = undefined;
      }}>Recruit!</button
    >
  {/if}

  <br />
  <button
    on:click={() => {
      current_action.cancel();
      current_action = undefined;
    }}>DEBUG Cancel</button
  >
{:else}
  <button on:click={recruit}>Recruit</button>
  <!-- <button>Battle</button> -->
  <!-- <button>March</button> -->
  <button on:click={negotiate}>Negotiate</button>

  <br />
{/if}
<hr />

<svg viewBox="0 0 1000 1000" style="width:100%;height:auto;margin:0;">
  <rect width="100%" height="100%" fill="salmon" />

  {#each territories as territory, i (i)}
    <polygon
      points={drawHexagon(
        hex_x(territory.col, territory.row, 120, 60),
        hex_y(territory.row, 120, 60),
        60
      )}
      fill={territory.type == TerritoryType.Blocked ? "lightgray" : "white"}
    />

    <text
      x={hex_x(territory.col, territory.row, 110, 60)}
      y={hex_y(territory.row, 90, 60)}
      class="small"
    >
      {i}
    </text>
  {/each}

  {#each territories as territory, i (i)}
    <polygon
      points={drawHexagon(
        hex_x(territory.col, territory.row, 120, 60),
        hex_y(territory.row, 120, 60),
        52
      )}
      stroke={territory.winning_color()}
      stroke-width="3"
      fill="transparent"
    />
    {#each territory.pieces as piece, j (j)}
      <circle
        cx={hex_x(territory.col, territory.row, 90 + 25 * j, 60)}
        cy={hex_y(territory.row, 130, 60)}
        r="10"
        stroke="white"
        fill={piece}
        stroke-width="1"
      />
    {/each}
  {/each}

  {#each territories as territory}
    <polygon
      points={drawHexagon(
        hex_x(territory.col, territory.row, 120, 60),
        hex_y(territory.row, 120, 60),
        60
      )}
      stroke={territory.type}
      fill="transparent"
      stroke-width="5"
    />
  {/each}

  {#each bag as piece, i (i)}
    <circle
      cx={40 + 13 * i}
      cy={20}
      r="10"
      stroke="white"
      fill={piece}
      stroke-width="1"
    />
  {/each}

  {#each hands as hand, i (i)}
    <circle
      cx={50 + 150 * i}
      cy={520}
      r="50"
      stroke={current_turn == i % hand_count ? "green" : "transparent"}
      fill="white"
      stroke-width="5"
    />
    {#if hand}
      {#each hand as piece, j (j)}
        <circle
          cx={15 + 150 * i + 10 * j}
          cy={520}
          r="10"
          stroke="white"
          fill={piece}
          stroke-width="1"
        />
      {/each}
    {/if}
  {/each}

  <image x="800" y="20" width="80" height="80" href={Flag} />
  <image x="800" y="160" width="80" height="80" href={Axe} />
</svg>

<style>
  .heavy {
    font: bold 30px sans-serif;
  }

  h1 {
    line-height: 2;
    margin: 0;
  }

  * {
    line-height: 2em;
  }
</style>
