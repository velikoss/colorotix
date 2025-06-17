<script lang="ts">
    import { twMerge } from "tailwind-merge";
    import Icon from "./Icon.svelte";
    
    let { text = "", icon = "", href = "", style = "" } = $props();

</script>

<div class="w-16 text-xs flex flex-col justify-center items-center gap-2 hover:motion-scale-out-105 not-hover:motion-scale-in-105">
    <Icon style={`${style} flex items-center justify-center`} {href}>
        <img src={icon} alt="" />
    </Icon>
    <span>{text}</span>
</div>