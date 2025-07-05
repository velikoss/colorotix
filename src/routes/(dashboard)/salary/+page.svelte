<script>
    import Widget from "$lib/breadcrumps/Widget.svelte";
    import WidgetBig from "$lib/breadcrumps/WidgetBig.svelte";
    import DriverFinesStatistics from "$lib/widgets/DriverFinesStatistics.svelte";
    import MonthyFinesDynamics from "$lib/widgets/MonthyFinesDynamics.svelte";
    import SalaryEffectiveness from "$lib/widgets/SalaryEffectiveness.svelte";
    import SalaryStatistics from "$lib/widgets/SalaryStatistics.svelte";

    let { data } = $props();
</script>

{#if data.jsons.seasonal_fines}<MonthyFinesDynamics data={data.jsons.seasonal_fines}/>{/if}
{#if data.jsons.top_drivers_fines_by_month}<DriverFinesStatistics data={data.jsons.top_drivers_fines_by_month}/>{/if}
{#if data.jsons.salary_data}<SalaryStatistics data={data.jsons.salary_data}/>{/if}
{#if data.jsons.top_drivers_salary_efficiency}}<SalaryEffectiveness data={data.jsons.top_drivers_salary_efficiency} />{/if}