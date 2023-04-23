<script>
  // lang="ts"
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

  class Territory {
    constructor(row, col, type) {
      this.col = col;
      this.row = row;
      this.type = type;
      this.pieces = [];
    }

    has_faction(faction) {
      return this.pieces.includes(faction);
    }
  }



  class Game {
    constructor() {
      this.player_count = 2;
      this.active_player = 0;
      this.turn_count = 0;
      this.territories = [];
      this.movement_graph = [];
      this.bag = [];
      this.hands = [];
      this.flag = [];
      this.axe = [];
    }

    active_player_hand() {
      return this.hands[this.active_player];
    }

    factions_in_active_hand() {
      return [...new Set(this.active_player_hand())];
    }

    factions_in_territory(territory_index) {
      return [...new Set(this.territories[territory_index].pieces)];
    }

    count_duplicates(array, duplicate) {
      let duplicates = 0;
      for (let value of array) {
        if (value == duplicate) {
          duplicates++;
        }
      }
      return duplicates;
    }

    territories_with_faction(faction) {
      let matching_territories = [];
      for (let i = 0; i < this.territories.length; i++) {
        if (this.territories[i].has_faction(faction)) {
          matching_territories.push(i);
        }
      }
      return matching_territories;
    }

    
    winning_color_from(array) {
      let count = {};
      let maxCount = 0;
      let winner = "tie";

      for (let i = 0; i < array.length; i++) {
        let piece = array[i];
        count[piece] = (count[piece] || 0) + 1;

        if (count[piece] > maxCount) {
          maxCount = count[piece];
          winner = piece;
        } else if (count[piece] === maxCount) {
          winner = "tie";
        }
      }

      return winner;
    }
    
    winning_color(territory) {
      let winner = this.winning_color_from(territory.pieces)
      
      let axe_winner = this.winning_color_from(this.axe)
      let flag_winner = this.winning_color_from(this.flag)

      if (winner == "tie" && territory.has_faction(axe_winner)) {
        winner = axe_winner
      }

      if (winner == "tie" && territory.has_faction(flag_winner)) {
        winner = flag_winner
      }

      if (winner == "tie") {
        winner = "green"
      }

      return winner;
    }

    territories_with_faction_for_battle(faction) {
      let matching_territories = [];
      for (let i = 0; i < this.territories.length; i++) {
        if (this.territories[i].has_faction(faction)) {
          let has_other = false;
          // let other in this.territories[i].pieces
          for (let j = 0; j < this.territories[i].pieces.length; j++) {
            const other = this.territories[i].pieces[j];
            if (other !== faction && this.territories[i].has_faction(other)) {
              has_other = true;
              break;
            }
          }
          if (has_other) {
            matching_territories.push(i);
          }
        }
      }
      return matching_territories;
    }

    count_factions_in_active_hand(faction) {
      return this.count_duplicates(this.active_player_hand(), faction);
    }

    count_factions_in_territory(territory, faction) {
      let x = this.count_duplicates(
        this.territories[territory].pieces,
        faction
      );
      console.log(x);
      return x;
    }

    territories_next_to(territory) {
      return this.movement_graph[territory];
    }

    setup(players = 2) {
      this.player_count = players;
      this.turn_count = 0;
      this.active_player = 0;

      this.bag = Array(21)
        .fill([PieceType.Red, PieceType.Blue, PieceType.Black])
        .flat();

      this.axe = []
      this.flag = []

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

      this.movement_graph = {
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

      this.hands = Array.from(Array(this.player_count), () => []);

      // console.log("Territory")
      for (let i = 0; i < this.territories.length; i++) {
        for (let j = 0; j < 2; j++) {
          if (this.territories[i].type == TerritoryType.Red) {
            this.territories[i].pieces.push(
              this.pull_stone_from_bag(PieceType.Red)
            );
          } else if (this.territories[i].type == TerritoryType.Blue) {
            this.territories[i].pieces.push(
              this.pull_stone_from_bag(PieceType.Blue)
            );
          } else if (this.territories[i].type == TerritoryType.Black) {
            this.territories[i].pieces.push(
              this.pull_stone_from_bag(PieceType.Black)
            );
          } else {
            this.territories[i].pieces.push(pull_from_bag());
          }
        }
      }

      // Hands
      for (let i = 0; i < this.hands.length; i++) {
        for (let j = 0; j < 8; j++) {
          this.hands[i].push(pull_from_bag());
        }
      }
    }

    next_turn() {
      this.turn_count += 1;
      this.active_player += 1;
      this.active_player %= this.player_count;
    }

    pull_stone_from_bag(stone) {
      const index = this.bag.indexOf(stone);
      let piece = this.bag.splice(index, 1)[0];
      this.bag = this.bag;
      return piece;
    }
  }

  let game = new Game();
  game.setup(2);

  function remove_stone_from(stone, place) {
    const index = place.indexOf(stone);
    place.splice(index, 1)[0];
    return place;
  }

  function pull_from_bag() {
    let piece = game.bag.splice(
      Math.floor(Math.random() * game.bag.length),
      1
    )[0];
    game.bag = game.bag;
    return piece;
  }

  // Hexagons

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
      game.bag.push(this.new_stone);
      game.bag = game.bag;
    }
    resolve() {
      game.bag.push(this.sacrifice);
      game.bag = game.bag;

      remove_stone_from(this.sacrifice, game.hands[game.active_player]);
      game.hands[game.active_player].push(this.new_stone);
      game.hands[game.active_player] = game.hands[game.active_player];

      console.log(game.active_player, "negotiated for", this.new_stone);

      game.next_turn();
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
      remove_stone_from(this.recruit, game.hands[game.active_player]);
      game.hands[game.active_player] = game.hands[game.active_player];

      game.territories[this.territory].pieces.push(this.recruit);
      game.territories = game.territories;

      game.next_turn();
    }
  }
  class March {
    constructor() {
      this.type = ActionTypes.March;
      this.doing_text = "Marching...";
      this.from_territory = 0;
      this.to_territory = 0;
      this.amount = 1;
      this.faction = undefined;
    }
    cancel() {}
    resolve() {
      remove_stone_from(this.faction, game.hands[game.active_player]);
      game.flag.push(this.faction);
      for (let i = 0; i < this.amount; i++) {
        remove_stone_from(
          this.faction,
          game.territories[this.from_territory].pieces
        );
        game.territories[this.to_territory].pieces.push(this.faction);
      }
      game.territories = game.territories;
      game.next_turn();
    }
  }
  class Battle {
    constructor() {
      this.type = ActionTypes.Battle;
      this.doing_text = "Battling...";
      this.territory = 0;
      this.amount = 1;
      this.faction = undefined;
      this.attacked_faction = undefined;
    }
    cancel() {}
    resolve() {
      remove_stone_from(this.faction, game.hands[game.active_player]);
      game.axe.push(this.faction);
      for (let i = 0; i < this.amount; i++) {
        if (
          game.territories[this.territory].has_faction(this.attacked_faction)
        ) {
          remove_stone_from(
            this.attacked_faction,
            game.territories[this.territory].pieces
          );
          game.bag.push(this.attacked_faction)
        }
      }
      game.territories = game.territories;
      game.next_turn();
    }
  }

  function negotiate() {
    current_action = new Negotiate();
  }

  function recruit() {
    current_action = new Recruit();
  }

  function march() {
    current_action = new March();
  }

  function battle() {
    current_action = new Battle();
  }

  let hand_count = 2;
