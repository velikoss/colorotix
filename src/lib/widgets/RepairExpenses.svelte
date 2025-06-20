<script>
    import MonthYearPicker from "$lib/breadcrumps/MonthYearPicker.svelte";
    import MonthYearPickerWide from "$lib/breadcrumps/MonthYearPickerWide.svelte";
    import Widget from "$lib/breadcrumps/Widget.svelte";
    import WidgetWide from "$lib/breadcrumps/WidgetWide.svelte";
    import Treemap from "$lib/d3/Treemap.svelte";
    import { repair_expenses_by_month_year } from "$lib/repair_expenses_by_month_year"
    
    let currentMonth = $state("03")
    let currentYear = $state(2023)

</script>

<div class="hidden md:block col-span-2">
    <MonthYearPickerWide data={repair_expenses_by_month_year} bind:currentMonth bind:currentYear>
        <p class="text-xl text-center mb-2 -mt-2">Структура трат</p>
        <Treemap height={290} data={repair_expenses_by_month_year[currentYear][currentMonth].structure} />
    </MonthYearPickerWide>
</div>
<div class="block md:hidden col-span-1">
    <MonthYearPicker bind:currentMonth bind:currentYear>
        <Treemap width={324} height={324} data={repair_expenses_by_month_year[currentYear][currentMonth].structure} />
    </MonthYearPicker>
</div>