<script lang="ts">
    import Card from '$lib/breadcrumps/Card.svelte';
    import TextIconH from '$lib/breadcrumps/TextIconH.svelte';
	import '../../app.css';
	
	let { children } = $props();
</script>

<div class="onest w-full max-w-screen h-screen bg-white overflow-hidden flex flex-col">
	<div class="border-b w-full h-24 flex flex-row items-center justify-between px-6 overflow-hidden">
		<img src="https://www.petrolplus.ru/assets/1c2c5e66-a8ac-40ed-9a93-55865669bd85/logo-black.svg" class="w-50 h-8 object-contain object-left">
		<div class="w-full flex flex-row gap-1.5 justify-end">
			<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXVzZXItaWNvbiBsdWNpZGUtdXNlciI+PHBhdGggZD0iTTE5IDIxdi0yYTQgNCAwIDAgMC00LTRIOWE0IDQgMCAwIDAtNCA0djIiLz48Y2lyY2xlIGN4PSIxMiIgY3k9IjciIHI9IjQiLz48L3N2Zz4=">
			<p>ЗАО "Бещёки"</p>
		</div>
	</div>
	<div class="w-full h-full">
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
		<div>
			{@render children()}
		</div>
	</div>
</div>