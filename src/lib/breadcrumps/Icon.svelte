<script lang="ts">
    import { twMerge } from "tailwind-merge";
    let { value = $bindable(), style = "", children, href = "" } = $props();
</script>

<div class="relative">
    <a {href}>
        <div
            class={twMerge(
                "w-12 h-12 p-2 rounded-lg outline-none transition-all text-gray-200 duration-200 bg-white/0 border border-white/30 backdrop-blur-sm shadow shadow-white/5",
                style,
            )}
        >
            {@render children()}
        </div>
    </a>
</div>
