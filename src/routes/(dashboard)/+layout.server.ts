import { goto } from '$app/navigation';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import prisma from '$lib/server/prisma';

export const load: LayoutServerLoad = async ({ locals, url }) => {
    if (!locals.user && !url.href.includes("login") && !url.href.includes("register")) return redirect(303, "/login");
    const recomendations = await prisma.fraudJson.findFirst({
        where: {
            client_id: locals.user.companyId,
            analysis_type: "recommendations"
        }
    });
    return {
        user: locals.user,
        path: url.pathname,
        recomendations
    };
};