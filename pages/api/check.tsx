import { getCache } from "@/libs/cache";
import nextConnect from "next-connect";
import { NextApiResponse, NextApiRequest } from "next";

const handler = nextConnect({
	onError(error: unknown, _, res: NextApiResponse) {
		res.status(500).json({
			// @ts-ignore
			error: `Sorry something Happened! ${error.message}`,
		});
	},
	onNoMatch(req, res) {
		res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
	},
});

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
	const { job_id } = req.body;
	const document = getCache(job_id);

	if (document) {
		fetch
		return;
	} else {
		res.status(404).json({ error: "Job not found" });
	}
});

export default handler;
