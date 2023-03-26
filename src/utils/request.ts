const URL = "/chat";
const headers = {
	"Content-Type": "application/json",
};

interface IData {
	message: string
	sessionId?: string
}

export default async function (data: IData) {

	const config = { headers, method: "POST", body: JSON.stringify(data)}
	
	let result = await fetch(URL, config)

	return await result.json()
}