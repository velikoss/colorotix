<script>
    import Input from "$lib/breadcrumps/Input.svelte";
    import Widget from "$lib/breadcrumps/Widget.svelte";

    let value = $state("");

</script>
<div class="w-full h-[calc(100svh-8rem)] flex flex-col justify-center items-center gap-3">
    <Widget style="text-white flex-col justify-center items-center"> 
        <img width="128px" alt="" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS11cGxvYWQtaWNvbiBsdWNpZGUtdXBsb2FkIj48cGF0aCBkPSJNMTIgM3YxMiIvPjxwYXRoIGQ9Im0xNyA4LTUtNS01IDUiLz48cGF0aCBkPSJNMjEgMTV2NGEyIDIgMCAwIDEtMiAySDVhMiAyIDAgMCAxLTItMnYtNCIvPjwvc3ZnPg==">
        <p class="text-xl">Загрузите данные</p>
        <p class="text-sm">Поддерживаемые форматы: .json, .xml, .csv</p>
    </Widget>
    <p>Или</p>
    <div>
        <p class="text-sm leading-tight mb-1">Привяжите свою базу данных Postgres<br><span class="text-xs text-gray-700">postgresql://[user[:password]@][netloc][:port][/dbname]</span></p>
        <input
            class="w-92 px-4 py-2 rounded-lg outline-none transition-all duration-200 bg-white/10 not-focus:border-black/30 focus:border-black/80 focus:ring-black/30 placeholder:text-gray-200 placeholder:opacity-100 backdrop-blur-sm shadow shadow-white/5"
            bind:value={value}
        />
    </div>
</div>