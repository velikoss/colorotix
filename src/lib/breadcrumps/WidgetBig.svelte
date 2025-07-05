<script>
    import { twMerge } from "tailwind-merge";
    import Widget from "./Widget.svelte";

    let { children, style="" } = $props();

</script>

<div class={twMerge("w-192 h-92 clip flex justify-center items-center overflow-visible p-8 relative col-span-2", style)}>
    <div class="absolute z-0 flex flex-row inset-x-0 -mt-4">
        <Widget />
        <Widget />
    </div>
    <div class="absolute left-1/3 h-94 bg-black w-60 z-0 -mt-4"></div>
    {#if children}
        <div class="relative h-92">
            {@render children()}
        </div>
    {/if}
</div>

<style>
</style>