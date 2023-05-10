import { useLiveQuery } from "dexie-react-hooks";
import { FC, useContext } from 'react';

import { Context } from "../App";
import { db } from '../utils/db';

import Add from '../icon/Add';
import Chat from '../icon/Chat';
import Cooperate from '../icon/Cooperate';
import Email from '../icon/Email';
import Team from '../icon/Team';
import Trash from '../icon/Trash';

import { chatLogo, chatTitle, titleItem } from '../style';
import '../style/style.css';

interface props {
	onNew: () => void
	onChangeActive: (id: number) => void
}
const ChatTitle: FC<props> = ({ onNew, onChangeActive }) => {
	const context = useContext(Context)

	const chatList = useLiveQuery(
		async () => (await db.friends.toArray()).reverse()
	)


	const newChat = async () => {
		if (chatList && chatList?.length < 1) {
			return
		}

		// 找到当前的项目项
		const current = chatList?.find(v => v.isActive)

		// 将当前聊天项设为不活跃
		await db.friends.update(current?.id as number, {...current, isActive: false})

		onNew()
	}

	const deleteChat = async (id: number, isActive: boolean) => {
		await db.friends.delete(id)

		if (isActive) {
			onNew()
		}
	}

	return (
		<div style={{ width: "100%", height: context?.innerHeight }} className={chatTitle}>
			<div style={{ height: "46px" }} className={chatLogo}>
				{/* <Logo /> */}
				<img style={{ height: "18px", width: "18px" }} src="/ai.png" alt="" />
				<span className="ml-2 tracking-widest">聊天助手</span>
			</div>
			<div style={{ flex: 1, overflow: "hidden" }} className="px-3 flex flex-col">
				<div>
					<div className={titleItem} onClick={newChat}>
						<span className="scale-75"><Add /></span>
						<div className="ml-1 break-normal truncate">新建聊天</div>
					</div>
				</div>
				<div style={{height: "auto",overflow: "scroll"}} className="pb-2">
					{
						chatList?.map(v => (
							<div
								key={v.sessionId}
								className={`${titleItem} ${v.isActive ? 'bg-blue-400 dark:bg-blue-700' : ''}`}
								onClick={() => {
									if (v.isActive) return
									onChangeActive(v.id as number)
								}}
							>
								<Chat />
								<div className="ml-1 mr-8 break-normal truncate">{v.title}</div>
								<div
									style={v.isActive ? {display: "flex", alignItems: "center"} : {}}
									className="absolute inset-y-0 right-1 trash"
									onClick={e => {
										e.stopPropagation()
										deleteChat(v.id as number, v.isActive)
									}}
								>
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
					<div className="flex items-center text-base font-bold mb-2 text-gray-700 dark:text-gray-300">
						<span className="mr-1">主要成员</span>
						<Team />
					</div>
					<div className="flex">
						<div className="flex flex-col items-center cursor-pointer text-center text-gray-700 dark:text-gray-300 underline font-semibold">
							<div className="avatar border border-2 border-gray-600 dark:border-white border-double">
								<img src="/huanglin.jpg" alt="谢胜瑜" />
							</div>
						</div>
						<div className="flex -ml-4 flex-col items-center cursor-pointer text-center text-gray-700 dark:text-gray-300 underline font-semibold">
							<div className="avatar border border-2 border-gray-600 dark:border-white border-double">
								<img src="/xieshengyu.jpg" alt="谢胜瑜" />
							</div>
						</div>
					</div>
				</div>
				<div>
					<div className="flex items-center text-base font-bold text-gray-700 dark:text-gray-300">
						<span className="mr-1">推广合作</span>
						<Cooperate />
					</div>
					<div className="flex items-center leading-8 border-b border-gray-400">
						<Email />
						<span className="text-gray-700 dark:text-gray-300 ml-1">huanglin824@gmail.com</span>
					</div>
					<div className="flex items-center leading-8 border-b border-gray-400">
						<Email />
						<span className="text-gray-700 dark:text-gray-300 ml-1">xieshengyu040@gmail.com</span>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ChatTitle
