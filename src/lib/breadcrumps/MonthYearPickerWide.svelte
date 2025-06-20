<script>
    import WidgetWide from "./WidgetWide.svelte";

    let { 
        data = {}, 
        currentMonth = $bindable("01"),
        currentYear = $bindable(2023),
        showMonthPicker = true,
        children
    } = $props();
    let datepicker = $state(false);
    let animClass = $state();

    const months = [
        "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
        "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
    ];

    function getMonthName(month) {
        return months[parseInt(month, 10) - 1] || "";
    }

    function animateTransition(direction) {
        animClass = "";
        setTimeout(() => {
            animClass = direction === "left" 
                ? "motion-preset-slide-left" 
                : "motion-preset-slide-right";
            setTimeout(() => {
                animClass = "";
            }, 500);
        }, 1);
    }

    function isYearOnlyData() {
        if (!data || Object.keys(data).length === 0) return true;
        return Object.values(data).some(yearData => 
            yearData && typeof yearData === 'object' && 
            !Object.keys(yearData).some(key => 
                /^\d{2}$/.test(key) && parseInt(key) >= 1 && parseInt(key) <= 12
            )
        );
    }

    function getAvailableYears() {
        return Object.keys(data)
            .map(Number)
            .filter(year => !isNaN(year) && data[year])
            .sort((a, b) => a - b);
    }

    function findPreviousAvailableYear() {
        const years = getAvailableYears();
        const currentIndex = years.indexOf(currentYear);
        if (currentIndex > 0) {
            currentYear = years[currentIndex - 1];
            animateTransition("left");
        }
    }

    function findNextAvailableYear() {
        const years = getAvailableYears();
        const currentIndex = years.indexOf(currentYear);
        if (currentIndex < years.length - 1) {
            currentYear = years[currentIndex + 1];
            animateTransition("right");
        }
    }

    function findPreviousAvailableMonth() {
        if (!showMonthPicker || isYearOnlyData()) {
            findPreviousAvailableYear();
            return;
        }
        
        let monthNum = parseInt(currentMonth, 10);
        let yearNum = currentYear;

        do {
            monthNum--;
            if (monthNum < 1) {
                monthNum = 12;
                yearNum--;
            }
            if (yearNum < Math.min(...getAvailableYears())) {
                return;
            }
        } while (!data[yearNum]?.[monthNum.toString().padStart(2, "0")]);

        animateTransition("left");
        currentMonth = monthNum.toString().padStart(2, "0");
        currentYear = yearNum;
    }

    function findNextAvailableMonth() {
        if (!showMonthPicker || isYearOnlyData()) {
            findNextAvailableYear();
            return;
        }
        
        let monthNum = parseInt(currentMonth, 10);
        let yearNum = currentYear;

        do {
            monthNum++;
            if (monthNum > 12) {
                monthNum = 1;
                yearNum++;
            }
            if (yearNum > Math.max(...getAvailableYears())) {
                return;
            }
        } while (!data[yearNum]?.[monthNum.toString().padStart(2, "0")]);

        animateTransition("right");
        currentMonth = monthNum.toString().padStart(2, "0");
        currentYear = yearNum;
    }

    const canGoPrevious = $derived(() => {
        const years = getAvailableYears();
        if (!years.length) return false;
        
        if (!showMonthPicker || isYearOnlyData()) {
            return currentYear > Math.min(...years);
        }
        
        const prevMonth = parseInt(currentMonth, 10) - 1;
        const prevYear = prevMonth < 1 ? currentYear - 1 : currentYear;
        const prevMonthStr = (prevMonth < 1 ? 12 : prevMonth)
            .toString()
            .padStart(2, "0");

        return (
            data[prevYear]?.[prevMonthStr] !== undefined ||
            currentYear > Math.min(...years)
        );
    });

    const canGoNext = $derived(() => {
        const years = getAvailableYears();
        if (!years.length) return false;
        
        if (!showMonthPicker || isYearOnlyData()) {
            return currentYear < Math.max(...years);
        }
        
        const nextMonth = parseInt(currentMonth, 10) + 1;
        const nextYear = nextMonth > 12 ? currentYear + 1 : currentYear;
        const nextMonthStr = (nextMonth > 12 ? 1 : nextMonth)
            .toString()
            .padStart(2, "0");

        return (
            data[nextYear]?.[nextMonthStr] !== undefined ||
            currentYear < Math.max(...years)
        );
    });
</script>

<WidgetWide style="text-white flex-col items-start p-10 pt-16">
    <div class="pt-4 absolute top-1.5 w-full inset-x-0 h-10 text-center text-xl flex flex-row justify-between items-center px-12">
        <button
            onclick={findPreviousAvailableMonth}
            class="cursor-pointer"
            class:opacity-50={!canGoPrevious()}
            disabled={!canGoPrevious()}
            aria-label="prev"
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
            class="cursor-pointer {animClass}"
            onclick={() => (datepicker = !datepicker)}
        >
            {isYearOnlyData() || !showMonthPicker ? currentYear : `${getMonthName(currentMonth)} ${currentYear}`}
        </button>
        <button
            onclick={findNextAvailableMonth}
            class="cursor-pointer"
            class:opacity-50={!canGoNext()}
            disabled={!canGoNext()}
            aria-label="next"
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

    {#if datepicker}
        <div class="w-full flex flex-col gap-4 motion-preset-slide-down-sm">
            <!-- Year selection -->
            <div class="flex flex-row px-6 justify-between items-center">
                <button
                    onclick={() => {
                        findPreviousAvailableYear();
                    }}
                    class="cursor-pointer p-2"
                    disabled={currentYear <= Math.min(...getAvailableYears())}
                    class:opacity-50={currentYear <= Math.min(...getAvailableYears())}
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
                    onclick={() => {
                        findNextAvailableYear();
                    }}
                    class="cursor-pointer p-2"
                    disabled={currentYear >= Math.max(...getAvailableYears())}
                    class:opacity-50={currentYear >= Math.max(...getAvailableYears())}
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

            {#if showMonthPicker && !isYearOnlyData()}
                <!-- Month grid -->
                <div class="grid grid-cols-3 gap-2">
                    {#each months as month, i}
                        <button
                            class="p-2 rounded-md text-center"
                            class:bg-gray-700={getMonthName(currentMonth) === month}
                            disabled={!data[currentYear]?.[(i + 1).toString().padStart(2, "0")]}
                            class:opacity-50={!data[currentYear]?.[(i + 1).toString().padStart(2, "0")]}
                            onclick={() => {
                                currentMonth = (i + 1).toString().padStart(2, "0");
                                datepicker = false;
                            }}
                        >
                            {month.slice(0, 3)}
                        </button>
                    {/each}
                </div>
            {/if}
        </div>
    {:else}
        {@render children()}
    {/if}
</WidgetWide>