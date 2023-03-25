import { useState, useEffect } from "react";
import { IMessage } from "../components/Content";

const STORAGE_KEY = "message";

export default function (initState: IMessage[]): [IMessage[], (state: IMessage) => void] {
	const sMess = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]")

	const [msg, setMsg] = useState([...sMess,...initState, ])

	useEffect(() => {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(msg))
	}, [msg])

	const setMessages = (state: IMessage) => {
		// localStorage.setItem(STORAGE_KEY, JSON.stringify([...msg, state]))

		setMsg([...msg, state])
	}

	return [msg, setMessages]
}
