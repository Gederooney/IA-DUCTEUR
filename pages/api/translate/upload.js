import nextConnect from "next-connect";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";

const apiRoute = nextConnect({
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
});

const uploadMiddleware = upload.fields([
	{ name: "file", maxCount: 1 },
	{ name: "lang", maxCount: 1 },
]);

apiRoute.use(uploadMiddleware);

apiRoute.post(async (req, res) => {
	try {
		console.log(req.file);
		res.status(200).json({ success: true, file: req.file });
	} catch (error) {
		res.status(500).json({ message: "erreur du serveur" });
	}
});

export default apiRoute;
export const config = {
	api: {
		bodyParser: false,
	},
};
