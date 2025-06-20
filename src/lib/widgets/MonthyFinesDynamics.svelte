<script>
    import MonthYearPicker from "$lib/breadcrumps/MonthYearPicker.svelte";
    import MonthYearPickerWide from "$lib/breadcrumps/MonthYearPickerWide.svelte";
    import Bars from "$lib/d3/Bars.svelte";
    import { seasonal_fines } from "$lib/seasonal_fines";
    
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
        const yearData = seasonal_fines[currentYear] || {};
        const aggregated = {};

        for (let month = 1; month <= 12; month++) {
            const monthKey = month.toString().padStart(2, "0");
            const monthName = months[month - 1]; 
            aggregated[monthName] =
                yearData.monthly_fines[monthKey]?.toFixed(2) || 0;
        }

        return aggregated;
    }
</script>

<MonthYearPickerWide data={seasonal_fines} bind:currentYear showMonthPicker={false}>
    <div class="w-full h-full relative">
        <div class="absolute text-2xl text-center w-full flex h-full flex-col inset-x-0">
            <p>Динамика штрафов</p>
            <Bars
                margins={{ top: 20, right: 40, bottom: 0, left: 76 }}
                rawData={getData()}
                valueKeys={["amortization"]}
            />
        </div>
    </div>
</MonthYearPickerWide>