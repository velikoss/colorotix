import prisma from "$lib/server/prisma";
import type { PageServerLoad } from "../$types";

export const load: PageServerLoad = async ({locals}) => {
    const jsons = await prisma.fraudJson.findMany({
        where: {
            client_id: locals.user.companyId,
            analysis_type: {
                in: ["seasonal_fines", "top_drivers_fines_by_month", "salary_data", "top_drivers_salary_efficiency"]
            }
        }
    });

    const transformed = jsons.reduce((acc, item) => {
        acc[item.analysis_type] = item.result;
        return acc;
    }, {} as Record<string, any>);

    return { jsons: transformed };
};