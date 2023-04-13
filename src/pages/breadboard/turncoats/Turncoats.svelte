<!-- <script>
  import { onMount } from "svelte";

  onMount(() => {});
</script>

<svg width="300" height="300">
  <rect width="100%" height="100%" fill="red" />
  <circle
    cx="150"
    cy="100"
    r="80"
    fill="white"
    stroke="black"
    stroke-width="3px"
  />
</svg> -->

<!--
   _______
  /       \
 /         \
/           \
\           /
 \         /
  \_______/

-->

<script>
  import { circle } from "stardust-core/dist/mark/marks";
  import { onMount } from "svelte";

  let hexSize = 60; // the size of each hexagon
  let hexPadding = 0; // the padding between each hexagon
  let numRows = 3; // the number of rows of hexagons
  let numCols = 4; // the number of columns of hexagons

  // calculate the dimensions of the SVG element based on the number of rows and columns
  //   let svgWidth =
  //     (numCols + 0.5) * hexSize * Math.sqrt(3) + (numCols - 1) * hexPadding;
  //   let svgHeight = (numRows + 0.5) * hexSize * 2 + (numRows - 1) * hexPadding;

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
    // console.log(pointString);
    return pointString;
  }

  //   drawHexagon(0, 0);

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
</script>

<svg viewBox="0 0 1000 1000" style="width:100%;height:100%;margin:0;">
  <rect width="100%" height="100%" fill="salmon" />
  {#each Array(numRows) as _, row}
    {#each Array(numCols) as _, col}
      <polygon
        points={drawHexagon(
          125 +
            col * (hexSize * Math.sqrt(3) + hexPadding) +
            ((row % 2) * hexSize * Math.sqrt(3)) / 2,
          115 + row * (hexSize * 1.5 + hexPadding),
          60
        )}
        stroke="gray"
        fill="transparent"
        stroke-width="3"
      />
    {/each}
  {/each}
  <polygon
    points={drawHexagon(100, 100)}
    stroke="black"
    fill="transparent"
    stroke-width="5"
  />
  <polygon
    points={drawHexagon(150, 100)}
    stroke="black"
    fill="transparent"
    stroke-width="5"
  />
  <polygon
    points={drawHexagon(125, 145)}
    stroke="black"
    fill="transparent"
    stroke-width="5"
  />

  <circle
    cx={hexagonPoints(100, 100)[circleIndex][0]}
    cy={hexagonPoints(100, 100)[circleIndex][1]}
    r="10"
    stroke="blue"
    fill="transparent"
    stroke-width="5"
  />
</svg>
