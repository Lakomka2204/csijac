import { withPG } from "@/server/plugins/db";

export default defineEventHandler(async (event) => {
	if (!event.context.user) return setResponseStatus(event, 403, "No user");
	const body = await readMultipartFormData(event);
	if (!body) return setResponseStatus(event, 404, "No body");
	if (body.length == 0) return setResponseStatus(event, 404, "No files");
	const file = body[0];

	const filename = file.filename!;
	try {
		const id = await withPG<string>(async (client) => {
			return (
				await client.query(
					"INSERT INTO videos(user_id,title) VALUES($1,$2) RETURNING id;",
					[event.context.user.id, filename.split(".")[0]]
				)
			).rows[0].id as string;
		});
		const duration = await processVideo(id, file.data, (s, p) =>
			console.log("%d%% %s", p, s)
		);
		await withPG(async (client) => {
			return await client.query(
				"UPDATE videos SET duration = $1 WHERE id = $2;",
				[duration, id]
			);
		});
		setResponseStatus(event, 201, "Received file!");
		return { id };
	} catch (err: any) {
		return createError(err);
	}
});
