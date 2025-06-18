<script lang="ts">
    import { twMerge } from "tailwind-merge";
    import Icon from "./Icon.svelte";
    
    let { text = "", icon = "", href = "", style = "", width = "" } = $props();

</script>

<div class="relative w-16 text-xs group flex flex-col justify-center items-center gap-2">
    <Icon style={`${style} flex items-center justify-center`} {href}>
        <img width={width} height={width} src={icon} alt="" />
    </Icon>
    <div class="absolute hidden group-hover:flex group-hover:motion-preset-fade -right-3 translate-x-full w-fit px-2 py-1 bg-gray-700 rounded-lg text-center text-white text-sm before:content-[''] before:absolute before:top-1/2  before:right-[100%] before:-translate-y-1/2 before:border-8 before:border-y-transparent before:border-l-transparent before:border-r-gray-700 z-40">{text}</div>
</div>