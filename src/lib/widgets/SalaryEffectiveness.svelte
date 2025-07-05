<script>
    import MonthYearPickerWide from "$lib/breadcrumps/MonthYearPickerWide.svelte";
    let { data: top_drivers_salary_efficiency } = $props();
    import DataTable from "./DataTable.svelte";

    let currentYear = $state(2023)
    let currentMonth = $state("03")

    let columns = [
        { key: 'key', label: 'ФИО', class: 'px-2 text-xl border-b border-r border-gray-700 w-5/6' },
        { key: 'value', label: 'Эфф', class: 'px-2 text-xl text-right border-b border-gray-700 w-1/2', decimals: 2 }
    ];
</script>

<MonthYearPickerWide data={top_drivers_salary_efficiency} bind:currentYear bind:currentMonth>
    <div class="text-xl text-center w-full -mt-2 -mb-2">Эффективность зарплаты</div>
    <DataTable data={top_drivers_salary_efficiency[currentYear][currentMonth]} columns={columns} badfix={true}/>  
</MonthYearPickerWide>
