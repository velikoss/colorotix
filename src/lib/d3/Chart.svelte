<script lang="ts">
	import { setContext } from "svelte";
	import { get } from "svelte/store"; // Import get for store dereferencing

	let { dimensions } = $props<{ dimensions: any }>();

	// Dereference store if dimensions is a store, otherwise use as-is
	let dims = $derived(
		typeof dimensions.subscribe === "function" ? $dimensions : dimensions,
	);

	// Set context with the store (pass original dimensions to maintain store for Axis/Grid)
	setContext("Chart", { dimensions });
</script>

<svg width={dims.width} height={dims.height}>
	<g transform="translate({dims.margins.left}, {dims.margins.top})">
		<slot />
	</g>
</svg>
