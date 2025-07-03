<script>
    import MonthYearPicker from "$lib/breadcrumps/MonthYearPicker.svelte";
    import DataTable from "./DataTable.svelte";
    let { data: vehicle_efficiency_per_year } = $props();

    let currentMonth = $state("03");
    let currentYear = $state(2023);

    let columns = [
        { key: 'key', label: 'Номер', class: 'px-2 text-xl border-b border-r border-gray-700 w-5/6' },
        { key: 'value', label: 'Эфф', class: 'px-2 text-xl text-right border-b border-gray-700 w-1/2', decimals: 2 }
    ];
</script>

<MonthYearPicker
    data={vehicle_efficiency_per_year}
    bind:currentMonth
    bind:currentYear
    showMonthPicker={false}
>
    <div class="text-xl text-center w-full">Эффективность машин</div>
    <DataTable data={vehicle_efficiency_per_year[currentYear] || {}} {columns} />
</MonthYearPicker>