<script>
    import MonthYearPickerWide from "$lib/breadcrumps/MonthYearPickerWide.svelte";
    let { data: top_drivers_fines_by_month } = $props();
    import DataTable from "./DataTable.svelte";

    let currentYear = $state(2023)
    let currentMonth = $state("03")

    let columns = [
        { key: 'key', label: 'ФИО', class: 'px-2 text-xl border-b border-r border-gray-700 w-5/6' },
        { key: 'count', label: 'Кол-во штрафов', class: 'px-2 text-xl text-right border-b border-r border-gray-700 w-1/2', decimals: 2 },
        { key: 'sum', label: 'Сумма', class: 'px-2 text-xl text-right border-b border-gray-700 w-1/2', decimals: 2 }
    ];
</script>

<MonthYearPickerWide data={top_drivers_fines_by_month} bind:currentYear bind:currentMonth>
    <p class="text-xl text-center -mt-2 mb-2">Кол-во штрафов за месяц</p>
    <DataTable data={top_drivers_fines_by_month[currentYear][currentMonth]} columns={columns}/>
</MonthYearPickerWide>
