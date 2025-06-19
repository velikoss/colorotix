<script>
    import Widget from "$lib/breadcrumps/Widget.svelte";
    import { fuel_km_per_month } from "$lib/fuel_km_per_month";

    let currentMonth = $state("05");
    let currentYear = $state(2023);
    let datepicker = $state(false);

    function findPreviousAvailableMonth() {
        let monthNum = parseInt(currentMonth, 10);
        let yearNum = currentYear;

        do {
            monthNum--;
            if (monthNum < 1) {
                monthNum = 12;
                yearNum--;
            }

            if (
                yearNum <
                Math.min(...Object.keys(fuel_km_per_month).map(Number))
            ) {
                return;
            }
        } while (
            !fuel_km_per_month[yearNum]?.[monthNum.toString().padStart(2, "0")]
        );

        currentMonth = monthNum.toString().padStart(2, "0");
        currentYear = yearNum;
    }

    function findNextAvailableMonth() {
        let monthNum = parseInt(currentMonth, 10);
        let yearNum = currentYear;

        do {
            monthNum++;
            if (monthNum > 12) {
                monthNum = 1;
                yearNum++;
            }

            if (
                yearNum >
                Math.max(...Object.keys(fuel_km_per_month).map(Number))
            ) {
                return;
            }
        } while (
            !fuel_km_per_month[yearNum]?.[monthNum.toString().padStart(2, "0")]
        );

        currentMonth = monthNum.toString().padStart(2, "0");
        currentYear = yearNum;
    }

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

    function getMonthName(month) {
        return months[parseInt(month, 10) - 1];
    }

    const canGoPrevious = $derived(() => {
        const prevMonth = parseInt(currentMonth, 10) - 1;
        const prevYear = prevMonth < 1 ? currentYear - 1 : currentYear;
        const prevMonthStr = (prevMonth < 1 ? 12 : prevMonth)
            .toString()
            .padStart(2, "0");

        return (
            fuel_km_per_month[prevYear]?.[prevMonthStr] !== undefined ||
            currentYear >
                Math.min(...Object.keys(fuel_km_per_month).map(Number))
        );
    });

    const canGoNext = $derived(() => {
        const nextMonth = parseInt(currentMonth, 10) + 1;
        const nextYear = nextMonth > 12 ? currentYear + 1 : currentYear;
        const nextMonthStr = (nextMonth > 12 ? 1 : nextMonth)
            .toString()
            .padStart(2, "0");

        return (
            fuel_km_per_month[nextYear]?.[nextMonthStr] !== undefined ||
            currentYear <
                Math.max(...Object.keys(fuel_km_per_month).map(Number))
        );
    });
</script>

<Widget style="text-white flex-col items-start p-10 pt-16">
    <div
        class="pt-4 absolute top-1.5 w-full inset-x-0 h-10 text-center text-xl flex flex-row justify-between items-center px-12"
    >
        <button
            onclick={findPreviousAvailableMonth}
            class="cursor-pointer"
            class:opacity-50={!canGoPrevious()}
            disabled={!canGoPrevious()}
            aria-label="prevMonth"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-chevron-left"
            >
                <path d="m15 18-6-6 6-6" />
            </svg>
        </button>
        <button
            class="cursor-pointer"
            onclick={() => (datepicker = !datepicker)}
            >{getMonthName(currentMonth)} {currentYear}</button
        >
        <button
            onclick={findNextAvailableMonth}
            class="cursor-pointer"
            class:opacity-50={!canGoNext()}
            disabled={!canGoNext()}
            aria-label="nextMonth"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-chevron-right"
            >
                <path d="m9 18 6-6-6-6" />
            </svg>
        </button>
    </div>
    {#if !datepicker}
        <p class="text-4xl text-left leading-none motion-preset-slide-down-sm">
            <span class="text-gray-400">Расходы на топливо:</span><br />
            {fuel_km_per_month[currentYear][currentMonth].fuel_in_month.toFixed(
                1,
            )}
        </p>
        <p
            class="text-4xl text-left leading-none motion-preset-slide-down-sm motion-delay-75"
        >
            <span class="text-gray-400">Расстояние за месяц:</span><br />
            {fuel_km_per_month[currentYear][
                currentMonth
            ].distance_in_month.toFixed(1)}
        </p>
        <p
            class="text-4xl text-left leading-none motion-preset-slide-down-sm motion-delay-150"
        >
            <span class="text-gray-400">Топливо на км.:</span><br />
            {fuel_km_per_month[currentYear][
                currentMonth
            ].fuel_effectiveness_in_month.toFixed(1)}
        </p>
    {:else}
        <div class="w-full flex flex-col gap-4 motion-preset-slide-down-sm">
            <!-- Year selection -->
            <div class="flex flex-row px-6 justify-between items-center">
                <button
                    onclick={() => currentYear--}
                    class="cursor-pointer p-2"
                    disabled={currentYear <=
                        Math.min(...Object.keys(fuel_km_per_month).map(Number))}
                    class:opacity-50={currentYear <=
                        Math.min(...Object.keys(fuel_km_per_month).map(Number))}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <path d="m15 18-6-6 6-6" />
                    </svg>
                </button>

                <div class="text-xl">{currentYear}</div>

                <button
                    onclick={() => currentYear++}
                    class="cursor-pointer p-2"
                    disabled={currentYear >=
                        Math.max(...Object.keys(fuel_km_per_month).map(Number))}
                    class:opacity-50={currentYear >=
                        Math.max(...Object.keys(fuel_km_per_month).map(Number))}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <path d="m9 18 6-6-6-6" />
                    </svg>
                </button>
            </div>

            <!-- Month grid -->
            <div class="grid grid-cols-3 gap-2">
                {#each months as month, i}
                    <button
                        class="p-2 rounded-md text-center"
                        class:bg-gray-700={getMonthName(currentMonth) === month}
                        disabled={!fuel_km_per_month[currentYear]?.[
                            (i + 1).toString().padStart(2, "0")
                        ]}
                        class:opacity-50={!fuel_km_per_month[currentYear]?.[
                            (i + 1).toString().padStart(2, "0")
                        ]}
                        onclick={() => {
                            currentMonth = (i + 1).toString().padStart(2, "0");
                            datepicker = false;
                        }}
                    >
                        {month.slice(0, 3)}
                    </button>
                {/each}
            </div>
        </div>
    {/if}
</Widget>
