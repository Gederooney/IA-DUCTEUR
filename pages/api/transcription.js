const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
	apiKey: "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",
});
const openai = new OpenAIApi(configuration);

const handler = async (req, res) => {
	if (req.method === "POST") {
		try {
			console.log("here");
			const { str, lang } = JSON.parse(req.body);
			const response = await openai.createCompletion({
				model: "text-davinci-003",
				prompt: `translate this into ${lang}\n\n${str}`,
				temperature: 1,
				max_tokens: 3443,
				top_p: 1,
				frequency_penalty: 0,
				presence_penalty: 0,
			});
			const { data } = response;
			res.status(200).send({ str: data.choices[0].text.trim() });
		} catch (error) {
			console.log(error.message);
		}
	}
};

export default handler;
