<script lang="ts">
    import { twMerge } from 'tailwind-merge';
    let { children, style = "", child = "" } = $props();
</script>

<div class={twMerge("relative motion-preset-blur-down flex md:rounded-xl border border-white/25 shadow-xl p-6 overflow-hidden backdrop-blur-md", style)}>
    <div class="absolute inset-0 bg-[url(noise.svg)] opacity-20 -z-10"></div>
    <div class={twMerge("relative", child)}>
        {#if children}
            {@render children()}
        {/if}
    </div>
</div>