import { FC } from 'react'

import { chatTitle, chatLogo } from '../style'
import Logo from '../icon/Logo'

const ChatTitle: FC = () => {
	return (
		<div className={chatTitle}>
			<div style={{height: "46px"}} className={chatLogo}>
				<Logo />
				<span className="ml-2 tracking-widest">聊天助手</span>
			</div>
			<div>
				<p>Chat Title</p>
				<p>Chat Title</p>
				<p>Chat Title</p>
			</div>
		</div>
	)
}

export default ChatTitle