<script lang="ts">
    import { goto } from "$app/navigation";
    import Card from "$lib/breadcrumps/Card.svelte";

    // todo states
    let name = $state("");
    let password = $state("");
    let companyname = $state("");
    let innnumber = $state("");
    let error = $state("");
    let loading = false;

    const input = "w-full border rounded-lg px-4 py-2 outline-none transition-all duration-200 bg-white/10 not-focus:border-gray-900/30 focus:border-gray-900/80 focus:ring-gray-900/30 placeholder:text-gray-900 placeholder:opacity-100 backdrop-blur-sm shadow shadow-white/5";

    async function handleRegister(e: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement; }) {
        e.preventDefault();
    }
</script>

<div
    class="min-h-screen bg-gradient-to-br from-[#6BFCBA] to-[#1D92C5] flex items-center justify-center p-4"
>
    <Card
        style="w-lg h-fit shadow-white/5 text-gray-900 flex-col inter bg-white"
    >
        <img
            src="https://www.petrolplus.ru/assets/1c2c5e66-a8ac-40ed-9a93-55865669bd85/logo-black.svg"
        />
        <div class="h-[1px] w-full bg-gray-300 my-6"></div>
        <form onsubmit={handleRegister} class="space-y-4">
            <div>
                <label for="name" class="block text-gray-900 font-medium"
                    >Email</label
                >
                <input
                    id="name"
                    type="email"
                    bind:value={name}
                    class={input}
                    required
                />
            </div>

            <div>
                <label for="password" class="block text-gray-900 font-medium"
                    >Пароль</label
                >
                <input
                    id="password"
                    type="password"
                    bind:value={password}
                    class={input}
                    required
                />
            </div>

            <div>
                <label for="companyname" class="block text-gray-900 font-medium"
                    >Наименование компании</label
                >
                <input
                    id="companyname"
                    type="text"
                    bind:value={companyname}
                    class={input}
                    required
                />
            </div>

            <div>
                <label for="innnumber" class="block text-gray-900 font-medium"
                    >ИНН</label
                >
                <input
                    id="innnumber"
                    type="text"
                    bind:value={innnumber}
                    class={input}
                    required
                />
            </div>

            {#if error}
                <p class="text-red-500">{error}</p>
            {/if}

            <button
                type="submit"
                disabled={loading}
                class="w-full px-4 py-2 rounded-lg mt-2 outline-none transition-all text-gray-900 duration-200 bg-white/10 border ring not-hover:ring-0 border-gray-900/30 hover:border-gray-900/80 hover:ring-gray-900/30 backdrop-blur-sm shadow shadow-white/5"
            >
                {loading ? "Регистрируем..." : "Регистрация"}
            </button>
            <a class="underline text-sm" href="/login"
                >Есть аккаунт? Войдите</a
            >
        </form>
    </Card>
    <div class="absolute bottom-4 w-full text-center inter text-gray-100">© colorotix 2025</div>
</div>
