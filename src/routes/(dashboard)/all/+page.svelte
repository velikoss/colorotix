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

<Bagel />
<Plot />
<Plan />
<MonthStatistics />
<CustomGraph type={data.user.companyType} />
<CoolCat />
<VehicleEffectiveness />
<DowntimeCounter />
<RepairExpenses />
<RepairDynamics />
<AmortisationDynamics />
<YearPeopleFees />
<SeasonalFinesStatistics />
<MonthyFinesDynamics />
<DriverFinesStatistics />
<SalaryStatistics />
<SalaryEffectiveness />
<MaxSeasonFine />
<CoolCat2 />
<FuelInMonth />
<DistanceInMonth />