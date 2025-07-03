<script>
    import MonthYearPickerWide from "$lib/breadcrumps/MonthYearPickerWide.svelte";
    let { data: salary_data } = $props();
    import DataTable from "./DataTable.svelte";

    let currentYear = $state(2023)
    let currentMonth = $state("03")

    let columns = [
        { key: 'key', label: 'ФИО', class: 'px-2 text-xl border-b border-r border-gray-700 w-5/6' },
        { key: 'value', label: 'ЗП', class: 'px-2 text-xl text-right border-b border-gray-700 w-1/2', decimals: 2 }
    ];
</script>

<MonthYearPickerWide data={salary_data} bind:currentYear bind:currentMonth>
    <div class="text-xl text-center w-full -mt-2 -mb-2">Статистика зарплат</div>
    <DataTable data={salary_data[currentYear][currentMonth]} columns={columns} badfix={true}/>  
</MonthYearPickerWide>
