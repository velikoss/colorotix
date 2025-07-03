<script>
    import MonthYearPicker from "$lib/breadcrumps/MonthYearPicker.svelte";
    import DataTable from "./DataTable.svelte";
    let { data: year_drivers_fine } = $props();

    let currentMonth = $state("03");
    let currentYear = $state(2023);

    let columns = [
        { key: 'key', label: 'Номер', class: 'px-2 text-xl border-b border-r border-gray-700 w-5/6' },
        { key: 'value', label: 'Штраф', class: 'px-2 text-xl text-right border-b border-gray-700 w-1/2', decimals: 2 }
    ];
</script>

<MonthYearPicker
    data={year_drivers_fine}
    bind:currentMonth
    bind:currentYear
    showMonthPicker={false}
>
    <div class="text-xl text-center w-full">Штрафы по годам</div>
    <DataTable data={year_drivers_fine[currentYear] || {}} {columns} />
</MonthYearPicker>