<script>
    import Bagel from "$lib/widgets/Bagel.svelte";
    import Plot from "$lib/widgets/Plot.svelte";
    import MonthStatistics from "$lib/widgets/MonthStatistics.svelte";
    import Plan from "$lib/widgets/Plan.svelte";
    import CustomGraph from "$lib/widgets/CustomGraph.svelte";
    import CoolCat from "$lib/widgets/CoolCat.svelte";

    let { data } = $props();

</script>

<Bagel />
<Plot />
<Plan />
<MonthStatistics />
<CustomGraph type={data.user.companyType} />
<CoolCat />