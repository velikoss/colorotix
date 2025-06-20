<script>
    import MonthYearPicker from "$lib/breadcrumps/MonthYearPicker.svelte";
    import MonthYearPickerWide from "$lib/breadcrumps/MonthYearPickerWide.svelte";
    import Widget from "$lib/breadcrumps/Widget.svelte";
    import WidgetWide from "$lib/breadcrumps/WidgetWide.svelte";
    import Bars from "$lib/d3/Bars.svelte";
    import Treemap from "$lib/d3/Treemap.svelte";
    import { amortization_by_month_year } from "$lib/amortization_by_month_year";

    let currentMonth = $state("03");
    let currentYear = $state(2023);

    const months = [
        "Январь",
        "Февраль",
        "Март",
        "Апрель",
        "Май",
        "Июнь",
        "Июль",
        "Август",
        "Сентябрь",
        "Октябрь",
        "Ноябрь",
        "Декабрь",
    ];

    function getData() {
        // Get the data for the selected year
        const yearData = amortization_by_month_year[currentYear] || {};
        const aggregated = {};

        // Iterate through all possible months (01 to 12)
        for (let month = 1; month <= 12; month++) {
            const monthKey = month.toString().padStart(2, "0"); // e.g., "01", "02"
            const monthName = months[month - 1]; // Get Russian month name
            // Assign the total for the month, or 0 if no data
            aggregated[monthName] =
                yearData[monthKey]?.amortization.toFixed(2) || 0;
        }

        return aggregated;
    }
</script>

<div class="hidden md:block col-span-2">
    <MonthYearPickerWide
        data={amortization_by_month_year}
        bind:currentMonth
        bind:currentYear
        showMonthPicker={false}
    >
        <div class="w-full h-full flex flex-col relative">
            <div class="absolute text-2xl text-center w-full">Амортизация</div>
            <Bars
                margins={{ top: 50, right: 20, bottom: 30, left: 90 }}
                rawData={getData()}
                valueKeys={["amortization"]}
            />
        </div>
    </MonthYearPickerWide>
</div>
<div class="block md:hidden col-span-1">
    <MonthYearPicker
        data={amortization_by_month_year}
        bind:currentMonth
        bind:currentYear
        showMonthPicker={false}
    >
        <div class="w-full h-full flex flex-col relative">
            <div class="absolute text-2xl text-center w-full">Амортизация</div>
            <Bars
                margins={{ top: 50, right: 0, bottom: 0, left: -1 }}
                rawData={getData()}
                valueKeys={["amortization"]}
            />
        </div>
    </MonthYearPicker>
</div>
