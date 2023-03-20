import { Configuration, OpenAIApi } from "openai";
import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import nextConnect from "next-connect";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import FormData from "form-data";
import fetch from "node-fetch";

import { setCache } from "@/libs/cache";

interface MulterNextApiRequest extends NextApiRequest {
	file: any;
}

// open ai api key
const openAiApiKey = process.env.OPENAI_API_KEY ?? "";

// open ai api configuration
const configuration = new Configuration({
	apiKey: openAiApiKey,
});

// open ai api instance
const openai = new OpenAIApi(configuration);

// next connect middleware for adding middleware to api routes
const translateRoute = nextConnect({
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

// cloudinary config
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_CLOUD_API_KEY,
	api_secret: process.env.CLOUDINARY_CLOUD_API_SECRET,
});

// multer cloudinary storage
const storage = new CloudinaryStorage({
	cloudinary: cloudinary,
	params: async (req, file) => {
		const id = uuidv4();
		const format = file.originalname.split(".").pop();
		return {
			folder: "apps/traducteur-de-fichier",
			public_id: `${id}-${file.originalname}`,
			format,
		};
	},
});

// uplaoder
const upload = multer({
	storage: multer.memoryStorage(),
	limits: {
		fileSize: 1024 * 1024 * 2,
	},
	fileFilter: (_, file, cb) => {
		if (
			!file.originalname.match(/\.(pdf)$/) ||
			!file.mimetype.startsWith("application/pdf")
		) {
			return cb(
				// @ts-ignore
				new Error("Only pdf and txt files are allowed!"),
				false
			);
		}
		return cb(null, true);
	},
});

// handle the translate with the correct api
const handleTranslate = async (req: NextApiRequest, res: NextApiResponse) => {};

// upload the file if there is one
translateRoute.use(upload.single("file"));

// handle the translate
translateRoute.post((req: MulterNextApiRequest, res: NextApiResponse) => {
	const deeplAuthKey = process.env.DEEPL_AUTH ?? "";
	const { lang, flow, text } = req.body;
	const { file } = req;

	// configs
	const baseURl = "https://api-free.deepl.com/v2";

	// translate text
	async function translateText() {
		const config = {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
		};
		try {
			// create the data to send to the api
			const data = new URLSearchParams();
			// append the deepl apkey
			data.append("auth_key", deeplAuthKey);
			// append the text to translate
			data.append("text", text);
			// append the target language
			data.append("target_lang", lang);

			const response = await fetch(`${baseURl}/translate`, {
				...config,
				body: data,
			});

			if (!response.ok) {
				throw new Error(
					`this went wrong ${JSON.stringify(
						await response.json()
					)} ==> ${lang}`
				);
			}

			// get the json response
			const json = (await response.json()) as {
				translations: {
					detected_source_language: string;
					text: string;
				}[];
			};

			const { detected_source_language } = json.translations[0];

			res.status(200).json({
				success: true,
				detected_source_language: detected_source_language,
				text: json.translations[0].text,
			});
		} catch (error) {
			console.log(error);
			res.status(500).json({
				error: "Something went wrong",
				success: false,
			});
		}
	}

	// translate document
	async function translateDocument() {
		const config = {
			method: "POST",
			headers: {
				"Content-Type": file.mimetype,
				Authorization: `DeepL-Auth-Key ${deeplAuthKey}`,
			},
		};

		try {
			// create the form data
			const formData = new FormData();

			// append the file to the form data
			formData.append("file", file.buffer, {
				filename: file.originalname,
				contentType: file.mimetype,
			});

			// append the target language
			formData.append("target_lang", lang);

			// send the request
			const response = await fetch(`${baseURl}/document`, {
				...config,
				body: formData,
			});

			// get the json response
			const json = await response.json();

			// get the document id
			const { document_id, document_key } = json as {
				document_id: string;
				document_key: string;
			};

			// create a job id
			const jobId = uuidv4();

			// set the values to the cache
			setCache(jobId, {
				document_id,
				document_key,
				lang,
			});

			// send the job id to the client
			res.status(200).json({
				success: true,
				jobId,
			});
		} catch (error) {
			console.log(error);
			res.status(500).json({
				error: "Something went wrong",
				success: false,
			});
		}
	}

	// call the correct function
	const callByType = {
		text: translateText,
		file: translateDocument,
	};

	return callByType[flow as "text" | "file"]();
});

export default translateRoute;
export const config = {
	api: {
		bodyParser: false,
	},
};
