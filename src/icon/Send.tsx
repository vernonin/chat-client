import { FC } from 'react'

interface SendProps {
	click: () => void
}

const Send: FC<SendProps> = ({ click }) => {
	return (
		<div
			className="transform scale-110 cursor-pointer flex items-center absolute right-2 lg:right-6 inset-y-0"
			onClick={click}
		>
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
				<path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
			</svg>
		</div>
	)
}

export default Send
