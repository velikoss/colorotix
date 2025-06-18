<script lang="ts">
  import { getContext } from 'svelte';

  let {
    orientation = 'x',
    scale,
    numberOfTicks = 4,
  } = $props<{
    orientation?: 'x' | 'y';
    scale: any;
    numberOfTicks?: number;
  }>();

  const { dimensions: dimensionsStore } = getContext('Chart');
  let dimensions = $derived($dimensionsStore);

  let ticks = $derived(scale.ticks(numberOfTicks));
</script>

<g
  class="Grid Grid--dimension-{orientation}"
  transform={`translate(0, ${orientation === 'x' ? dimensions.innerHeight : 0})`}
>
  {#each ticks as tick, i}
    <line
      transform={`translate(${(orientation === 'x' ? [scale(tick), 0] : [0, scale(tick)]).join(
        ', '
      )})`}
      y2={orientation === 'x' ? -dimensions.innerHeight : 0}
      x2={orientation === 'y' ? dimensions.innerWidth : 0}
      stroke="var(--colors-grid, #000000)"
    />
  {/each}
</g>

<style>
  .Grid {
    stroke: var(--colors-grid, #000000);
    stroke-width: 0.5;
    opacity: 0.2;
  }
</style>