<script lang="ts">
    let {
        x,
        y,
        radius = 10,
        fill = "black",
        stroke = "transparent",
        style = "",
    } = $props();
</script>

<circle class="Circle" cx={x} cy={y} r={radius} {fill} {style} {stroke} />

<style>
    circle {
        transition: all 0.3s ease-out;
    }
</style>
