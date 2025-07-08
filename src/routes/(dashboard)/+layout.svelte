<script lang="ts">
	import Card from "$lib/breadcrumps/Card.svelte";
	import TextIconH from "$lib/breadcrumps/TextIconH.svelte";
	import { goto } from "$app/navigation";
	import "../../app.css";

	let { children, data } = $props();
	const recommendations = data.recomendations?.result;
	let accountDropdown = $state(false);
	let notificationsDropdown = $state(false);
	let accWidth = $state(0);
	let contentWidth = $state(0);

	const notificationCount = Object.keys(recommendations).length;

	async function handleLogout() {
		try {
			const response = await fetch("/api/logout", {
				method: "POST",
				credentials: "include",
			});
			if (response.ok) {
				goto("/login");
			}
		} catch (error) {
			console.error("Logout failed:", error);
		}
	}

	function handleClickOutside(event: MouseEvent) {
		if (!(event.target as HTMLElement).closest(".dropdown-container")) {
			accountDropdown = false;
			notificationsDropdown = false;
		}
	}
</script>

<svelte:window on:click={handleClickOutside} />

<div
	class="onest w-full max-w-screen h-screen bg-white overflow-hidden flex flex-col"
>
	<div
		class="border-b w-full h-24 flex flex-row items-center justify-between px-6 overflow-visible"
	>
		<img
			alt=""
			src="https://www.petrolplus.ru/assets/1c2c5e66-a8ac-40ed-9a93-55865669bd85/logo-black.svg"
			class="w-50 h-8 object-contain object-left"
		/>
		<div class="flex-1 pr-8">
			<input
				placeholder="Поиск по графикам"
				class="w-full px-4 py-2 rounded-lg outline-none transition-all duration-200 bg-gray-500/10 not-focus:border-black/30 focus:border-gray-500/80 focus:ring-black/30 placeholder:text-gray-600 placeholder:opacity-100 backdrop-blur-sm shadow shadow-black/5"
			/>
		</div>
		<div class="mr-4 relative dropdown-container">
			<button
				class="flex justify-center items-center relative"
				onclick={() => (notificationsDropdown = !notificationsDropdown)}
			>
				<img
					class="w-6 h-6"
					src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWJlbGwtaWNvbiBsdWNpZGUtYmVsbCI+PHBhdGggZD0iTTEwLjI2OCAyMWEyIDIgMCAwIDAgMy40NjQgMCIvPjxwYXRoIGQ9Ik0zLjI2MiAxNS4zMjZBMSAxIDAgMCAwIDQgMTdoMTZhMSAxIDAgMCAwIC43NC0xLjY3M0MxOS40MSAxMy45NTYgMTggMTIuNDk5IDE4IDhBNiA2IDAgMCAwIDYgOGMwIDQuNDk5LTEuNDExIDUuOTU2LTIuNzM4IDcuMzI2Ii8+PC9zdmc+"
					alt="bell"
				/>
				{#if notificationCount > 0}
					<span
						class="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
					>
						{notificationCount}
					</span>
				{/if}
			</button>
			{#if notificationsDropdown}
				<div
					class="absolute right-0 mt-2 w-96 bg-white border border-gray-200 rounded-md shadow-lg z-10 max-h-[400px] overflow-y-auto"
				>
					<div class="py-2 px-4 bg-gray-50 border-b">
						<h3 class="text-md font-semibold text-gray-800">
							Рекомендации
						</h3>
					</div>
					<ul class="py-1">
						{#each Object.entries(recommendations) as [key, message]}
							<li
								class="px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 border-b last:border-b-0"
							>
								<div class="flex items-start gap-2">
									<img
										class="w-5 h-5 mt-0.5"
										src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWluZm8taWNvbiBsdWNpZGUtaW5mbyI+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTAiLz48cGF0aCBkPSJNMTIgMTZ2LTQiLz48cGF0aCBkPSJNMTIgOGguMDEiLz48L3N2Zz4="
										alt="info"
									/>
									<span>{message}</span>
								</div>
							</li>
						{/each}
					</ul>
				</div>
			{/if}
		</div>
		<div
			class="w-fit flex flex-row gap-1.5 justify-end items-center dropdown-container"
			bind:clientWidth={accWidth}
		>
			<img
				src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXVzZXItaWNvbiBsdWNpZGUtdXNlciI+PHBhdGggZD0iTTE5IDIxdi0yYTQgNCAwIDAgMC00LTRIOWE0IDQgMCAwIDAtNCA0djIiLz48Y2lyY2xlIGN4PSIxMiIgY3k9IjciIHI9IjQiLz48L3N2Zz4="
				class="w-6 h-6"
			/>
			<div class="relative overflow-visible">
				<button
					onclick={() => (accountDropdown = !accountDropdown)}
					class="flex items-center gap-2 text-gray-700 hover:text-gray-900 font-medium"
				>
					{data.user.companyName}
					<svg
						class="w-4 h-4 transition-transform {accountDropdown
							? 'rotate-180'
							: ''}"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M19 9l-7 7-7-7"
						/>
					</svg>
				</button>
				{#if accountDropdown}
					<div
						class="absolute right-0 mt-2 w-(--width) bg-white border border-gray-200 rounded-md shadow-lg z-10"
						style="--width: {accWidth}px"
					>
						<ul class="py-1">
							<li>
								<a
									href="/settings"
									class="flex gap-2 px-4 py-2 text-md text-gray-700 hover:bg-gray-100"
								>
									<img
										width="22px"
										src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXVzZXItY29nLWljb24gbHVjaWRlLXVzZXItY29nIj48cGF0aCBkPSJNMTAgMTVINmE0IDQgMCAwIDAtNCA0djIiLz48cGF0aCBkPSJtMTQuMzA1IDE2LjUzLjkyMy0uMzgyIi8+PHBhdGggZD0ibTE1LjIyOCAxMy44NTItLjkyMy0uMzgzIi8+PHBhdGggZD0ibTE2Ljg1MiAxMi4yMjgtLjM4My0uOTIzIi8+PHBhdGggZD0ibTE2Ljg1MiAxNy43NzItLjM4My45MjQiLz48cGF0aCBkPSJtMTkuMTQ4IDEyLjIyOC4zODMtLjkyMyIvPjxwYXRoIGQ9Im0xOS41MyAxOC42OTYtLjM4Mi0uOTI0Ii8+PHBhdGggZD0ibTIwLjc3MiAxMy44NTIuOTI0LS4zODMiLz48cGF0aCBkPSJtMjAuNzcyIDE2LjE0OC45MjQuMzgzIi8+PGNpcmNsZSBjeD0iMTgiIGN5PSIxNSIgcj0iMyIvPjxjaXJjbGUgY3g9IjkiIGN5PSI3IiByPSI0Ii8+PC9zdmc+"
										alt=""
									/>
									Настройки
								</a>
							</li>
							<li>
								<button
									onclick={handleLogout}
									class="flex gap-2 px-4 py-2 text-md text-gray-700 hover:bg-gray-100 w-full text-left"
								>
									<img
										width="22px"
										src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXVzZXIteC1pY29uIGx1Y2lkZS11c2VyLXgiPjxwYXRoIGQ9Ik0xNiAyMXYtMmE0IDQgMCAwIDAtNC00SDZhNCA0IDAgMCAwLTQgNHYyIi8+PGNpcmNsZSBjeD0iOSIgY3k9IjciIHI9IjQiLz48bGluZSB4MT0iMTciIHgyPSIyMiIgeTE9IjgiIHkyPSIxMyIvPjxsaW5lIHgxPSIyMiIgeDI9IjE3IiB5MT0iOCIgeTI9IjEzIi8+PC9zdmc+"
										alt=""
									/>
									Выйти
								</button>
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
				href="/"
			/>
			<TextIconH
				style="border-black w-14 h-14"
				width="80%"
				icon="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNoYXJ0LW5vLWF4ZXMtY29tYmluZWQtaWNvbiBsdWNpZGUtY2hhcnQtbm8tYXhlcy1jb21iaW5lZCI+PHBhdGggZD0iTTEyIDE2djUiLz48cGF0aCBkPSJNMTYgMTR2NyIvPjxwYXRoIGQ9Ik0yMCAxMHYxMSIvPjxwYXRoIGQ9Im0yMiAzLTguNjQ2IDguNjQ2YS41LjUgMCAwIDEtLjcwOCAwTDkuMzU0IDguMzU0YS41LjUgMCAwIDAtLjcwNyAwTDIgMTUiLz48cGF0aCBkPSJNNCAxOHYzIi8+PHBhdGggZD0iTTggMTR2NyIvPjwvc3ZnPg=="
				text="Графики"
				href="/all"
			/>
			<TextIconH
				style="border-black w-14 h-14"
				width="80%"
				icon="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNvZy1pY29uIGx1Y2lkZS1jb2ciPjxwYXRoIGQ9Ik0xMiAyMGE4IDggMCAxIDAgMC0xNiA4IDggMCAwIDAgMCAxNloiLz48cGF0aCBkPSJNMTIgMTRhMiAyIDAgMSAwIDAtNCAyIDIgMCAwIDAgMCA0WiIvPjxwYXRoIGQ9Ik0xMiAydjIiLz48cGF0aCBkPSJNMTIgMjJ2LTIiLz48cGF0aCBkPSJtMTcgMjAuNjYtMS0xLjczIi8+PHBhdGggZD0iTTExIDEwLjI3IDcgMy4zNCIvPjxwYXRoIGQ9Im0yMC42NiAxNy0xLjczLTEiLz48cGF0aCBkPSJtMy4zNCA3IDEuNzMgMSIvPjxwYXRoIGQ9Ik0xNCAxMmg4Ii8+PHBhdGggZD0iTTIgMTJoMiIvPjxwYXRoIGQ9Im0yMC42NiA3LTEuNzMgMSIvPjxwYXRoIGQ9Im0zLjM0IDE3IDEuNzMtMSIvPjxwYXRoIGQ9Im0xNyAzLjM0LTEgMS43MyIvPjxwYXRoIGQ9Im0xMSAxMy43My00IDYuOTMiLz48L3N2Zz4="
				text="Расходы на обслуживание"
				href="/expenses"
			/>
			{#if data.user.companyType !== "Каршеринг"}
			<TextIconH
				style="border-black w-14 h-14"
				width="80%"
				icon="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXJ1c3NpYW4tcnVibGUtaWNvbiBsdWNpZGUtcnVzc2lhbi1ydWJsZSI+PHBhdGggZD0iTTYgMTFoOGE0IDQgMCAwIDAgMC04SDl2MTgiLz48cGF0aCBkPSJNNiAxNWg4Ii8+PC9zdmc+"
				text="Штрафы и ЗП"
				href="/salary"
			/>
			{/if}
			<TextIconH
				style="border-black w-14 h-14"
				width="80%"
				icon="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXVwbG9hZC1pY29uIGx1Y2lkZS11cGxvYWQiPjxwYXRoIGQ9Ik0xMiAzdjEyIi8+PHBhdGggZD0ibTE3IDgtNS01LTUgNSIvPjxwYXRoIGQ9Ik0yMSAxNXY0YTIgMiAwIDAgMS0yIDJINWEyIDIgMCAwIDEtMi0ydi00Ii8+PC9zdmc+"
				text="Загрузка данных"
				href="/upload"
			/>
		</div>
		<div class="w-full h-full overflow-auto flex justify-center">
			<div
				class="min-w-0 w-full max-w-[1616px] py-4 px-8 grid grid-cols-[repeat(auto-fit,minmax(376px,1fr))] auto-rows-auto gap-4"
			>
				{@render children()}
			</div>
		</div>
	</div>
</div>
