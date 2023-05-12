import { useEffect, useState } from "react"

interface ISize {
	width: number
	height: number
}

const initState = {
	width: window.innerWidth,
	height: window.innerHeight
} 

export default (): ISize => {
	const [size, setSize] = useState<ISize>(initState)

	function handleSize() {
		const width = window.innerWidth
		const height = window.innerHeight

		setSize({ width, height })
	}

	useEffect(() => {
		window.addEventListener("resize", handleSize)

		return () => window.removeEventListener("resize", handleSize)
	}, [])

	return size
}
