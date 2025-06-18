<script lang="ts">
	import { pie } from "d3-shape";
	import { scaleLinear, scaleOrdinal } from "d3-scale";
	import Chart from "./Chart.svelte";
	import Arc from "./Arc.svelte";
	import Legend from "./Legend.svelte";
	import { onMount } from "svelte";
    import { interpolateRgb } from "d3-interpolate";

	const props = $props<{ data: any[]; color: string; value: string }>();

	onMount(() => {
		console.log(colorScale(0))
	});

	let width = $state(0);
	let height = $state(0);
	let margins = $state({
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
	});

	let dimensions = $derived({
		width,
		height,
		margins,
		innerHeight: Math.max(height - margins.top - margins.bottom, 0),
		innerWidth: Math.max(width - margins.left - margins.right, 0),
	});

	let radius = $derived(
		Math.min(dimensions.innerWidth, dimensions.innerHeight) / 2,
	);

	let getColor = $derived((d: any) => d[props.color]);
	let getValue = $derived((d: any) => d[props.value]);

	let sortedData = $derived([...props.data].sort((a, b) => getValue(a) - getValue(b)));

	// Create color scale with stops for each data point
	let colorScale = $derived(
		scaleLinear()
			.domain([0, sortedData.length - 1]) // Map array indices to colors
			.range(["#000000", "#6BFCBA"])
	);

	// Create arcs from SORTED data
	let arcs = $derived(pie().padAngle(0.01).value(getValue)(sortedData));

	// Tooltip state
	let tooltip = $state({ visible: false, x: 0, y: 0, content: "" });

	function showTooltip(event: MouseEvent, arc: any) {
		tooltip.visible = true;
		tooltip.x = event.offsetX + 5; // Offset to avoid cursor overlap
		tooltip.y = event.offsetY + 5;
		tooltip.content = `${arc.data[props.color]}: ${parseFloat(arc.data[props.value]).toFixed(2)}`;
	}

	function moveTooltip(event: MouseEvent) {
		tooltip.x = event.offsetX + 5;
		tooltip.y = event.offsetY + 5;
	}

	function hideTooltip() {
		tooltip.visible = false;
	}
</script>

<div class="w-full h-full flex flex-col relative">
	<div
		class="w-full h-full"
		bind:clientWidth={width}
		bind:clientHeight={height}
	>
		<Chart {dimensions}>
			<g
				transform={`translate(${dimensions.innerWidth / 2}, ${dimensions.innerHeight / 2})`}
			>
				{#each arcs as arc, i}
					<Arc
						index={i}
						fill={colorScale(i)}
						stroke={"transparent"}
						innerRadius={radius * 0.5}
						outerRadius={radius}
						startAngle={arc.startAngle}
						endAngle={arc.endAngle}
						cornerRadius={5}
						padAngle={0.01}
						onmouseover={(event) => showTooltip(event, arc)}
						onmousemove={moveTooltip}
						onmouseout={hideTooltip}
					/>
				{/each}
			</g>
		</Chart>
	</div>

	<!-- Tooltip -->
	{#if tooltip.visible}
		<div
			class="absolute bg-black text-white text-sm p-2 rounded shadow pointer-events-none text-nowrap"
			style="left: {tooltip.x}px; top: {tooltip.y}px;"
		>
			{tooltip.content}
		</div>
	{/if}
</div>

<style>
	/* Optional: Style the tooltip for better appearance */
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
