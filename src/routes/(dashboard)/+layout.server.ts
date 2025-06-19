import { goto } from '$app/navigation';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, url }) => {
    if (!locals.user && !url.href.includes("login") && !url.href.includes("register")) return redirect(303, "/login");
    return {
        user: locals.user
    };
};