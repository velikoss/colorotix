<script lang="ts">

    let { style } = $props();

</script>

<div class="card relative min-w-80 w-full h-120 px-8 py-10 mb-2 rounded-3xl bg-white inter overflow-hidden">
    <div class="absolute inset-0 bg-linear-50 from-white via-(--via) to-white blur-xl scale-125" style="--via: var(--color-{style}-500);"></div>
    <div class="absolute inset-0 bg-[url(noise.svg)] opacity-30"></div>
    <div class="absolute w-[calc(100%-4rem)] flex flex-row justify-between items-center">
        <p class="font-[Murmure] text-2xl sm:text-3xl md:text-4xl text-white">Флоу Банк</p>
        <img width="32px sm:40px md:48px" src="card.png" alt="Card Icon">
    </div>
    <div class="absolute bottom-28 flex flex-col items-start">
        <p class="text-md text-black leading-tight">Номер Карты</p>
        <p class="text-2xl text-black">6584 6483 2282 1488</p>
    </div>
    <div class="absolute inset-x-0 px-8 bottom-0 h-18 bg-linear-90 from-(--from) to-(--to) w-full flex flex-row items-center justify-between" style="--from: var(--color-{style}-100); --to: var(--color-{style}-300);">
        <div class="flex-col items-start justify-center">
            <p class="text-xs text-black leading-tight">Имя держателя</p>
            <p class="text-md text-black">VELIKOSS</p>
        </div>
        <div class="flex-col items-end justify-center text-right">
            <p class="text-xs text-black leading-tight">Баланс</p>
            <p class="text-md text-black">100АР</p>
        </div>
    </div>
   
</div>

<style>
    @media (max-width: 640px) {
        .max-w-\[360px\] {
            max-width: 100%;
        }
    }
</style>