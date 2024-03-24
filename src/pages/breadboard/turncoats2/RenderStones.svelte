<script lang="ts">
  import { hex_x, hex_y } from "./turncoats";

  interface Collection {
    red: number;
    blue: number;
    black: number;
  }

  export let c: Collection;
  export let col: number
  export let row: number
</script>

{#if c.red > 0}
  <circle
    cx={hex_x(col, row)}
    cy={hex_y(row, 220)}
    r="10"
    stroke="white"
    fill={"red"}
    stroke-width="1"
  />
{/if}

{#if c.blue > 0}
  <circle
    cx={hex_x(col, row, 220)}
    cy={hex_y(row, 250)}
    r="10"
    stroke="white"
    fill={"skyblue"}
    stroke-width="1"
  />
{/if}

{#if c.black > 0}
  <circle
    cx={hex_x(col, row, 260)}
    cy={hex_y(row, 250)}
    r="10"
    stroke="white"
    fill={"black"}
    stroke-width="1"
  />
{/if}

<!-- Text -->

{#if c.red > 0}
  <text
    text-anchor="middle"
    x={hex_x(col, row)}
    y={hex_y(row, 225)}
    class="small"
    fill="white"
  >
    {c.red}
  </text>
{/if}

{#if c.blue > 0}
  <text
    text-anchor="middle"
    x={hex_x(col, row, 220)}
    y={hex_y(row, 255)}
    class="small"
    fill="white"
  >
    {c.blue}
  </text>
{/if}

{#if c.black > 0}
  <text
    text-anchor="middle"
    x={hex_x(col, row, 260)}
    y={hex_y(row, 255)}
    class="small"
    fill="white"
  >
    {c.black}
  </text>
{/if}