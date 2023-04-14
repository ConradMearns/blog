<script>
  import { circle } from "stardust-core/dist/mark/marks";
  import { onMount } from "svelte";

  let hexPadding = 10; // the padding between each hexagon

  const TerritoryType = {
    Normal: "transparent",
    Blocked: "gray",
    Red: "red",
    Blue: "skyblue",
    Black: "black",
  };

  class Territory {
    constructor(col, row, type) {
      this.col = col;
      this.row = row;
      this.type = type;
      this.pieces = [];
    }

    winning_color() {

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

  let grid_arrangement = [
    [0, 1, TerritoryType.Normal],
    [0, 2, TerritoryType.Normal],
    [0, 3, TerritoryType.Red],
    [1, 0, TerritoryType.Normal],
    [1, 1, TerritoryType.Normal],
    [1, 3, TerritoryType.Normal],
    [2, 1, TerritoryType.Blue],
    [2, 2, TerritoryType.Normal],
    [2, 3, TerritoryType.Normal],
    [2, 4, TerritoryType.Normal],
    [3, 3, TerritoryType.Black],
    // [1, 2, TerritoryType.Blocked],
  ];

  // let grid_pieces = Array(grid_arrangement.length).fill([]);
  let grid_pieces = Array.from(Array(grid_arrangement.length), () => []);

  const PieceType = {
    Red: "red",
    Blue: "skyblue",
    Black: "black",
  };

  let bag = Array(21)
    .fill([PieceType.Red, PieceType.Blue, PieceType.Black])
    .flat();

  let hand_count = 2;
  let hands = Array(hand_count);

  function winning_color_from_territory(territory) {
    const pieces = grid_pieces[territory];

    let count = {};
    let maxCount = 0;
    let winner = "green";

    for (let i = 0; i < pieces.length; i++) {
      let piece = pieces[i];
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

  function pull_stone_from_bag(stone) {
    const index = bag.indexOf(stone);
    let piece = bag.splice(index, 1)[0];
    bag = bag;
    return piece;
  }

  function pull_from_bag() {
    let piece = bag.splice(Math.floor(Math.random() * bag.length), 1)[0];
    // console.log(piece)
    bag = bag;
    return piece;
  }

  function reset() {
    console.log("Resetting!");

    bag = Array(21)
      .fill([PieceType.Red, PieceType.Blue, PieceType.Black])
      .flat();
    grid_pieces = Array.from(Array(grid_arrangement.length), () => []);
    hands = Array.from(Array(hand_count), () => []);

    // console.log("Territory")
    for (let i = 0; i < grid_pieces.length; i++) {
      for (let j = 0; j < 2; j++) {
        if (grid_arrangement[i][2] == TerritoryType.Red) {
          grid_pieces[i].push(pull_stone_from_bag(PieceType.Red));
        } else if (grid_arrangement[i][2] == TerritoryType.Blue) {
          grid_pieces[i].push(pull_stone_from_bag(PieceType.Blue));
        } else if (grid_arrangement[i][2] == TerritoryType.Black) {
          grid_pieces[i].push(pull_stone_from_bag(PieceType.Black));
        } else {
          grid_pieces[i].push(pull_from_bag());
        }
      }
    }
    grid_pieces = grid_pieces;

    for (let i = 0; i < hands.length; i++) {
      for (let j = 0; j < 8; j++) {
        hands[i].push(pull_from_bag());
      }
    }
    console.log("Hands");
    console.log(hands);

    // bag = bag;
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

  function territory_points(x, y, bx, by, size = 30) {
    const hex1 = hexagonPoints(hex_x(0, 0, bx, size), hex_y(0, by, size), size);
    const hex2 = hexagonPoints(hex_x(0, 1, bx, size), hex_y(1, by, size), size);
    const hex3 = hexagonPoints(hex_x(1, 0, bx, size), hex_y(0, by, size), size);

    return [
      hex2[5],
      hex2[0],
      hex2[1],
      hex2[2],
      hex3[1],
      hex3[2],
      hex3[3],
      hex3[4],
      hex1[3],
      hex1[4],
      hex1[5],
      hex1[0],
    ];
  }

  function drawHexagon(x, y, hexSize = 30) {
    let points = hexagonPoints(x, y, hexSize);
    let pointString = points.map((p) => p.join(",")).join(" ");
    return pointString;
  }

  let circleIndex = 0;
  let interval;
  onMount(() => {
    interval = setInterval(() => {
      if (circleIndex >= 5) {
        circleIndex = 0;
      } else {
        circleIndex += 1;
      }
    }, 500);
  });

  // onMount(() => {
  //   reset();
  // });
  reset();
</script>

<h1>Turncoats</h1>

Hands:
<input bind:value={hand_count} type="range" min="2" max="5" />
{hand_count}

<br />

<button on:click={reset}>Reset State</button>

<svg viewBox="0 0 1000 1000" style="width:100%;height:auto;margin:0;">
  <rect width="100%" height="100%" fill="salmon" />

  {#each grid_arrangement as [row, col, type], i (i)}
    <polygon
      points={drawHexagon(hex_x(col, row, 120, 60), hex_y(row, 120, 60), 60)}
      fill={type == TerritoryType.Blocked ? "lightgray" : "white"}
    />
    <!-- <text x={hex_x(col, row, 110, 60)} y={hex_y(row, 90, 60)} class="small">
      {i}
    </text> -->
  {/each}

  {#each grid_arrangement as [row, col, type], i (i)}
    <polygon
      points={drawHexagon(hex_x(col, row, 120, 60), hex_y(row, 120, 60), 52)}
      stroke={winning_color_from_territory(i)}
      stroke-width="3"
      fill="transparent"
    />
    {#each grid_pieces[i] as piece, j (j)}
      <circle
        cx={hex_x(col, row, 90 + 25 * j, 60)}
        cy={hex_y(row, 130, 60)}
        r="10"
        stroke="white"
        fill={piece}
        stroke-width="1"
      />
    {/each}
  {/each}

  {#each grid_arrangement as [row, col, type]}
    <polygon
      points={drawHexagon(hex_x(col, row, 120, 60), hex_y(row, 120, 60), 60)}
      stroke={type}
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
      stroke="white"
      fill="white"
      stroke-width="1"
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
</svg>

<style>
  .heavy {
    font: bold 30px sans-serif;
  }
</style>
