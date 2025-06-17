<script lang="ts">
    import { twMerge } from "tailwind-merge";
    let { value = $bindable(), style = "", parent = "", children } = $props();
</script>

<div class={twMerge("relative", parent)}>
    <button
        class={twMerge(
            "w-full px-4 py-2 rounded-lg outline-none transition-all text-gray-200 duration-200 bg-white/10 border ring not-hover:ring-0 border-white/30 hover:border-white/80 hover:ring-white/30 backdrop-blur-sm shadow shadow-white/5",
            style,
        )}
    >
    {@render children()}
    </button>
</div>
