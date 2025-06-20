<script lang="ts">
	import { setContext } from "svelte";
	import { get } from "svelte/store";

	let { dimensions } = $props<{ dimensions: any }>();


	let dims = $derived(
		typeof dimensions.subscribe === "function" ? $dimensions : dimensions,
	);


	setContext("Chart", { dimensions });
</script>

<svg width={dims.width} height={dims.height}>
	<g transform="translate({dims.margins.left}, {dims.margins.top})">
		<slot />
	</g>
</svg>
