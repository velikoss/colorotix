<script lang="ts">
  import { getContext } from 'svelte';

  let {
    orientation = 'x',
    scale,
    label = undefined,
    formatTick = (d: any) => d,
    tickLength = 6,
    numberOfTicks = 6,
    hideAxisLine = false,
    hideTicks = false,
    tickValues = [],
    bottom = 0,
    left = 0,
    style = '',
  } = $props<{
    orientation?: 'x' | 'y';
    scale: any;
    label?: string | undefined;
    formatTick?: (d: any) => any;
    tickLength?: number;
    numberOfTicks?: number;
    hideAxisLine?: boolean;
    hideTicks?: boolean;
    tickValues?: any[];
    bottom?: number;
    left?: number;
    style?: string;
  }>();

  const { dimensions } = getContext('Chart');
  let ticks = $derived(
    tickValues.length
      ? tickValues
      : orientation === 'x'
      ? scale.ticks ? scale.ticks(5) : scale.domain()
      : scale.ticks
      ? scale.ticks(numberOfTicks)
      : scale.domain(),
  );

  let padding = $derived(scale.bandwidth ? scale.bandwidth() / 2 : 0);
</script>

<g
  class="Axis Axis--dimension-{orientation}"
  transform={`translate(${left}, ${orientation === 'x' ? dimensions.innerHeight : 0})`}
>
  {#if !hideAxisLine}
    <line
      class="Axis__line"
      x2={orientation === 'x' ? dimensions.innerWidth : 0}
      y2={orientation === 'y' ? dimensions.innerHeight : 0}
      stroke="var(--colors-grid, #FFFFFF)"
    />
  {/if}
  {#each ticks as tick, i}
    <g
      transform={`translate(${(orientation === 'x'
        ? [scale(tick) + padding, 0]
        : [0, scale(tick) + padding]
      ).join(', ')})`}
    >
      <text
        class="Axis__tick"
        x={orientation === 'y' ? -15 : 0}
        y={orientation === 'x' ? 20 : 0} 
        text-anchor={orientation === 'y' ? 'end' : 'middle'}
        alignment-baseline="middle"
        {style}
      >
        {formatTick(tick)}
      </text>
      {#if !hideTicks}
        <line
          x2={orientation === 'x' ? 0 : -tickLength}
          y2={orientation === 'y' ? 0 : tickLength}
          stroke="var(--colors-grid, #FFFFFF)"
        />
      {/if}
    </g>
  {/each}

  {#if label}
    <text
      class="Axis__label"
      style="transform: translate({(orientation === 'x'
        ? [dimensions.innerWidth / 2, 50]
        : [-50, dimensions.innerHeight / 2]
      )
        .map((d) => d + 'px')
        .join(', ')}) {orientation === 'y' ? 'rotate(-90deg)' : ''}"
    >
      {label}
    </text>
  {/if}
</g>

<style>
  .Axis__line {
    stroke: var(--colors-grid, #FFFFFF);
    stroke-width: 1;
  }
  .Axis__tick {
    fill: var(--colors-grid, #FFFFFF);
    font-size: 10px;
  }
  .Axis__label {
    fill: var(--colors-grid, #FFFFFF);
    font-size: 14px;
  }
</style>