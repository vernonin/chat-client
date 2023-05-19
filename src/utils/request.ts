

interface IData {
	message: string
	sessionId?: string
}

interface IConnectSSE {
	message: string
	sessionId?: string
	callBack: (value: string) => void
}

/**
 * V1 接口
 * @data message
 * @data sessionId
 */
export default async function (data: IData) {

	const URL = "/chat"
	const headers = {
		"Content-Type": "application/json",
	}

	const config = { headers, method: "POST", body: JSON.stringify(data)}
	
	const result = await fetch(URL, config)

	return await result.json()
}


/**
 * V2 接口SSE
 * @message string
 * @sessionId string
 * @callBack callBack function
 */
export const createSource = ({
	message,
	sessionId,
	callBack
}: IConnectSSE) => {
	return new Promise<void>((resolve, resject) => {
		const url =`/chat/v2?sessionId=${sessionId}&message=${message}`

		const Event = new EventSource(url, { withCredentials: true })

		// 监听服务端发送消息
		Event.onmessage = (message) => {
			// 换行标识符
			const wrapReg = /!xsy!/g

			// 结束标识符
			const endSymbol = "[END]"

			// 服务端推流完成，结束等待，关闭连接
			if (message.data.includes(endSymbol)) {
				resolve()
				Event.close()
			}

			callBack(message.data.replace(wrapReg, "\n"))
		}

		// 连接错误，抛出报错信息，关闭连接
		Event.onerror = (e) => {
			resject(e)
			Event.close()
		}
	})
}
