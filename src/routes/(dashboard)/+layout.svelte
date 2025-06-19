<script lang="ts">
    import Card from '$lib/breadcrumps/Card.svelte';
    import TextIconH from '$lib/breadcrumps/TextIconH.svelte';
	import '../../app.css';
	
	let { children } = $props();
	let accountDropdown = $state(false);
	let accWidth = $state(0); 

	// Close dropdown when clicking outside
	function handleClickOutside(event: MouseEvent) {
		if (!(event.target as HTMLElement).closest('.dropdown-container')) {
			accountDropdown = false;
		}
	}
</script>

<svelte:window on:click={handleClickOutside} />

<div class="onest w-full max-w-screen h-screen bg-white overflow-hidden flex flex-col">
	<div class="border-b w-full h-24 flex flex-row items-center justify-between px-6 overflow-visible">
		<img src="https://www.petrolplus.ru/assets/1c2c5e66-a8ac-40ed-9a93-55865669bd85/logo-black.svg" class="w-50 h-8 object-contain object-left">
		<div class="w-fit flex flex-row gap-1.5 justify-end items-center dropdown-container" bind:clientWidth={accWidth}>
			<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXVzZXItaWNvbiBsdWNpZGUtdXNlciI+PHBhdGggZD0iTTE5IDIxdi0yYTQgNCAwIDAgMC00LTRIOWE0IDQgMCAwIDAtNCA0djIiLz48Y2lyY2xlIGN4PSIxMiIgY3k9IjciIHI9IjQiLz48L3N2Zz4=" class="w-6 h-6">
			<div class="relative overflow-visible">
				<button 
					onclick={() => accountDropdown = !accountDropdown}
					class="flex items-center gap-2 text-gray-700 hover:text-gray-900 font-medium"	
				>
					ЗАО "Бещёки"
					<svg class="w-4 h-4 transition-transform {accountDropdown ? 'rotate-180' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
					</svg>
				</button>
				{#if accountDropdown}
					<div class="absolute right-0 mt-2 w-(--width) bg-white border border-gray-200 rounded-md shadow-lg z-10" style="--width: {accWidth}px">
						<ul class="py-1">
						<li>
								<a href="/settings" class="flex gap-2 px-4 py-2 text-md text-gray-700 hover:bg-gray-100">
									<img width="22px" src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXVzZXItY29nLWljb24gbHVjaWRlLXVzZXItY29nIj48cGF0aCBkPSJNMTAgMTVINmE0IDQgMCAwIDAtNCA0djIiLz48cGF0aCBkPSJtMTQuMzA1IDE2LjUzLjkyMy0uMzgyIi8+PHBhdGggZD0ibTE1LjIyOCAxMy44NTItLjkyMy0uMzgzIi8+PHBhdGggZD0ibTE2Ljg1MiAxMi4yMjgtLjM4My0uOTIzIi8+PHBhdGggZD0ibTE2Ljg1MiAxNy43NzItLjM4My45MjQiLz48cGF0aCBkPSJtMTkuMTQ4IDEyLjIyOC4zODMtLjkyMyIvPjxwYXRoIGQ9Im0xOS41MyAxOC42OTYtLjM4Mi0uOTI0Ii8+PHBhdGggZD0ibTIwLjc3MiAxMy44NTIuOTI0LS4zODMiLz48cGF0aCBkPSJtMjAuNzcyIDE2LjE0OC45MjQuMzgzIi8+PGNpcmNsZSBjeD0iMTgiIGN5PSIxNSIgcj0iMyIvPjxjaXJjbGUgY3g9IjkiIGN5PSI3IiByPSI0Ii8+PC9zdmc+' alt="">
									Настройки
								</a>
							</li>
							<li>
								<a href="/logout" class="flex gap-2 px-4 py-2 text-md text-gray-700 hover:bg-gray-100">
									<img width="22px" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXVzZXIteC1pY29uIGx1Y2lkZS11c2VyLXgiPjxwYXRoIGQ9Ik0xNiAyMXYtMmE0IDQgMCAwIDAtNC00SDZhNCA0IDAgMCAwLTQgNHYyIi8+PGNpcmNsZSBjeD0iOSIgY3k9IjciIHI9IjQiLz48bGluZSB4MT0iMTciIHgyPSIyMiIgeTE9IjgiIHkyPSIxMyIvPjxsaW5lIHgxPSIyMiIgeDI9IjE3IiB5MT0iOCIgeTI9IjEzIi8+PC9zdmc+" alt="">
									Выйти
								</a>
							</li>
						</ul>
					</div>
				{/if}
			</div>
		</div>
	</div>
	<div class="w-full h-[calc(100svh-6rem)] flex flex-row">
		<div class="w-24 h-full border-r flex flex-col p-4 items-center gap-4">
			<TextIconH 
				style="border-black w-14 h-14"
				width="100%"
				icon="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNoYXJ0LW5vLWF4ZXMtZ2FudHQtaWNvbiBsdWNpZGUtY2hhcnQtbm8tYXhlcy1nYW50dCI+PHBhdGggZD0iTTggNmgxMCIvPjxwYXRoIGQ9Ik02IDEyaDkiLz48cGF0aCBkPSJNMTEgMThoNyIvPjwvc3ZnPg=="
				text="Главная"
			/>
			<TextIconH 
				style="border-black w-14 h-14"
				width="80%"
				icon="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNoYXJ0LW5vLWF4ZXMtY29tYmluZWQtaWNvbiBsdWNpZGUtY2hhcnQtbm8tYXhlcy1jb21iaW5lZCI+PHBhdGggZD0iTTEyIDE2djUiLz48cGF0aCBkPSJNMTYgMTR2NyIvPjxwYXRoIGQ9Ik0yMCAxMHYxMSIvPjxwYXRoIGQ9Im0yMiAzLTguNjQ2IDguNjQ2YS41LjUgMCAwIDEtLjcwOCAwTDkuMzU0IDguMzU0YS41LjUgMCAwIDAtLjcwNyAwTDIgMTUiLz48cGF0aCBkPSJNNCAxOHYzIi8+PHBhdGggZD0iTTggMTR2NyIvPjwvc3ZnPg=="
				text="Графики"
			/>
			<TextIconH 
				style="border-black w-14 h-14"
				width="80%"
				icon="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNvZy1pY29uIGx1Y2lkZS1jb2ciPjxwYXRoIGQ9Ik0xMiAyMGE4IDggMCAxIDAgMC0xNiA4IDggMCAwIDAgMCAxNloiLz48cGF0aCBkPSJNMTIgMTRhMiAyIDAgMSAwIDAtNCAyIDIgMCAwIDAgMCA0WiIvPjxwYXRoIGQ9Ik0xMiAydjIiLz48cGF0aCBkPSJNMTIgMjJ2LTIiLz48cGF0aCBkPSJtMTcgMjAuNjYtMS0xLjczIi8+PHBhdGggZD0iTTExIDEwLjI3IDcgMy4zNCIvPjxwYXRoIGQ9Im0yMC42NiAxNy0xLjczLTEiLz48cGF0aCBkPSJtMy4zNCA3IDEuNzMgMSIvPjxwYXRoIGQ9Ik0xNCAxMmg4Ii8+PHBhdGggZD0iTTIgMTJoMiIvPjxwYXRoIGQ9Im0yMC42NiA3LTEuNzMgMSIvPjxwYXRoIGQ9Im0zLjM0IDE3IDEuNzMtMSIvPjxwYXRoIGQ9Im0xNyAzLjM0LTEgMS43MyIvPjxwYXRoIGQ9Im0xMSAxMy43My00IDYuOTMiLz48L3N2Zz4="
				text="Расходы на обслуживание"
			/>
			<TextIconH 
				style="border-black w-14 h-14"
				width="80%"
				icon="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXJ1c3NpYW4tcnVibGUtaWNvbiBsdWNpZGUtcnVzc2lhbi1ydWJsZSI+PHBhdGggZD0iTTYgMTFoOGE0IDQgMCAwIDAgMC04SDl2MTgiLz48cGF0aCBkPSJNNiAxNWg4Ii8+PC9zdmc+"
				text="Штрафы и ЗП"
			/>
			<TextIconH 
				style="border-black w-14 h-14"
				width="80%"
				icon="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXVwbG9hZC1pY29uIGx1Y2lkZS11cGxvYWQiPjxwYXRoIGQ9Ik0xMiAzdjEyIi8+PHBhdGggZD0ibTE3IDgtNS01LTUgNSIvPjxwYXRoIGQ9Ik0yMSAxNXY0YTIgMiAwIDAgMS0yIDJINWEyIDIgMCAwIDEtMi0ydi00Ii8+PC9zdmc+"
				text="Загрузка данных"
			/>
		</div>
		<div class="w-full h-full overflow-auto py-3.5 px-5 grid sm:grid-cols-1 md:grid-rows-2 md:grid-flow-col md:auto-cols-fr gap-4">
			{@render children()}
		</div>
	</div>
</div>