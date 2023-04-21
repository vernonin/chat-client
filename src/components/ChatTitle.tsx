import { FC } from 'react'

import Logo from '../icon/Logo'
import Chat from '../icon/Chat'
import Trash from '../icon/Trash'

import { chatTitle, chatLogo, titleItem } from '../style'
import '../style/style.css'

const ChatTitle: FC = () => {
	return (
		<div style={{width: "100%", height: "100vh"}} className={chatTitle}>
			<div style={{height: "46px"}} className={chatLogo}>
				<Logo />
				<span className="ml-2 tracking-widest">聊天助手</span>
			</div>
			<div className="px-3">
				<div className={titleItem}>
					<Chat />
					<div className="ml-1 break-normal truncate">新建聊天</div>
				</div>
				<div className={titleItem}>
					<Chat />
					<div className="ml-1 break-normal truncate">你可以干嘛</div>
					<div className="absolute inset-y-0 right-2 trash">
						<Trash />
					</div>
				</div>
			</div>
		</div>
	)
}

export default ChatTitle
