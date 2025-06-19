<script lang="ts">
	import Input from "$lib/breadcrumps/Input.svelte";
	import Widget from "$lib/breadcrumps/Widget.svelte";

	/* строка подключения к PG */
	let value = $state("");

	/* user приходит из load() → { data } */
	let { data } = $props();
	const companyId = data.user?.companyId ?? "";

	/* загрузка файла */
	let fileInput: HTMLInputElement;
	let busy = false;
	let uploadedName = "";

	function openFileDialog() {
		fileInput?.click();
	}

	async function handleFileChange(event: Event) {
		const file = (event.target as HTMLInputElement).files?.[0];
		if (!file || busy) return;

		busy = true;

		/* --------- сюда добавили companyId --------- */
		const form = new FormData();
		form.append("file", file);
		form.append("companyId", companyId);      // 👈 главное изменение

		const res = await fetch("/api/upload", { method: "POST", body: form });
		busy = false;

		if (res.ok) {
			const { file: savedName } = await res.json(); // { ok, file }
			uploadedName = savedName;                     // показываем имя от сервера
		} else {
			alert(await res.text());
		}
	}
</script>

<div class="w-full h-[calc(100svh-8rem)] flex flex-col justify-center items-center gap-3">
	<Widget style="text-white flex-col justify-center items-center">
		{#if uploadedName}
			<p class="text-xl break-all">{uploadedName}</p>
			<p class="text-sm opacity-70">Файл успешно загружен</p>
		{:else}
			<img width="128" alt="upload icon"
			     src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS11cGxvYWQtaWNvbiBsdWNpZGUtdXBsb2FkIj48cGF0aCBkPSJNMTIgM3YxMiIvPjxwYXRoIGQ9Im0xNyA4LTUtNS01IDUiLz48cGF0aCBkPSJNMjEgMTV2NGEyIDIgMCAwIDEtMiAySDVhMiAyIDAgMCAxLTItMnYtNCIvPjwvc3ZnPg==" />
			<p class="text-xl">Загрузите данные</p>
			<p class="text-sm">Поддерживаемые форматы: .json, .xlsx, .csv</p>
			<button
				on:click={openFileDialog}
				disabled={busy}
				class="mt-2 px-4 py-2 bg-white/10 rounded-lg border border-white/30 hover:border-white/60 transition-all disabled:opacity-40"
			>
				{busy ? "Загружаю…" : "Выбрать файл"}
			</button>
		{/if}

		<!-- скрытый input -->
		<input
			type="file"
			accept=".json,.xlsx,.csv"
			class="hidden"
			bind:this={fileInput}
			on:change={handleFileChange}
		/>
	</Widget>

	<p>Или</p>

	<!-- строка подключения к Postgres -->
	<div>
		<p class="text-sm leading-tight mb-1">
			Привяжите свою базу данных Postgres<br />
			<span class="text-xs text-gray-700">
				postgresql://[user[:password]@][netloc][:port][/dbname]
			</span>
		</p>
		<input
			class="w-92 px-4 py-2 rounded-lg outline-none transition-all duration-200 bg-white/10 not-focus:border-black/30 focus:border-black/80 focus:ring-black/30 placeholder:text-gray-200 placeholder:opacity-100 backdrop-blur-sm shadow shadow-white/5"
			bind:value={value}
		/>
	</div>

	<!-- отладка -->
	<p class="text-xs opacity-60">{JSON.stringify(data.user)}</p>
</div>
