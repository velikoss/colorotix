<script>
    import MonthYearPicker from "$lib/breadcrumps/MonthYearPicker.svelte";
    let { data: fuel_km_per_month } = $props();

    let currentMonth = $state("05");
    let currentYear = $state(2023);
</script>

<MonthYearPicker
    data={fuel_km_per_month}
    bind:currentMonth
    bind:currentYear
    showMonthPicker={true}
>
    <p class="text-4xl text-left leading-none motion-preset-slide-down-sm">
        <span class="text-gray-400">Расходы на топливо:</span><br />
        {fuel_km_per_month[currentYear][currentMonth].fuel_in_month.toFixed(1)}
    </p>
    <p
        class="text-4xl text-left leading-none motion-preset-slide-down-sm motion-delay-75"
    >
        <span class="text-gray-400">Расстояние за месяц:</span><br />
        {fuel_km_per_month[currentYear][currentMonth].distance_in_month.toFixed(
            1
        )}
    </p>
    <p
        class="text-4xl text-left leading-none motion-preset-slide-down-sm motion-delay-150"
    >
        <span class="text-gray-400">Топливо на км.:</span><br />
        {fuel_km_per_month[currentYear][
            currentMonth
        ].fuel_effectiveness_in_month.toFixed(1)}
    </p>
</MonthYearPicker>