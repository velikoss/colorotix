<script>
    import { twMerge } from "tailwind-merge";
    import Widget from "./Widget.svelte";

    let { children, style="" } = $props();

</script>

<div class="relative w-[48rem] h-[48rem] flex flex-row justify-between col-span-2 row-span-2">
    <div class="absolute left-1/3 h-[47rem] bg-black w-60 z-0"></div>
    <div class="absolute top-1/3 w-[48rem] h-60 bg-black z-0"></div>
    <div>
        <Widget />
        <Widget />
    </div>
    <div>
        <Widget />
        <Widget />
    </div>
    <div class={twMerge("absolute w-full h-full", style)}>
        {@render children()}
    </div>
</div>