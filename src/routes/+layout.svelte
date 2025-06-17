<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>


<div class="will-change-transform">
	{@render children()}
</div>
