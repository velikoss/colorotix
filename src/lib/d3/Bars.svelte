<script lang="ts">
  import { max } from 'd3-array';
  import { scaleLinear, scaleBand, scaleOrdinal } from 'd3-scale';
  import { transformToChartData, type ChartData } from '$lib';
  import Chart from './Chart.svelte';
  import Bar from './Bar.svelte';
  import Axis from './Axis.svelte';

  let {
    rawData,
    type,
    valueKeys = undefined,
    xFormat = (d: any) => d,
    yFormat = (d: any) => d.toLocaleString(),
    margins = { top: 50, right: 20, bottom: 0, left: 50 },
    colorPalette = ['#1f77b4', '#2ca02c', '#ff1b1b', '#d62728', '#9467bd'],
  } = $props<{
    rawData: Record<string, any>;
    valueKeys?: string[];
    type?: string;
    xFormat?: (d: any) => any;
    yFormat?: (d: any) => any;
    margins?: { top: number; right: number; bottom: number; left: number };
    colorPalette?: string[];
  }>();

 
  let data = $derived(transformToChartData(rawData, valueKeys));

  let width = $state(0);
  let height = $state(0);

  let dimensions = $derived({
    width,
    height,
    margins,
    innerHeight: Math.max(height - margins.top - margins.bottom, 0),
    innerWidth: Math.max(width - margins.left - margins.right, 0),
  });

  function resize(node: HTMLElement) {
    const observer = new ResizeObserver((entries) => {
      const { width: newWidth, height: newHeight } = entries[0].contentRect;
      width = newWidth;
      height = newHeight;
    });
    observer.observe(node);
    return {
      destroy() {
        observer.disconnect();
      },
    };
  }

 
  const getY = (d: ChartData) => d.value;
  const getX = (d: ChartData) => d.category;
  const getSubcategory = (d: ChartData) => d.subcategory;

 
  let categories = $derived([...new Set(data.map(getX))]);
  let subcategories = $derived([...new Set(data.map(getSubcategory))]);

 
  let xScaleOuter = $derived(
    scaleBand()
      .domain(categories)
      .range([0, dimensions.innerWidth])
      .paddingInner(subcategories.length > 1 ? 0.2 : 0.1)
      .paddingOuter(0.1)
  );

 
  let xScaleInner = $derived(
    scaleBand()
      .domain(subcategories)
      .range([0, xScaleOuter.bandwidth()])
      .padding(subcategories.length > 1 ? 0.05 : 0)
  );

  let yScale = $derived(
    scaleLinear()
      .domain([0, max(data, getY)*1.25 ?? 0])
      .range([dimensions.innerHeight, 0])
      .nice()
  );

 
  let colorScale = $derived(
    scaleOrdinal()
      .domain(subcategories)
      .range(["#6BFCBA", "#F79023", "#B6D9FC", "#1D92C5", "#0165C0", "#F6F6FF"])
  );

 
  let tooltip = $state({ visible: false, x: 0, y: 0, content: "" });

 
  function showTooltip(event: MouseEvent, datum: ChartData) {
    tooltip.visible = true;
    tooltip.x = event.offsetX + 5;
    tooltip.y = event.offsetY - 20;
    tooltip.content = `${datum.subcategory != "value" ? datum.subcategory : datum.category}: ${datum.value}`;
  }

  function moveTooltip(event: MouseEvent) {
    tooltip.x = event.offsetX + 5;
    tooltip.y = event.offsetY - 20;
  }

  function hideTooltip() {
    tooltip.visible = false;
  }
</script>

<div class="w-full h-full relative" use:resize>
  {#if width > 100}
    <Chart dimensions={dimensions}>
      {#each data as datum}
        <Bar
          x={xScaleOuter(getX(datum)) + xScaleInner(getSubcategory(datum))}
          y={yScale(getY(datum))}
          width={xScaleInner.bandwidth()}
          height={dimensions.innerHeight - yScale(getY(datum))}
          fill={colorScale(getSubcategory(datum))}
          onmouseover={(event) => showTooltip(event, datum)}
          onmousemove={moveTooltip}
          onmouseout={hideTooltip}
        />
      {/each}
      <Axis orientation="y" scale={yScale} formatTick={yFormat} />
      <Axis
        orientation="x"
        scale={xScaleOuter}
        formatTick={xFormat}
        tickValues={categories}
      />
    </Chart>
        <!-- Tooltip -->
    {#if tooltip.visible}
      <div
        class="absolute bg-black text-white text-sm p-2 rounded shadow pointer-events-none text-nowrap"
        style="left: {tooltip.x}px; top: {tooltip.y}px;"
      >
        {tooltip.content}
      </div>
    {/if}
  {/if}
</div>

<style>
	
	:global(.tooltip) {
		background: rgba(0, 0, 0, 0.8);
		color: white;
		padding: 8px;
		border-radius: 4px;
		pointer-events: none;
		position: absolute;
		z-index: 10;
	}
</style>
