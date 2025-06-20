<script>
    import MonthYearPicker from "$lib/breadcrumps/MonthYearPicker.svelte";
    import DataTable from "./DataTable.svelte";
    import { downtime } from "$lib/downtime";

    let currentMonth = $state("03");
    let currentYear = $state(2023);

    let columns = [
        { key: 'key', label: 'Номер', class: 'px-2 text-xl border-b border-r border-gray-700 w-3/6' },
        { key: 'count', label: 'Кол', class: 'px-2 text-xl text-right border-b border-r border-gray-700 w-1/6' },
        { key: 'sum', label: 'Сумма', class: 'px-2 text-xl text-right border-b border-gray-700 w-2/6', decimals: 1 }
    ];
</script>

<MonthYearPicker
    data={downtime}
    bind:currentMonth
    bind:currentYear
    showMonthPicker={true}
>
    <DataTable data={downtime[currentYear]?.[currentMonth] || {}} {columns} />
</MonthYearPicker>