<script>
    import CreditCard from "./CreditCard.svelte";

</script>
<div class="flex flex-col items-center w-full h-full justify-evenly">
    <div class="absolute z-50 w-full h-full flex flex-row items-center justify-between">
        <p class="text-4xl">{"<"}</p>
        <p class="text-4xl">{">"}</p>
    </div>
    <div class="relative flex flex-row w-full justify-center items-end overflow-visible">
        <div class="absolute rotate-10 scale-90 translate-x-30 blur-[1px] cursor-grab pointer-events-auto">
            <p class="text-2xl text-right">Карта президента</p>
            <CreditCard style="neutral" />
        </div>
        <div class="z-50">
            <p class="text-2xl text-center">Личная карта</p>
            <CreditCard style="purple" />
        </div>
        <div class="absolute -rotate-10 scale-90 -translate-x-30 blur-[1px] cursor-grab pointer-events-auto">
            <p class="text-2xl text-left">Карта славика</p>
            <CreditCard style="pink" />
        </div>
    </div>
</div>