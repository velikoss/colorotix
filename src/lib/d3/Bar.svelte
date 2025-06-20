<script lang="ts">
    let {
        x = 0,
        y = 0,
        width = 0,
        height = 0,
        fill = "black",
        style = "",
        onmouseover = (event: MouseEvent) => {},
		onmousemove = (event: MouseEvent) => {},
		onmouseout = (event: MouseEvent) => {}
    } = $props();
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<rect
    class="Bar"
    {x}
    {y}
    {height}
    {width}
    {fill}
    {style}
    {onmouseover}
    {onmousemove}
    {onmouseout}
/>

<style>
    .Bar {
        transition: all 0.5s ease;
    }
</style>
