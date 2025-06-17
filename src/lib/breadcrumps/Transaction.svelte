<script lang="ts">
    import Img from "./Img.svelte";

    let { name, amount } = $props()

</script>

<div class="w-full flex flex-row mt-4 gap-4 h-[48px]">
    <div class="w-[48px]">
        <Img
            width="48px"
            src="https://starlightskins.lunareclipse.studio/render/pixel/{name}/face"
            fallback="https://cdnb.artstation.com/p/assets/images/images/003/577/817/large/yiannis-avgoloupis-steve-s-head.jpg"
        />
    </div>
    <div class="flex flex-col justify-center pb-1">
        <p class="font-semibold text-lg">{name}</p>
        <p class="text-nowrap">09 июня 2025 в 12.34</p>
    </div>
    <div class="w-full flex flex-col justify-center pb-1">
        <p class="text-lg text-right {amount > 0 ? "text-green-400" : "text-gray-300"}">{amount} ар</p>
    </div>
</div>
