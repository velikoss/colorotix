<script lang="ts">
    let { width, src, fallback } = $props();
</script>


<object {width} data={fallback} type="image/png"> 
    <img {width} {src} alt="">
</object>