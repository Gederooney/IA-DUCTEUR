import { validateTextInput } from "../Translator";

describe("validateTextInput", () => {
	test("it returns an error message if the text input is empty", () => {
		const error = validateTextInput("");
		expect(error).toEqual("Please enter text to translate.");
	});

	test("it returns an error message if the text input has more than 3500 words", () => {
		const longText = "word ".repeat(3501);
		const error = validateTextInput(longText);
		expect(error).toEqual(
			"You cannot convert more than 3500 words at a time."
		);
	});

	test("it returns an empty string if the text input is valid", () => {
		const validText = "word ".repeat(3499);
		const error = validateTextInput(validText);
		expect(error).toEqual("");
	});
});
