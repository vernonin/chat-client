import { FC, useContext } from 'react'
import { Context } from '../App'

import Add from '../icon/Add'
import Chat from '../icon/Chat'
import Trash from '../icon/Trash'


import { chatLogo, chatTitle, titleItem } from '../style'
import '../style/style.css'

const ChatTitle: FC = () => {
	const context = useContext(Context)
	
	return (
		<div style={{ width: "100%", height: context?.innerHeight }} className={chatTitle}>
			<div style={{ height: "46px" }} className={chatLogo}>
				{/* <Logo /> */}
				<img style={{ height: "18px", width: "18px" }} src="/ai.png" alt="" />
				<span className="ml-2 tracking-widest">聊天助手</span>
			</div>
			<div style={{ flex: 1, overflow: "hidden" }} className="px-3 flex flex-col">
				<div >
					<div className={titleItem}>
						<span className="scale-75"><Add /></span>
						<div className="ml-1 break-normal truncate">新建聊天</div>
					</div>
				</div>
				<div style={{height: "auto",overflow: "scroll"}} className="pb-2">
					{
						[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map(v => (
							<div key={v} className={titleItem}>
								<Chat />
								<div className="ml-1 mr-8 break-normal truncate">你可以干嘛你佛山店冯楠撒丁奇偶分念佛阿帆</div>
								<div className="absolute inset-y-0 right-1 trash">
									<Trash />
								</div>
							</div>
						))
					}
				</div>
			</div>
			<div
				style={{ height: "220px" }}
				className="px-2 py-4 text-sm dark:text-white flex flex-col justify-between"
			>
				<div>
					<div className="text-center text-base font-bold mb-2">主要成员</div>
					<div className="flex justify-around ">
						<div className="flex flex-col items-center cursor-pointer text-center text-gray-700 dark:text-gray-300 underline font-semibold">
							<div className="avatar border border-2 border-gray-600 dark:border-white border-double">
								<img src="/huanglin.jpg" alt="谢胜瑜" />
							</div>
							黄  琳
						</div>
						<div className="flex flex-col items-center cursor-pointer text-center text-gray-700 dark:text-gray-300 underline font-semibold">
							<div className="avatar border border-2 border-gray-600 dark:border-white border-double">
								<img src="/xieshengyu.jpg" alt="谢胜瑜" />
							</div>
							谢胜瑜
						</div>
					</div>
				</div>
				<div>
					<div className="leading-8 border-b border-gray-400">
						邮箱1：huanglin824@gmail.com
					</div>
					<div className="leading-8 border-b border-gray-400">
						邮箱2：xieshengyu040@gmail.com
					</div>
				</div>
			</div>
		</div>
	)
}

export default ChatTitle
