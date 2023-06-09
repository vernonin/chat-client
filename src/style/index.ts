
/**
 * 最外层
 */
export const outerLayer = `w-screen overflow-hidden`

export const outContainer = `flex over overflow-hidden w-screen`

export const topBar = `
	flex justify-between items-center bg-blue-50 px-2 lg:px-12 md:px-6
	dark:bg-slate-900 dark:text-white
`

/**
 * 标题区域
 */
export const chatTitle = `flex flex-col
	bg-blue-100 divide-y divide-black divide-opacity-50
	dark:bg-slate-950 dark:divide-white
`
export const chatLogo = `
	text-lg font-bold text-center flex items-center justify-center
	dark:text-white
`
export const titleItem = `
  add-effect
	flex relative items-center mt-2 px-1 text-sm antialiased font-semibold
	cursor-pointer border border-gray-400 rounded-lg h-10 text-gray-800 chat-title-item
	dark:text-white
`



/**
 * 底部局域
 */
export const footer = `
	absolute left-0 right-0 bottom-0 
	bg-gray-100 text-center text-gray-500 text-sm
	dark:bg-slate-700 dark:text-white
`



/**
 * 文本框
 */
export const input = `
	w-full h-10 rounded border-2 pl-4 lg:pr-20 pr-12 bg-gray-100
	focus:outline-none focus:ring focus:border-blue-100 placeholder-gray-500

	dark:bg-gray-400 dark:text-gray-900 dark:text-white dark:border-gray-300 dark:placeholder-gray-100
`


/**
 * profile
 */
export const profile = `
	h-22 mb-2 p-2 rounded-md bg-gradient-to-r from-indigo-200 to-indigo-300
	dark:from-gray-600 dark:to-gray-700
`