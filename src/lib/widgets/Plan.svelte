<script lang="ts">
    import Arc from "$lib/d3/Arc.svelte";
    import Chart from "$lib/d3/Chart.svelte";
    import Widget from "$lib/breadcrumps/Widget.svelte";
    let { data: expenses_data } = $props();

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
</script>

<Widget style="flex-col justify-center text-white gap-4 pt-12">
    <p class="text-3xl font-semibold">Текущие расходы</p>
    <p class="text-7xl font-semibold">{Number(expenses_data["2025"].expenses_related_plan*100).toFixed(2)}%</p>
    <div
		class="w-full h-full"
		bind:clientWidth={width}
		bind:clientHeight={height}
	>
		<Chart {dimensions}>
            <g
				transform={`translate(${dimensions.innerWidth / 2}, ${dimensions.innerHeight / 2 + 50})`}
			>
                <Arc
                    fill="gray"
                    innerRadius={120 * 0.5}
                    outerRadius={120}
                    startAngle={-Math.PI/2}
                    endAngle={Math.PI/2}
                    cornerRadius={10}
                    padAngle={0.01} 
                />
                <Arc
                    fill="white"
                    innerRadius={120 * 0.5}
                    outerRadius={120}
                    startAngle={-Math.PI/2}
                    endAngle={Math.min((expenses_data["2025"].expenses_related_plan) * Math.PI - Math.PI / 2, Math.PI / 2)}
                    cornerRadius={0}
                    padAngle={0} 
                />
            </g>
        </Chart>
    </div>

</Widget>