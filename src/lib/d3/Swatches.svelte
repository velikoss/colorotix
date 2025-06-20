<!-- Swatches.svelte -->
<script>
    let {
        color,
        swatchWidth = 15,
        swatchHeight = 15,
        marginLeft = 0,
    } = $props();
</script>

<div
    style="
    display: flex; 
    align-items: center; 
    min-height: 33px; 
    margin-left: {marginLeft}px; 
    font: 10px sans-serif;
  "
>
    {#each color.domain() as category}
        <span
            style="
        display: inline-flex;
        align-items: center; 
        margin-right: 1em; 
        --color: {color(category)};
        --width: {swatchWidth}px;
        --height: {swatchHeight}px;
      "
        >
            {category}
        </span>
    {/each}
</div>

<style>
    span::before {
        content: "";
        width: var(--width);
        height: var(--height);
        margin-right: 0.5em;
        background: var(--color);
    }
</style>
