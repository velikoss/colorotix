<script>
    import Bagel from "$lib/widgets/Bagel.svelte";
    import Plot from "$lib/widgets/Plot.svelte";
    import MonthStatistics from "$lib/widgets/MonthStatistics.svelte";
    import Plan from "$lib/widgets/Plan.svelte";
    import CustomGraph from "$lib/widgets/CustomGraph.svelte";
    import CoolCat from "$lib/widgets/CoolCat.svelte";
    import Widget from "$lib/breadcrumps/Widget.svelte";

    let { data } = $props();

</script>

{#if data.jsons}
    {#if data.jsons.expenses_data}<Bagel data={data.jsons.expenses_data} />{/if}
    {#if data.jsons.expenses_analisys_results}<Plot data={data.jsons.expenses_analisys_results}/>{/if}
    {#if data.jsons.expenses_data}<Plan data={data.jsons.expenses_data} />{/if}
    {#if data.jsons.fuel_km_per_month}<MonthStatistics data={data.jsons.fuel_km_per_month}/>{/if}
    <CustomGraph type={data.user.companyType} propData={data.jsons} />
{:else}
    <Widget style="text-white">Пока данных нет</Widget>
{/if}
<CoolCat />
