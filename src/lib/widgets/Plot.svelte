<script lang="ts">
  import Multiline from '$lib/d3/Multiline.svelte';
  import Widget from '$lib/d3/Widget.svelte';
    import WidgetWide from '$lib/d3/WidgetWide.svelte';
  import { expenses_analisys_results } from '$lib/expenses_analysis_results';

  const { historical_data, forecast_data } = expenses_analisys_results;

  const data = [
    ...historical_data.normal_points.map(d => ({
      date: new Date(d.date),
      value: d.actual,
      type: 'main',
      segment: 'historical'
    })),
    ...forecast_data.map(d => ({
      date: new Date(d.date),
      value: d.prediction,
      type: 'main',
      segment: 'forecast'
    })),
    ...historical_data.outliers.map(d => ({
      date: new Date(d.date),
      value: d.actual,
      type: 'outlier'
    })),
    ...forecast_data.map(d => ({
      date: new Date(d.date),
      value: d.lower_bound,
      type: 'lower_bound'
    })),
    ...forecast_data.map(d => ({
      date: new Date(d.date),
      value: d.upper_bound,
      type: 'upper_bound'
    }))
  ].sort((a, b) => a.date.getTime() - b.date.getTime());

  // Improved xFormat for readable dates
  const xFormat = (d: Date) => {
    return new Date(d).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }); // e.g., "Jan 2019"
  };

  const yFormat = (d: number) => {
    return `${(d / 1000000).toFixed(1)}M`;
  };

  // Adjusted margins for better spacing
  const margins = {
    top: 40,    // Increased for y-axis label
    right: 40,  // Unchanged
    bottom: 40, // Reduced, adjusted for x-axis labels
    left: 80  // Unchanged
  };

  const colorPalette = {
    main_historical: '#1f77b4',
    main_forecast: '#2ca02c',
    outlier: '#ff1b1b',
    lower_bound: '#d62728',
    upper_bound: '#9467bd'
  };
</script>

<WidgetWide>
<Multiline
    {data}
    x="date"
    y="value"
    color="type"
    {xFormat}
    {yFormat}
    {margins}
    colorPalette={Object.values(colorPalette)}
  />
</WidgetWide>
<style>
  :global(:root) {
    --colors-grid: #FFFFFF;
  }
</style>