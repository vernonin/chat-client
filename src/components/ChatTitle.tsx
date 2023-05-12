import { useLiveQuery } from "dexie-react-hooks"
import { FC, useState } from "react"

import useSize from "../hooks/useSize"
import { db } from "../utils/db"


import Notification from "./Notification"
import Profile from "./Profile"

import Add from "../icon/Add"
import Chat from "../icon/Chat"
import Team from "../icon/Team"
import Trash from "../icon/Trash"

import { chatLogo, chatTitle, titleItem } from "../style"
import "../style/style.css"

interface props {
	onNew: () => void
	onChangeActive: (id: number) => void
}
const ChatTitle: FC<props> = ({ onNew, onChangeActive }) => {
	const size = useSize()
	const [openConfirm, setOpenConfirm] = useState(false)
	const [deleteState, setDeleteState] = useState<{id: number, isActive: boolean}>({
		id: 0,
		isActive: false
	})

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
		setOpenConfirm(true)

		setDeleteState({id, isActive})
	}

	const confirm = async () => {
		const {id, isActive} = deleteState
		await db.friends.delete(id)

		if (isActive) {
			onNew()
		}

		setOpenConfirm(false)
	}

	return (
		<div style={{ width: "280px", height: `${size.height}px`}} className={chatTitle}>
			<section className="flex-1 flex flex-col divide-y divide-black divide-opacity-50 dark:divide-white">
				<div style={{ height: "46px" }} className={chatLogo}>
					<img style={{ height: "18px", width: "18px" }} src="/ai.png" alt="" />
					<span className="ml-2 tracking-widest">聊天助手</span>
				</div>
				<div style={{ flex: 1, overflow: "hidden" }} className="px-3">
					<div style={{height: "40px"}}>
						<div className={titleItem} onClick={newChat}>
							<span className="scale-75"><Add /></span>
							<div className="ml-1 break-normal truncate">新建聊天</div>
						</div>
					</div>
					<div style={{height: `${size.height - 300 - 40 - 46}px`, overflow: "scroll"}} className="pb-2 scroll-none">
						{
							chatList?.map(v => (
								<div
									key={v.sessionId}
									className={`${titleItem} ${v.isActive ? "bg-blue-300 dark:bg-blue-900" : ""}`}
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
			</section>
			<section style={{height: "300px"}} className="px-3">
				<div className="flex justify-center items-center text-base py-2 font-bold text-gray-700 dark:text-gray-300">
					<span className="mr-1">主要成员</span>
					<Team />
				</div>
				{
					[
						{name: "谢胜瑜", avatar: "/xieshengyu.jpg", forte: "后端开发", number: "133 1848 0733", email: "huanglin824@gmail"},
						{name: "黄\t琳", avatar: "/huanglin.jpg", forte: "前端开发", number: "133 1848 0733", email: "huanglin824@gmail"},
					].map(v => (
						<Profile key={v.avatar} {...v} />
					))
				}
			</section>

			<Notification
				visible={openConfirm}
				onCancel={() => setOpenConfirm(false)}
				onConfirm={confirm}
			/>
		</div>
	)
}

export default ChatTitle
