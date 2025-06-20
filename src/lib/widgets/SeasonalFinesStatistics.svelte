<script>
    import MonthYearPicker from "$lib/breadcrumps/MonthYearPicker.svelte";
    import Bars from "$lib/d3/Bars.svelte";
    import { seasonal_fines } from "$lib/seasonal_fines";
    
    let currentYear = $state(2023);
    let currentMonth = $state("03");
</script>
<MonthYearPicker data={seasonal_fines} bind:currentMonth bind:currentYear showMonthPicker={false}>
    <Bars rawData={seasonal_fines[currentYear].seasonal_sums} margins={{ top: 20, right: 20, bottom: 0, left: 70 }}/>
    <div class="w-full text-xl text-center text-white pt-5">Штрафы по кварталам</div>
</MonthYearPicker>