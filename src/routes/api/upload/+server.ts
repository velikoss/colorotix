import type { RequestHandler } from './$types';
import { error, json } from '@sveltejs/kit';
import { Client } from 'ssh2';
import type { ConnectConfig } from 'ssh2';


const SSH_HOST = process.env.SSH_HOST ?? '127.0.0.1';
const SSH_PORT = Number(process.env.SSH_PORT ?? '22');
const SSH_USER = process.env.SSH_USER ?? 'uploader';
const SSH_PASS = process.env.SSH_PASS ?? '';
const SSH_DIR  = process.env.SSH_DIR  ?? '/srv/uploads';

function sftpPut(buf: Buffer, remotePath: string): Promise<void> {
	return new Promise((resolve, reject) => {
		const conn = new Client();
		const cfg: ConnectConfig = {
			host: SSH_HOST,
			port: SSH_PORT,
			username: SSH_USER,
			password: SSH_PASS,
			readyTimeout: 10_000
		};

		conn
			.on('ready', () => {
				conn.sftp((err, sftp) => {
					if (err) return reject(err);
					const ws = sftp.createWriteStream(remotePath);
					ws.on('close', () => { conn.end(); resolve(); });
					ws.on('error', (e: Error) => { conn.end(); reject(e); });
					ws.end(buf);
				});
			})
			.on('error', reject)
			.connect(cfg);
	});
}

export const POST: RequestHandler = async ({ request }) => {
	const form = await request.formData();

	const file = form.get('file') as File | null;
	const companyId = form.get('companyId') as string | null;

	if (!file) throw error(400, 'Файл не передан');
	if (!companyId) throw error(400, 'companyId не передан');

	const remoteName = `${companyId}_${file.name}`;
	const buf = Buffer.from(await file.arrayBuffer());

	try {
		await sftpPut(buf, `${SSH_DIR}/${remoteName}`);
	} catch (e) {
		console.error('SFTP error', e);
		throw error(500, 'Не удалось сохранить файл');
	}

	return json({ ok: true, file: remoteName });
};
