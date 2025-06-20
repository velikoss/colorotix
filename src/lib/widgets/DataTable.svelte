<script>
    let {data, columns} = $props();
</script>

<table class="table-fixed w-full border-collapse">
    <tbody>
        <tr class="leading-0">
            {#each columns as column}
                <td class="{column.class} font-semibold">{column.label}</td>
            {/each}
        </tr>
    </tbody>
</table>
<div class="inset-x-0 w-full overflow-scroll relative rounded-b-2xl no-scrollbar cursor-n-resize">
    <table class="table-fixed w-full border-collapse">
        <tbody>
            {#each Object.entries(data|| {}) as [key, value]}
                <tr class="leading-0">
                    {#each columns as column}
                        <td class="{column.class}">
                            {#if column.key === 'key'}
                                {key}
                            {:else}
                                {typeof value === 'number' ? value.toFixed(column.decimals || 0) : value[column.key]}
                            {/if}
                        </td>
                    {/each}
                </tr>
            {/each}
        </tbody>
    </table>
</div>