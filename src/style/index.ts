
export const outContainer = `
	w-screen h-screen flex
`

export const topBar = `
	flex justify-between items-center bg-indigo-100 px-2 lg:px-12 md:px-6
	dark:bg-gray-800 dark:text-white
`

/**
 * 标题区域
 */
export const chatTitle = `
	h-full bg-indigo-100 w-64 divide-y divide-black divide-opacity-50
	dark:bg-gray-800 dark:divide-white
	hidden sm:block
`
export const chatLogo = `
	text-lg font-bold text-center flex items-center justify-center
	dark:text-white
`
export const titleItem = `
	flex relative items-center mt-2 px-2 text-sm antialiased font-semibold
	cursor-pointer border border-gray-400 rounded-lg h-10 text-gray-500 chat-title-item
	dark:text-white
`



/**
 * 底部局域
 */
export const footer = `
	bg-gray-200 text-center text-black text-sm
	dark:bg-gray-900 dark:text-white
`



/**
 * 文本框
 */
export const input = `
	w-full h-10 rounded border-2 pl-4 lg:pr-20 pr-12
	focus:outline-none focus:ring focus:border-blue-100
	dark:bg-gray-300 dark:text-gray-900
`