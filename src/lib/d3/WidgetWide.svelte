<script>
    import { twMerge } from "tailwind-merge";
    import Widget from "./Widget.svelte";

    let { children, style="" } = $props();

</script>

<div class="relative w-[48rem] h-94 flex flex-row justify-between">
    <div class="absolute left-1/3 h-94 bg-black w-60"></div>
    <Widget />
    <Widget />
    <div class="absolute w-full h-full">
        {@render children()}
    </div>
</div>