<script>
    import WidgetWide from "$lib/breadcrumps/WidgetWide.svelte";
    import AmortisationDynamics from "$lib/widgets/AmortisationDynamics.svelte";
    import DowntimeCounter from "$lib/widgets/DowntimeCounter.svelte";
    import RepairDynamics from "$lib/widgets/RepairDynamics.svelte";
    import RepairExpenses from "$lib/widgets/RepairExpenses.svelte";
    import VehicleEffectiveness from "$lib/widgets/VehicleEffectiveness.svelte";
    let { data } = $props();
</script>

{#if data.jsons.vehicle_efficiency_per_year}<VehicleEffectiveness data={data.jsons.vehicle_efficiency_per_year} />{/if}
{#if data.jsons.downtime_find}<DowntimeCounter data={data.jsons.downtime_find} />{/if}
{#if data.jsons.repair_expenses_by_month_year}<RepairExpenses data={data.jsons.repair_expenses_by_month_year} />{/if}
{#if data.jsons.repair_expenses_by_month_year}<RepairDynamics data={data.jsons.repair_expenses_by_month_year} />{/if}
{#if data.jsons.amortization_by_month_year}<AmortisationDynamics data={data.jsons.amortization_by_month_year} />{/if}