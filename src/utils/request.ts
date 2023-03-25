const URL = "https://api.openai.com/v1/chat/completions";
const KEY = "your openai key";
const headers = {
	"Content-Type": "application/json",
	"Authorization": "Bearer " + KEY
};

export default async function (content: string) {
		let result = await fetch(URL, {
			headers,
			method: 'POST',
			body: JSON.stringify({
				model: "gpt-3.5-turbo",
    		messages: [{role: "user", content}]
			})
		})
		let data = await result.json()

		return data
}