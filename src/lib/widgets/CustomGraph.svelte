<script>
    import MonthYearPicker from "$lib/breadcrumps/MonthYearPicker.svelte";
    import Bars from "$lib/d3/Bars.svelte";
    import { building_expenses_by_month } from "$lib/building_expenses_by_month";
    import { downtime } from "$lib/downtime";
    import { logistic_expenses_by_month } from "$lib/logistic_expenses_by_month";
    import { pharma_expenses_by_month } from "$lib/pharma_expenses_by_month";
    import { vehicle_usage_by_month } from "$lib/vehicle_usage_by_month";

    let { type } = $props();
    // let type = "Фармацевтика";
    const types = {
        "Логистика": "Траты в месяц",
        "Фармацевтика": "Траты в месяц",
        "Строительство": "Количество трат",
        "Ритейл": "Количество простоя",
        "Такси": "Количество простоя",
        "Доставка": "Количество простоя",
        "Автобусы": "Количество простоя",
        "Каршеринг": "Количество активных 🚗",
        "Другое": "Количество простоя",
    };

    function typeCheck(type) {
        return ["Логистика", "Фармацевтика", "Строительство"].includes(type);
    }

    let data = $state();
    switch (type) {
        case "Логистика":
            data = logistic_expenses_by_month;
            break;
        case "Фармацевтика":
            data = pharma_expenses_by_month;
            break;
        case "Строительство":
            data = building_expenses_by_month;
            break;
        case "Каршеринг":
            data = vehicle_usage_by_month;
            break;
        default:
            data = downtime;
            break;
    }

    let currentMonth = $state("05");
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

    let displayData = $derived(() => {
        if (!typeCheck(type)) {
           
            const yearData = data[currentYear] || {};
            const aggregated = {};
            const monthz = Object.keys(yearData).sort();
            for (const month of monthz) {
                const monthData = yearData[month];
                let monthTotal = 0;
                for (const vehicle in monthData) {
                    monthTotal += monthData[vehicle].days_used
                        ? monthData[vehicle].days_used
                        : monthData[vehicle].count || 0;
                }
                aggregated[months[Number(month) - 1]] = monthTotal;
            }
            return aggregated;
        }
        return data[currentYear]?.[currentMonth];
    });
</script>

<MonthYearPicker
    {data}
    bind:currentMonth
    bind:currentYear
    showMonthPicker={typeCheck(type)}
>
    {#if typeCheck(type)}
        <Bars
            rawData={displayData()}
            valueKeys={Object.keys(displayData() || {})}
            {type}
        />
    {:else}
        <Bars
            rawData={displayData()}
            valueKeys={Object.keys(displayData())}
            {type}
        />
    {/if}
    <div class="w-full text-center text-2xl pt-1">{types[type]}</div>
</MonthYearPicker>