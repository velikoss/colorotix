import prisma from "$lib/server/prisma";
import type { PageServerLoad } from "../$types";

export const load: PageServerLoad = async ({locals}) => {
    const jsons = await prisma.fraudJson.findMany({
        where: {
            client_id: locals.user.companyId,
            analysis_type: {
                in: ["amortization_by_month_year", "vehicle_efficiency_per_year", "downtime_find", "repair_expenses_by_month_year"]
            }
        }
    });

    const transformed = jsons.reduce((acc, item) => {
        acc[item.analysis_type] = item.result;
        return acc;
    }, {} as Record<string, any>);

    return { jsons: transformed };
};