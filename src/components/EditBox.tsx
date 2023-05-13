import { FC, useState } from "react"
import { toast } from "react-toastify"

interface props {
	visible: boolean
	onCancel: () => void
	onSubmit: (title: string) => void
}
const EditBox: FC<props> = ({ visible, onCancel, onSubmit }) => {
	const [chatTitle, setChatTitle] = useState("")


	const submit = () => {
		if (chatTitle.trim() === "") return toast("请输入新标题！")

		onSubmit(chatTitle)
		setChatTitle("")
	}

	if (!visible) {
		return null
	}
	return (
		<div className="modal-outer" onClick={e => {
			e.stopPropagation()
			onCancel()
		}}>
			<div
				className="bg-gray-50 w-full max-w-md p-8 space-y-3 rounded-xl dark:bg-gray-900 dark:text-gray-100 scale-in-center"
				onClick={e => e.stopPropagation()}
			>
				<h1 className="text-2xl font-bold text-center">修改标题</h1>
				<section className="space-y-6 ng-untouched ng-pristine ng-valid">
					<div className="space-y-1 text-sm">
						<label htmlFor="username" className="block dark:text-gray-400"></label>
						<input
							type="text"
							name="username"
							placeholder="请输入新标题名"
							className="w-full px-4 py-3 rounded-md border border-gray-700 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-emerald-400"
							value={chatTitle}
							onChange={e => setChatTitle(e.target.value)}
						/>
					</div>
					<button
						className="bg-emerald-400 rounded-lg block w-full p-3 text-center dark:text-gray-900 dark:bg-emerald-400"
						onClick={submit}
					>提 交</button>
				</section>
			</div>
		</div>
	)
}

export default EditBox