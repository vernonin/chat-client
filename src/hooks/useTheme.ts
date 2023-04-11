import { useState, useEffect } from "react";

const KEY = 'theme'
type ITheme = 'light' | 'dark'

export default (): [ITheme, () => void] => {
	const [theme, setTheme] = useState<ITheme>(localStorage.getItem(KEY) as ITheme || 'light')

	const changeTheme = () => {
		if (theme === 'light') {
			setTheme('dark')
			localStorage.setItem(KEY, 'dark')
			document.documentElement.classList.add('dark')
		} else {
			setTheme('light')
			localStorage.setItem(KEY, 'light')
			document.documentElement.classList.remove('dark')
		}
	}

	useEffect(() => {
		if (theme === 'dark') {
			document.documentElement.classList.add('dark')
		} else {
			document.documentElement.classList.remove('light')
		}
	}, [])

	return [theme, changeTheme]
}
