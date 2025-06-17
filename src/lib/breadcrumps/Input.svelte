<script lang="ts">
    import { twMerge } from "tailwind-merge";
    let { value = $bindable(), style = "", placeholder = "" } = $props();
</script>

<div class="relative">
    <input
        {placeholder}
        class={twMerge(
            "w-full px-4 py-2 rounded-lg outline-none transition-all duration-200 bg-white/10 not-focus:border-white/30 focus:border-white/80 focus:ring-white/30 placeholder:text-gray-200 placeholder:opacity-100 backdrop-blur-sm shadow shadow-white/5",
            style,
        )}
    />
</div>
