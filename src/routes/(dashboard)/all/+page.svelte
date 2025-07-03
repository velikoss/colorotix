<script>
    import WidgetWide from "$lib/breadcrumps/WidgetWide.svelte";
    import AmortisationDynamics from "$lib/widgets/AmortisationDynamics.svelte";
    import Bagel from "$lib/widgets/Bagel.svelte";
    import CoolCat from "$lib/widgets/CoolCat.svelte";
    import CoolCat2 from "$lib/widgets/CoolCat2.svelte";
    import CustomGraph from "$lib/widgets/CustomGraph.svelte";
    import DistanceInMonth from "$lib/widgets/DistanceInMonth.svelte";
    import DowntimeCounter from "$lib/widgets/DowntimeCounter.svelte";
    import DriverFinesStatistics from "$lib/widgets/DriverFinesStatistics.svelte";
    import FuelInMonth from "$lib/widgets/FuelInMonth.svelte";
    import MaxSeasonFine from "$lib/widgets/MaxSeasonFine.svelte";
    import MonthStatistics from "$lib/widgets/MonthStatistics.svelte";
    import MonthyFinesDynamics from "$lib/widgets/MonthyFinesDynamics.svelte";
    import Plan from "$lib/widgets/Plan.svelte";
    import Plot from "$lib/widgets/Plot.svelte";
    import RepairDynamics from "$lib/widgets/RepairDynamics.svelte";
    import RepairExpenses from "$lib/widgets/RepairExpenses.svelte";
    import SalaryEffectiveness from "$lib/widgets/SalaryEffectiveness.svelte";
    import SalaryStatistics from "$lib/widgets/SalaryStatistics.svelte";
    import SeasonalFinesStatistics from "$lib/widgets/SeasonalFinesStatistics.svelte";
    import VehicleEffectiveness from "$lib/widgets/VehicleEffectiveness.svelte";
    import YearPeopleFees from "$lib/widgets/YearPeopleFees.svelte";

    let { data } = $props();
</script>

{#if data.jsons.expenses_data}<Bagel data={data.jsons.expenses_data} />{/if}
{#if data.jsons.expenses_analisys_results}<Plot data={data.jsons.expenses_analisys_results}/>{/if}
{#if data.jsons.expenses_data}<Plan data={data.jsons.expenses_data} />{/if}
{#if data.jsons.fuel_km_per_month}<MonthStatistics data={data.jsons.fuel_km_per_month}/>{/if}
<CustomGraph type={data.user.companyType} propData={data.jsons} />
<CoolCat />
{#if data.jsons.vehicle_efficiency_per_year}<VehicleEffectiveness data={data.jsons.vehicle_efficiency_per_year} />{/if}
{#if data.jsons.downtime_find}<DowntimeCounter data={data.jsons.downtime_find} />{/if}
{#if data.jsons.repair_expenses_by_month_year}<RepairExpenses data={data.jsons.repair_expenses_by_month_year} />{/if}
{#if data.jsons.repair_expenses_by_month_year}<RepairDynamics data={data.jsons.repair_expenses_by_month_year} />{/if}
{#if data.jsons.amortization_by_month_year}<AmortisationDynamics data={data.jsons.amortization_by_month_year} />{/if}
{#if data.jsons.year_drivers_fine}<YearPeopleFees data={data.jsons.year_drivers_fine}/>{/if}
{#if data.jsons.seasonal_fines}<SeasonalFinesStatistics data={data.jsons.year_drivers_fine} />{/if}
{#if data.jsons.seasonal_fines}<MonthyFinesDynamics data={data.jsons.seasonal_fines}/>{/if}
{#if data.jsons.top_drivers_fines_by_month}<DriverFinesStatistics data={data.jsons.top_drivers_fines_by_month}/>{/if}
{#if data.jsons.salary_data}<SalaryStatistics data={data.jsons.salary_data}/>{/if}
{#if data.jsons.top_drivers_salary_efficiency}}<SalaryEffectiveness data={data.jsons.top_drivers_salary_efficiency} />{/if}
{#if data.jsons.seasonal_fines}<MaxSeasonFine data={data.jsons.seasonal_fines}/>{/if}
<CoolCat2 />
{#if data.jsons.fuel_km_per_month}<FuelInMonth data={data.jsons.fuel_km_per_month} />{/if}
{#if data.jsons.fuel_km_per_month}<DistanceInMonth data={data.jsons.fuel_km_per_month}/>{/if}