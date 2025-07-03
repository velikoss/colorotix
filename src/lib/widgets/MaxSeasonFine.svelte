<script>
    import MonthYearPicker from "$lib/breadcrumps/MonthYearPicker.svelte";
    let { data: seasonal_fines } = $props();
    import DataTable from "./DataTable.svelte";

    let currentYear = $state(2023);
    let currentMonth = $state("03");
</script>

<MonthYearPicker data={seasonal_fines} bind:currentYear bind:currentMonth>
    <p class="text-4xl text-left leading-none motion-preset-slide-down-sm">
        <span class="text-gray-400">Максимальный квартал по штрафам</span><br />
        {seasonal_fines[currentYear].max_season}
    </p>
    <p
        class="text-4xl text-left leading-none motion-preset-slide-down-sm motion-delay-75 mt-2"
    >
        {seasonal_fines[currentYear].seasonal_sums[
            seasonal_fines[currentYear].max_season
        ].toFixed(2)}
    </p>
</MonthYearPicker>
