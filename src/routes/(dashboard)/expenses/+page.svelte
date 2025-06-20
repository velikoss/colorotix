<script>
    import WidgetWide from "$lib/breadcrumps/WidgetWide.svelte";
    import AmortisationDynamics from "$lib/widgets/AmortisationDynamics.svelte";
    import AromatisationDynamics from "$lib/widgets/AmortisationDynamics.svelte";
    import DowntimeCounter from "$lib/widgets/DowntimeCounter.svelte";
    import RepairDynamics from "$lib/widgets/RepairDynamics.svelte";
    import RepairExpenses from "$lib/widgets/RepairExpenses.svelte";
    import VehicleEffectiveness from "$lib/widgets/VehicleEffectiveness.svelte";

</script>

<VehicleEffectiveness />
<DowntimeCounter />
<RepairExpenses />
<RepairDynamics />
<AmortisationDynamics />