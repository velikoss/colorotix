<script lang="ts">
    import Multiline from "$lib/d3/Multiline.svelte";
    import Widget from "$lib/breadcrumps/Widget.svelte";
    import WidgetWide from "$lib/breadcrumps/WidgetWide.svelte";
    let { data: expenses_analisys_results } = $props();

   
    const { data } = expenses_analisys_results;
    const { x_axis, y_axis, outliers, forecast } = data;

   
    const historicalData = x_axis.values.map((date: string, index: number) => ({
        date,
        actual: y_axis.values[index],
    }));

   
    const outlierDates = new Set(outliers.x);
    const normalPoints = historicalData.filter((d) => !outlierDates.has(d.date));
    const outlierPoints = historicalData.filter((d) => outlierDates.has(d.date));

   
    const forecastData = forecast.x.map((date: string, index: number) => ({
        date,
        prediction: forecast.yhat[index],
        lower_bound: forecast.yhat_lower[index],
        upper_bound: forecast.yhat_upper[index],
    }));

    const data1 = [
        ...normalPoints.map((d) => ({
            date: new Date(d.date),
            value: d.actual,
            type: "main",
            segment: "historical",
        })),
        ...forecastData.map((d) => ({
            date: new Date(d.date),
            value: d.prediction,
            type: "main",
            segment: "forecast",
        })),
        ...outlierPoints.map((d) => ({
            date: new Date(d.date),
            value: d.actual,
            type: "outlier",
        })),
        ...forecastData.map((d) => ({
            date: new Date(d.date),
            value: d.lower_bound,
            type: "lower_bound",
        })),
        ...forecastData.map((d) => ({
            date: new Date(d.date),
            value: d.upper_bound,
            type: "upper_bound",
        })),
    ].sort((a, b) => a.date.getTime() - b.date.getTime());

   
    const xFormat = (d: Date) => {
        return new Date(d).toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
        });
    };

   
    const yFormat = (d: number) => {
        const absValue = Math.abs(d);
        if (absValue >= 1_000_000_000) {
            return `${(d / 1_000_000_000).toFixed(1)}B`;
        } else if (absValue >= 1_000_000) {
            return `${(d / 1_000_000).toFixed(1)}M`;
        } else if (absValue >= 1_000) {
            return `${(d / 1_000).toFixed(1)}K`;
        }
        return `${d.toFixed(1)}`;
    };

    const margins = {
        top: 10,
        right: 20,
        bottom: 10,
        left: 60,
    };

    const margins2 = {
        top: 20,
        right: 40,
        bottom: 100,
        left: 80,
    };

    const colorPalette = {
        main_historical: "#6BFCBA",
        main_forecast: "#2ca02c",
        outlier: "#1f77b4",
        lower_bound: "#d62728",
        upper_bound: "#9467bd",
    };
</script>

<div class="hidden md:block col-span-2">
    <WidgetWide style="">
        <p class="text-2xl font-semibold text-center text-white pt-5">Расходы во времени</p>
        <Multiline
            data={data1}
            x="date"
            y="value"
            color="type"
            {xFormat}
            {yFormat}
            margins={margins2}
            colorPalette={Object.values(colorPalette)}
        />
    </WidgetWide>
</div>
<div class="block md:hidden col-span-1">
    <Widget style="">
        <Multiline
            data={data1}
            x="date"
            y="value"
            color="type"
            {xFormat}
            {yFormat}
            {margins}
            colorPalette={Object.values(colorPalette)}
        />
    </Widget>
</div>

<style>
    :global(:root) {
        --colors-grid: #ffffff;
    }
</style>