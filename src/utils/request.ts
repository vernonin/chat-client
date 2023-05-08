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
	
	const result = await fetch(URL, config)

	return await result.json()
}


type IFc = {
	message: string
	sessionId?: string
	callBack: (value: string) => void
}

export const createSource = ({
	message,
	sessionId,
	callBack
}: IFc) => {
	return new Promise<void>((resolve, resject) => {
		const Event = new EventSource(`/chat/v2?sessionId=${sessionId}&message=${message}`, {
			withCredentials: true
		});

		try {
			Event.onmessage = (message) => {
				console.log(message)
				callBack(message.data)
			}
	
			Event.onopen = () => {
				console.log('连接已建立！')
			}
	
			Event.onerror = (e) => {
				Event.close()
				resolve()
			}
		}
		catch {
			resject()
		}
	})
}


