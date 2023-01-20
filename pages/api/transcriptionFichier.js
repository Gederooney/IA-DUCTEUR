import path from "path";
import multer from "multer";

import { Router } from "next/router";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
	apiKey: "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",
});
const openai = new OpenAIApi(configuration);

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, path.join(__dirname, "uploads"));
	},
	filename: (req, file, cb) => {
		cb(null, `${Date.now()}-${file.originalname}`);
	},
});

const upload = multer({
	storage,
	fileFilter: (req, file, cb) => {
		if (file.mimetype !== "text/plain") {
			return cb(new Error("Invalid file type."));
		}
		cb(null, true);
	},
});

const handler = async (req, res) => {
	if (req.method === "POST") {
		try {
			const { file, lang } = JSON.parse(req.body);
			console.log(lang);
			// const response = await openai.createCompletion({
			// 	model: "text-davinci-003",
			// 	prompt: `translate this into ${lang}\n\n${str}`,
			// 	temperature: 1,
			// 	max_tokens: 3443,
			// 	top_p: 1,
			// 	frequency_penalty: 0,
			// 	presence_penalty: 0,
			// });
			// const { data } = response;
			// res.status(200).send({ str: data.choices[0].text.trim() });
			res.end();
		} catch (error) {
			console.log(error.message);
		}
	}
};

const router = new Router();
router.post("/transcriptionFichier", upload.single("file"), handler);

export default router;
