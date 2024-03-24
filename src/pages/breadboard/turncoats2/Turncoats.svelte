<script lang="ts">
  import {
    populate,
    empty_game,
    render_map,
    drawHexagon,
    hex_x,
    hex_y,
    generatePossibleNegotiateActions,
    generateGameTree,
    dominant_collection,
    generatePossibleMarchActions,
    cellsWithFaction,
  } from "./turncoats";

  import Collection from "./RenderStones.svelte";

  let game = empty_game(2);
  game = populate(game);

  const hexPadding = 10; // the padding between each hexagon
</script>

<h1>Turncoats</h1>

<br />

<!-- <button on:click = {console.log(generatePossibleNegotiateActions(game))} >Negotiate!</button> -->
<button on:click = {console.log(generateGameTree(null, game, 2))} >Negotiate!</button>
<button>Recruit!</button>
<button>Battle!</button>
<button on:click = {console.log(generatePossibleMarchActions(game))} >March!</button>

<br>

<button on:click = {console.log(cellsWithFaction(game, 'red'))} >Cells with Red</button>


<br />

<div class="resizable container">
  <svg viewBox="0 0 1000 800" style="height:100%;width:auto;margin:0;">
    <rect width="100%" height="100%" fill="salmon" />

    {#each Object.entries(render_map) as [i, cell]}
      <polygon
        on:click = {console.log(dominant_collection(game.cells[i], game))}
        points={drawHexagon(
          hex_x(cell.col, cell.row),
          hex_y(cell.row, 240),
          60
        )}
        fill={"lightgray"}
      />
      <text
        x={hex_x(cell.col, cell.row)}
        y={hex_y(cell.row)}
        class="small"
      >
      {i}
    </text>
    {/each}

    {#each Object.entries(render_map) as [i, cell]}
      <Collection c={game.cells[parseInt(i)]} row={cell.row} col={cell.col} />
    {/each}

    {#if game.bag}
      <circle
        cx={hex_x(-1, -1)}
        cy={hex_y(-1, 240)}
        r="40"
        fill="white"
        stroke-width="5"
      />
      <Collection c={game.bag} row={-1} col={-1} />
    {/if}

    {#each Object.entries(game.hands) as [i, hand]}
      <circle
        cx={hex_x(-2 + parseInt(i), 5)}
        cy={hex_y(5, 240)}
        r="40"
        stroke={game.turn % game.num_players == parseInt(i)
          ? "green"
          : "transparent"}
        fill="white"
        stroke-width="5"
      />

      {#if hand}
        <Collection
          c={game.hands[parseInt(i)]}
          row={5}
          col={-2 + parseInt(i)}
        />
      {/if}
    {/each}
  </svg>
</div>

<style>
  .container {
    height: 90%;
    width: auto;
    margin: 0;
  }
  .resizable {
    border: 2px solid;
    padding: 20px;
    resize: both;
    overflow: auto;
  }
</style>
