import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
	apiKey: "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",
});
const openai = new OpenAIApi(configuration);

const handler = async (req, res) => {
	if (req.method === "POST") {
		try {
			const { str, lang } = req.body;
			const response = await openai.createCompletion({
				model: "text-davinci-003",
				prompt: `translate this into ${lang}\n\n${str}`,
				temperature: 1,
				max_tokens: 3500,
				top_p: 1,
				frequency_penalty: 0,
				presence_penalty: 0,
			});
			const { data } = response;
			res.status(200).json({
				translated: data.choices[0].text.trim(),
			});
		} catch (error) {
			res.status(500).json({
				error: true,
				message: "désolé nous avaons rencontré une erreur",
			});
		}
	}
};

export default handler;
