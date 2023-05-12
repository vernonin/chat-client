import { useEffect, useState } from "react"

const KEY = "theme"
type ITheme = "light" | "dark"

export default (): [ITheme, () => void] => {
	const [theme, setTheme] = useState<ITheme>(localStorage.getItem(KEY) as ITheme || "light")

	const changeTheme = () => {
		if (theme === "light") {
			setTheme("dark")
			localStorage.setItem(KEY, "dark")
			document.documentElement.classList.add("dark")
			document.documentElement.style.setProperty("--typing-color", "#FFF")
		} else {
			setTheme("light")
			localStorage.setItem(KEY, "light")
			document.documentElement.classList.remove("dark")
			document.documentElement.style.setProperty("--typing-color", "#000")
		}
	}

	useEffect(() => {
		if (theme === "dark") {
			document.documentElement.classList.add("dark")
		} else {
			document.documentElement.classList.remove("light")
		}
	}, [])

	return [theme, changeTheme]
}
