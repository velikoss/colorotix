<script>
    import MonthYearPickerWide from "$lib/breadcrumps/MonthYearPickerWide.svelte";
    import Bars from "$lib/d3/Bars.svelte";
    let { data: fuel_km_per_month } = $props();
    
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
        const yearData = fuel_km_per_month[currentYear] || {};
        const aggregated = {};

        // Iterate through all possible months (01 to 12)
        for (let month = 1; month <= 12; month++) {
            const monthKey = month.toString().padStart(2, "0"); // e.g., "01", "02"
            const monthName = months[month - 1]; // Get Russian month name
            // Assign the total for the month, or 0 if no data
            aggregated[monthName] =
                yearData[monthKey]?.fuel_in_month.toFixed(2) || 0;
        }

        return aggregated;
    }
</script>
<MonthYearPickerWide data={fuel_km_per_month} bind:currentMonth bind:currentYear showMonthPicker={false}>
    <div class="w-full h-full flex flex-col relative">
        <div class="absolute text-2xl text-center w-full">Динамика трат на топливо</div>
        <Bars
            margins={{ top: 50, right: 20, bottom: 30, left: 90 }}
            rawData={getData()}
            valueKeys={["fuel_in_month"]}
        />
    </div>
</MonthYearPickerWide>