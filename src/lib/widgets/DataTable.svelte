<script>
    let { data, columns, badfix = false } = $props();

    function parseValue(value){
        console.log(value)
        let a = value.toString().split(".");
        a[1] = (a[1]).toString();
        return a.join(".");
    }
</script>

<div class="h-80">
    <table class="table-fixed w-full border-collapse">
    <tbody>
        <tr class="leading-0">
            {#each columns as column}
                <td class="{column.class} font-semibold">{column.label}</td>
            {/each}
        </tr>
    </tbody>
</table>
<div class="w-full overflow-scroll relative rounded-b-2xl no-scrollbar cursor-n-resize h-60">
    <table class="table-fixed w-full border-collapse">
        <tbody>
            {#each Object.entries(data|| {}) as [key, value]}
                <tr class="leading-0">
                    {#each columns as column}
                        <td class="{column.class}">
                            {#if column.key === 'key'}
                                {key}
                            {:else if column.key === "value"}
                                {typeof value === 'number' ? +(value.toFixed(2)) : value}
                            {:else}
                                {typeof value[column.key] === 'number' ? +(value[column.key].toFixed(column.decimals || 0)) : value[column.key]}
                            {/if}
                        </td>
                    {/each}
                </tr>
            {/each}
        </tbody>
    </table>
</div>
</div>