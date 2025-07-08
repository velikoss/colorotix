import type { PageServerLoad } from "./$types";
import { AIRFLOW_HOST, AIRFLOW_USER, AIRFLOW_PASSWORD } from "$env/static/private";
import { randomUUID } from "crypto";
import prisma from "$lib/server/prisma";

// ID вашего Airflow‑пайплайна
const DAG_ID = "etl_crm_erp_pipeline_sqlalchemy_COPY_no_limits";


export const load: PageServerLoad = async ({ fetch, url, parent, locals }) => {
  // 1) Получаем данные пользователя из layout‑loader'а
  const { user } = await parent();
  const companyId: string | undefined = user?.companyId;

  // 3) Basic‑auth для Airflow REST‑API
  const authHeader =
    "Basic " + Buffer.from(`${AIRFLOW_USER}:${AIRFLOW_PASSWORD}`).toString("base64");

  // 4) Формируем вызов
  const airflowUrl = `http://${AIRFLOW_HOST}/api/v1/dags/${DAG_ID}/dagRuns`;
  const dagRunRes = await fetch(airflowUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: authHeader,
    },
    body: JSON.stringify({
      conf: {
        client_id: companyId, // ← передаём в DAG то, что пришло из data.user
      },
    }),
  });

  // 5) Обработка ошибок Airflow‑API
  if (!dagRunRes.ok) {
    const errorText = await dagRunRes.text();
    console.error("Failed to trigger Airflow DAG", dagRunRes.status, errorText);
    // return {
    //   status: "error" as const,
    //   error: {
    //     status: dagRunRes.status,
    //     message: errorText,
    //   },
    // };
  }

  // 6) Возвращаем info о только что запущенном DAG‑ранe
  const dagRun = dagRunRes.ok ? (await dagRunRes.json()) as {
    dag_run_id: string;
    execution_date: string;
    state: string;
  } : {};

  const jsons = await prisma.fraudJson.findMany({
        where: {
            client_id: locals.user.companyId,
        }
    });

  const transformed = jsons.reduce((acc, item) => {
      acc[item.analysis_type] = item.result;
      return acc;
  }, {} as Record<string, any>);

  return {
    status: "ok" as const,
    dagRun,
    companyId,
    user,
    jsons: transformed
  };
};

