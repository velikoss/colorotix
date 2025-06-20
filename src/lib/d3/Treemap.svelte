<script lang="ts">
  import { translations } from "$lib";
  import * as d3 from "d3";

  let { data, width = 800, height = 600 } = $props();

  const hierarchicalData = $derived({
    name: "",
    children: Object.entries(data)
      .filter(([_, value]) => value > 0)
      .map(([name, value]) => ({
        name,
        value: Number(value),
      })),
  });

  const color = d3.scaleOrdinal(
    hierarchicalData.children.map((d) => d.name),
    ["#6BFCBA", "#F79023", "#B6D9FC", "#1D92C5", "#0165C0", "#F6F6FF"],
  );

  const format = d3.format(",.2f");

  let tile = $state(d3.treemapBinary);

  let root = $derived(
    d3
      .treemap()
      .tile(tile)
      .size([width, height])
      .padding(1)
      .round(true)(
      d3
        .hierarchy(hierarchicalData)
        .sum((d) => d.value)
        .sort((a, b) => b.value - a.value),
    ),
  );

  function getFirstDepthParent(leaf: any): any {
    return leaf.depth > 1 ? getFirstDepthParent(leaf.parent) : leaf;
  }

  let tooltip = $state<{ left: number; top: number; data: any | null }>({
    left: 0,
    top: 0,
    data: null,
  });

  function handleMouseMove(event: MouseEvent, leaf: any) {
    let left = event.offsetX;
    let top = event.offsetY;

    left = Math.max(10, Math.min(left, width - 150));
    top = Math.max(10, Math.min(top, height - 60));

    tooltip = {
      data: leaf,
      left,
      top,
    };
  }

  function handleMouseLeave() {
    tooltip = { left: 0, top: 0, data: null };
  }

  // Minimum width threshold for displaying text
  const minWidthForText = 140; // Adjust this value as needed
</script>

<div style="position: relative;">
  <svg
    {width}
    {height}
    viewBox="0 0 {width} {height}"
    style="max-width: 100%; height: auto;"
  >
    {#each root.leaves() as leaf, leafIndex}
      {@const nodes = leaf.data.name
        .split(/(?=[A-Z][a-z])|\s+/g)
        .concat(format(leaf.value))}
      {@const nodeWidth = leaf.x1 - leaf.x0}

      <g transform="translate({leaf.x0},{leaf.y0})">
        <rect
          id="rect-{leafIndex}"
          fill={color(getFirstDepthParent(leaf).data.name)}
          fill-opacity={0.8}
          width={nodeWidth}
          height={leaf.y1 - leaf.y0}
          onmouseover={(event) => handleMouseMove(event, leaf)}
          onmousemove={(event) => handleMouseMove(event, leaf)}
          onmouseleave={handleMouseLeave}
        />

        <clipPath id="clip-{leafIndex}">
          <use href="#rect-{leafIndex}" />
        </clipPath>

        {#if nodeWidth > minWidthForText}
          <text clip-path="url(#clip-{leafIndex})">
            {#each nodes as node, nodeIndex}
              <tspan
                x="3"
                y="{(nodeIndex === nodes.length - 1) * 0.3 +
                  1.1 +
                  nodeIndex * 0.9}em"
                fill-opacity={nodeIndex === nodes.length - 1 ? 0.7 : null}
              >
                {node ? (translations[node] ? translations[node] : node) : ""}
              </tspan>
            {/each}
          </text>
        {/if}
      </g>
    {/each}
  </svg>

  {#if tooltip.data}
    {@const tooltipValue = tooltip.data.ancestors().reverse().map((d) => d.data.name).join("")}
    <div
      style="position: absolute; left: {tooltip.left}px; top: {tooltip.top}px; background: rgba(0, 0, 0, 0.8); color: white; padding: 8px; border-radius: 4px; pointer-events: none; font-size: 12px; max-width: 200px; z-index: 10;"
    >
      <strong>{translations[tooltipValue] ? translations[tooltipValue] : tooltipValue}</strong><br />
      {format(tooltip.data.value)}
    </div>
  {/if}
</div>

<style>
  div {
    transition: opacity 0.2s ease-in-out, left 0.1s ease, top 0.1s ease;
  }
</style>