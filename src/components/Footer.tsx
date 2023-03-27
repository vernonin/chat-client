import { FC } from 'react'

const Footer: FC = () => {
	return (
		<div
			style={{height: "36px", lineHeight: "36px", background: "#EEE"}}
			className="text-center text-muted footer"
		>
			&copy;&nbsp;&nbsp;万能聊天助手 | gpt-3.5-turbo-0301
		</div>
	)
}

export default Footer
