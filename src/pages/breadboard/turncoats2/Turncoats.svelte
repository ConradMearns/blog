<script lang="ts">
  import {
    populate,
    empty_game,
    render_map,
    drawHexagon,
    hex_x,
    hex_y,
    generateGameTree,
    dominant_collection,
    applyAction,
    generatePossibleActions,
    check_game_status,
  } from "./turncoats";

  import Collection from "./RenderStones.svelte";

  let game = empty_game(2);
  game = populate(game);

  function deepCopy<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
  }

  const hexPadding = 10; // the padding between each hexagon


  // import { writable } from 'svelte/store';

  // const initialState = 'idle';
  // const states = ['idle', 'loading', 'success', 'error'];

  // const transitions = {
  //   idle: { to: 'loading' },
  //   loading: { toSuccess: 'success', toError: 'error' },
  //   success: { toIdle: 'idle' },
  //   error: { toIdle: 'idle' }
  // };

  // const currentState = writable(initialState);

  // function transition(action) {
  //   const nextState = transitions[currentState][action];
  //   if (nextState) {
  //     currentState.set(nextState);
  //   }
  // }

function strat_random () {
  const actions = generatePossibleActions(game)
  const r = Math.floor(Math.random() * actions.length);
  const action = actions[r]

  // if (action.type == 'negotiate') {
  //   console.log('ayylmao')
  // }
  
  console.log(action)

  game = applyAction(game, action)
}

</script>

<h1>Turncoats</h1>

<!-- <button on:click={() => transition('to')}>Start</button> -->
<!-- <pre>{JSON.stringify($currentState)}</pre> -->

<br />

<!-- <button on:click = {console.log(generatePossibleNegotiateActions(game))} >Negotiate!</button> -->
<!-- <button on:click = {state = state.on(Events.NegotiateDraw)} >Negotiate!</button>
<button>Recruit!</button>
<button>Battle!</button>
<button on:click = {console.log(generatePossibleMarchActions(game))} >March!</button> -->

<button on:click={strat_random}>Random</button>

<br>

<button on:click = {console.log(generateGameTree(null, game, 2))} >Game Tree</button>


<br />

{#if check_game_status(game)}
  <h1> GAME ENDED! </h1>
{/if}

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
