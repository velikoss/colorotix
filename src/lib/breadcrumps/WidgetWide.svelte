<script>
    import { twMerge } from "tailwind-merge";
    import Widget from "./Widget.svelte";

    let { children, style="" } = $props();

</script>

<div class="relative w-[48rem] h-94 flex flex-row justify-between col-span-2">
    <div class="absolute left-1/3 h-94 bg-black w-60 z-0"></div>
    <Widget />
    <Widget />
    <div class={twMerge("absolute w-full h-full", style)}>
        {@render children()}
    </div>
</div>