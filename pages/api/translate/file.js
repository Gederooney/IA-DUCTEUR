import nextConnect from "next-connect";
import multer from "multer";
import textract from "textract";
import { v4 as uuidv4 } from "uuid";
import { Configuration, OpenAIApi } from "openai";
import fs from "fs";

const configuration = new Configuration({
	apiKey: "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",
});
const openai = new OpenAIApi(configuration);

const fileTranslateRoute = nextConnect({
	onError(error, req, res) {
		res.status(501).json({
			error: `Sorry something Happened! ${error.message}`,
		});
	},
	onNoMatch(req, res) {
		res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
	},
});

const upload = multer({
	storage: multer.diskStorage({
		destination: "./uploads",
		filename: (req, file, cb) => {
			const id = uuidv4();
			cb(null, `${id}-${file.originalname}`);
		},
	}),
	limits: {
		fileSize: 1024 * 1024 * 2,
	},
	fileFilter: (req, file, cb) => {
		if (
			!file.originalname.match(/\.(doc|docx|pdf|txt)$/) ||
			(!file.mimetype.startsWith("application/") &&
				!file.mimetype.startsWith("text/plain")) ||
			file.originalname.includes("forbiddenword")
		) {
			return cb(
				new Error("Only doc, docx, pdf and txt files are allowed!"),
				false
			);
		}
		cb(null, true);
	},
});

const uploadMiddleware = upload.fields([
	{ name: "file", maxCount: 1 },
	{ name: "data", maxCount: 1 },
]);

const translate = async (str, lang) => {
	try {
		const translated = "";
		const promises = [];
		let words = str.match(/\S+/g);
		let chunkSize = 1000;

		for (let i = 0; i < words.length; i += chunkSize) {
			const strChunck = words.slice(i, i + chunkSize).join(" ");
			promises.push(
				openai.createCompletion({
					model: "text-davinci-003",
					prompt: `translate this into ${lang}\n\n${strChunck}`,
					temperature: 1,
					max_tokens: 2000,
					top_p: 1,
					frequency_penalty: 0,
					presence_penalty: 0,
				})
			);
		}
		console.log(promises.length);
		const responses = (await Promise.all(promises))
			.map((r) => r.data.choices[0].text)
			.join(" ");
		return { success: true, result: responses };
	} catch (error) {
		console.log(error.message);
		return { success: false, message: "could not translate" };
	}
};

fileTranslateRoute.use(uploadMiddleware);

fileTranslateRoute.post(async (req, res) => {
	try {
		const file = req.files.file[0];
		const { data } = req.body;
		const { lang } = JSON.parse(data);
		if (!file) {
			return res.status(400).send("File is required");
		}
		textract.fromFileWithPath(file.path, async (e, text) => {
			if (e) {
				return res
					.status(400)
					.send("Nous ne pouvons pas lire le fichier");
			}
			const { success, result } = await translate(text, lang);
			if (!success)
				return res.status(400).send("Nous ne pouvons pas traduire");
			const name = file.originalname.split(".").slice(0, -1).join(".");
			const newName = `${name}-translated-${lang}-${uuidv4()}.${file.originalname
				.split(".")
				.pop()}`;
			fs.unlinkSync(file.path);
			fs.writeFileSync(`./public/traduits/${newName}`, result);
			return res.status(200).send({
				success: true,
				transaltedFile: newName,
				contentAsString: result,
			});
		});
		return;
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ message: "erreur du serveur", success: false });
	}
});

export default fileTranslateRoute;
export const config = {
	api: {
		bodyParser: false,
	},
};
