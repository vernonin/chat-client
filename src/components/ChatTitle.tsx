import { FC } from 'react'

import Logo from '../icon/Logo'
import Chat from '../icon/Chat'
import Trash from '../icon/Trash'

import { chatTitle, chatLogo, titleItem } from '../style'
import '../style/style.css'
import Add from '../icon/Add'

const ChatTitle: FC = () => {
	return (
		<div style={{width: "100%", height: "100vh"}} className={chatTitle}>
			<div style={{height: "46px"}} className={chatLogo}>
				{/* <Logo /> */}
				<img style={{height: "18px", width: "18px"}} src="/ai.png" alt="" />
				<span className="ml-2 tracking-widest">聊天助手</span>
			</div>
			<div style={{flex: 1, overflow: "scroll"}} className="px-3">
				<div className={titleItem}>
					<span className="scale-75"><Add /></span>
					<div className="ml-1 break-normal truncate">新建聊天</div>
				</div>
				<div className={titleItem}>
					<Chat />
					<div className="ml-1 break-normal truncate">你可以干嘛</div>
					<div className="absolute inset-y-0 right-2 trash">
						<Trash />
					</div>
				</div>
				<div className={titleItem}>
					<Chat />
					<div className="ml-1 break-normal truncate">你可以干嘛</div>
					<div className="absolute inset-y-0 right-2 trash">
						<Trash />
					</div>
				</div>
				<div className={titleItem}>
					<Chat />
					<div className="ml-1 break-normal truncate">你可以干嘛</div>
					<div className="absolute inset-y-0 right-2 trash">
						<Trash />
					</div>
				</div>
			</div>
			<div
				style={{height: "220px"}}
				className="px-2 py-4 text-sm dark:text-white flex flex-col justify-between"
			>
				<div>
					<div className="text-center text-base font-bold mb-2">主要成员</div>
					<div className="flex justify-around">
						<div className="flex flex-col items-center text-center text-gray-700 dark:text-gray-300 underline font-semibold">
							<img className="avatar border border-2 border-gray-600 dark:border-white border-double" src="/huanglin.jpg" alt="谢胜瑜" />
							黄琳 前端-React
						</div>
						<div className="flex flex-col items-center text-center text-gray-700 dark:text-gray-300 underline font-semibold">
							<img className="avatar border border-2 border-gray-600 dark:border-white border-double" src="/xieshengyu.jpg" alt="谢胜瑜" />
							谢胜瑜 后端-Java
						</div>
					</div>
				</div>
				<div>
					<div className="leading-8 border-b border-gray-400">微信：auin244</div>
					<div className="leading-8 border-b border-gray-400">邮箱：huanglin824@gmail.com</div>
				</div>
			</div>
		</div>
	)
}

export default ChatTitle
