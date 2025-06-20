<script lang="ts">
  import { extent, group, bisector, max } from 'd3-array';
  import { scaleLinear, scaleOrdinal } from 'd3-scale';
  import { line, curveMonotoneX } from 'd3-shape';
  import { writable } from 'svelte/store';
  import Chart from './Chart.svelte';
  import Line from './Line.svelte';
  import Axis from './Axis.svelte';
  import Grid from './Grid.svelte';
  import Circle from './Circle.svelte';

  let {
    data,
    x,
    y,
    color,
    xFormat = (d: any) => d,
    yFormat = (d: any) => d,
    margins = { top: 20, right: 30, bottom: 50, left: 70 },
    colorPalette = ['#1f77b4', '#2ca02c', '#ff1b1b', '#d62728', '#9467bd']
  } = $props<{
    data: any[];
    x: string;
    y: string;
    color: string;
    xFormat?: (d: any) => any;
    yFormat?: (d: any) => any;
    margins?: any;
    colorPalette?: string[];
  }>();

  let width = $state(0);
  let height = $state(0);

  let dimensionsStore = writable({ width: 0, height: 0, margins, innerWidth: 0, innerHeight: 0 });

  function resize(node: HTMLElement) {
    const observer = new ResizeObserver((entries) => {
      const { width: newWidth, height: newHeight } = entries[0].contentRect;
      width = newWidth;
      height = newHeight;
      dimensionsStore.set({
        width,
        height,
        margins,
        innerWidth: Math.max(width - margins.left - margins.right, 0),
        innerHeight: Math.max(height - margins.top - margins.bottom, 0),
      });
          });
    observer.observe(node);
    return {
      destroy() {
        observer.disconnect();
      },
    };
  }

  const getX = (d: any) => d[x];
  const getY = (d: any) => d[y];
  const getColor = (d: any) => d[color];

  let grouped = $derived(group(data, getColor));

  let xScale = $derived(
    scaleLinear()
      .domain(extent(data, getX))
      .range([0, $dimensionsStore.innerWidth])
      .clamp(true),
  );
  let yScale = $derived(
    scaleLinear()
      .domain(extent(data, getY))
      .range([$dimensionsStore.innerHeight, 0])
      .nice(),
  );

  let colorScale = $derived((d: any) => {
    if (d.type === 'main') {
      return d.segment === 'historical' ? colorPalette[0] : colorPalette[1];
    }
    const typeIndex = ['outlier', 'lower_bound', 'upper_bound'].indexOf(d.type) + 2;
    return colorPalette[typeIndex] || colorPalette[0];
  });

  let lineGenerator = $derived(
    line()
      .x((d) => xScale(getX(d)))
      .y((d) => yScale(getY(d)))
      .curve(curveMonotoneX)
  );

  let tooltip = $state<{ left: number; top: number; data: any[] | null }>({ left: 0, top: 0, data: null });

  const bisect = bisector(getX).left;

  function handleMouseOver(event: MouseEvent) {
    const xInverted = xScale.invert(event.offsetX - margins.left);
    const index = bisect(data, xInverted);
    const datum = data[index];
    const highlighted = data.filter((d) => getX(datum) - getX(d) === 0);
    const yMax = max(highlighted, getY);

    tooltip = {
      data: highlighted,
      left: xScale(getX(datum)),
      top: yScale(yMax),
    };
  }

  function handleMouseLeave() {
    tooltip = { left: 0, top: 0, data: null };
  }

  let innerWidth = $derived($dimensionsStore.innerWidth);
  let innerHeight = $derived($dimensionsStore.innerHeight);
</script>

<div class="w-full h-full flex flex-col" use:resize>
  {#if width > 100}
    <Chart dimensions={dimensionsStore}>
      <Grid orientation="y" scale={yScale} />
      {#each grouped.keys() as group, i}
        {#if group === 'outlier'}
          {#each grouped.get(group) as point}
            <Circle
              x={xScale(getX(point))}
              y={yScale(getY(point))}
              radius={5}
              fill={colorScale(point)}
              stroke="var(--colors-grid, #000000)"
            />
          {/each}
        {:else}
          <Line path={lineGenerator(grouped.get(group))} color={colorScale(grouped.get(group)[0])} />
        {/if}
      {/each}
      {#if tooltip.data}
        <line
          x1={tooltip.left}
          x2={tooltip.left}
          y1={$dimensionsStore.innerHeight}
          y2={tooltip.top}
          stroke="var(--colors-grid, #000000)"
        />
        {#each tooltip.data as row}
          <Circle
            cx={xScale(getX(row))}
            cy={yScale(getY(row))}
            radius={5}
            fill={colorScale(row)}
            stroke="var(--colors-grid, #000000)"
          />
        {/each}
      {/if}
      <g transform="translate(0, {innerHeight})">
        <Axis orientation="x" scale={xScale} formatTick={xFormat} label="" />
      </g>
      <Axis orientation="y" scale={yScale} formatTick={yFormat} label="" />
      <rect
        width={innerWidth}
        height={innerHeight}
        onmousemove={handleMouseOver}
        onmouseleave={handleMouseLeave}
        fill="transparent"
      />
    </Chart>
  {/if}
</div>