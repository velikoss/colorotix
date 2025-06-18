<script lang="ts">
    let { left = 0, top = 0, children = undefined } = $props();
</script>

<g transform={`translate(${left}, ${top})`}>
    {#if children}
	    {@render children()}
    {/if}
</g>