</script>

<h1>Turncoats</h1>

Hands:
<input bind:value={hand_count} type="range" min="2" max="5" />
{hand_count}

<br />

<button on:click={game.setup(hand_count)}>Reset State</button>

<br />

<hr />

{#if current_action}
  <p>{current_action.doing_text}</p>

  {#if current_action.type == ActionTypes.Negotiate}
    Drew: {current_action.new_stone}
    Swap:
    <select bind:value={current_action.sacrifice}>
      {#each game
        .active_player_hand()
        .map((piece) => ({ text: piece })) as piece}
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
      {#each game
        .active_player_hand()
        .map((piece) => ({ text: piece })) as piece}
        <option value={piece.text}>
          {piece.text}
        </option>
      {/each}
    </select>
    to
    <select bind:value={current_action.territory}>
      {#each game.territories.map((t, i) => ({ text: i })) as t, i (i)}
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
  {:else if current_action.type == ActionTypes.Battle}
    Battle:
    <select bind:value={current_action.faction}>
      {#each game
        .factions_in_active_hand()
        .map((piece) => ({ text: piece })) as piece}
        <option value={piece.text}>
          {piece.text}
        </option>
      {/each}
    </select>
    against
    <select bind:value={current_action.attacked_faction}>
      {#each game
        .factions_in_territory(current_action.territory) // TODO
        .map((piece) => ({ text: piece })) as piece}
        <option value={piece.text}>
          {piece.text}
        </option>
      {/each}
    </select>
    from
    <select bind:value={current_action.territory}>
      <!-- {#if current_action.territory} -->
      {#each game.territories_with_faction_for_battle(current_action.faction) as i}
        <option value={i}>
          {i}
        </option>
      {/each}
      <!-- {/if} -->
    </select>
    with
    <input
      bind:value={current_action.amount}
      type="range"
      min="1"
      max={game.count_factions_in_territory(
        current_action.territory,
        current_action.faction
      )}
    />
    {current_action.amount}
    <br />
    <button
      on:click={() => {
        current_action.resolve();
        current_action = undefined;
      }}>Battle!</button
    >
  {:else if current_action.type == ActionTypes.March}
    March:
    <select bind:value={current_action.faction}>
      {#each game
        .factions_in_active_hand()
        .map((piece) => ({ text: piece })) as piece}
        <option value={piece.text}>
          {piece.text}
        </option>
      {/each}
    </select>
    from
    <select bind:value={current_action.from_territory}>
      {#each game.territories_with_faction(current_action.faction) as i}
        <option value={i}>
          {i}
        </option>
      {/each}
    </select>
    to
    <select bind:value={current_action.to_territory}>
      {#each game.territories_next_to(current_action.from_territory) as i}
        <option value={i}>
          {i}
        </option>
      {/each}
    </select>
    with
    <input
      bind:value={current_action.amount}
      type="range"
      min="1"
      max={game.count_factions_in_territory(
        current_action.from_territory,
        current_action.faction
      )}
    />
    {current_action.amount}
    <br />
    <button
      on:click={() => {
        current_action.resolve();
        current_action = undefined;
      }}>March!</button
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
  <button on:click={battle}>Battle</button>
  <button on:click={march}>March</button>
  <button on:click={negotiate}>Negotiate</button>

  <br />
{/if}
<hr />

<svg viewBox="0 0 1000 1000" style="width:100%;height:auto;margin:0;">
  <rect width="100%" height="100%" fill="salmon" />

  {#each game.territories as territory, i (i)}
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

  {#each game.territories as territory, i (i)}
    <polygon
      points={drawHexagon(
        hex_x(territory.col, territory.row, 120, 60),
        hex_y(territory.row, 120, 60),
        52
      )}
      stroke={game.winning_color(territory)}
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

  {#each game.territories as territory}
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

  {#each game.bag as piece, i (i)}
    <circle
      cx={40 + 13 * i}
      cy={20}
      r="10"
      stroke="white"
      fill={piece}
      stroke-width="1"
    />
  {/each}

  {#each game.hands as hand, i (i)}
    <circle
      cx={50 + 150 * i}
      cy={520}
      r="50"
      stroke={game.active_player == i % game.player_count
        ? "green"
        : "transparent"}
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
  {#if game.flag}
    {#each game.flag as piece, i (i)}
      <circle
        cx={800 + 20 * i}
        cy={20 + 80 + 20}
        r="10"
        stroke="white"
        fill={piece}
        stroke-width="1"
      />
    {/each}
  {/if}

  <image x="800" y="160" width="80" height="80" href={Axe} />
  {#if game.axe}
    {#each game.axe as piece, i (i)}
      <circle
        cx={800 + 20 * i}
        cy={20 + 80 + 160}
        r="10"
        stroke="white"
        fill={piece}
        stroke-width="1"
      />
    {/each}
  {/if}
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
