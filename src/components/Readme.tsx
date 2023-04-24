import { FC } from "react";

const skillList = [
	{ key: "1", title: "答题解惑", content: "可以回答各种问题，包括科学、历史、文化、语言等。" },
	{ key: "2", title: "翻译服务", content: "可以翻译英语、中文、法语、德语、西班牙语等多种语言之间的文本。" },
	{ key: "3", title: "文本编辑", content: "可以校对、修改、润色你的文章、简历、邮件等内容。" },
	{ key: "4", title: "实用工具", content: "可以提供计算器、时钟、日历、转换器等实用工具。" },
	{ key: "5", title: "娱乐休闲", content: "可以提供笑话、谜语、诗歌、小说等内容，让你放松身心。" },
	{ key: "6", title: "其他", content: "可以在工作中、学习中、生活中都可以帮助到你。" }
]

const Readme: FC = () => {
	return (
		<div className="dark:text-gray-400 text-gray-600 overflow-hidden h-full flex flex-col justify-center px-2">
			<div className="text-center text-2xl dark:text-gray-300 mb-8">我可以帮助你在许多领域：</div>
			<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
				{
					skillList.map(s => (
						<div key={s.key} className="border rounded shadow-md p-2">
							<div className="text-lg text-center pb-1">{s.title}</div>
							<div className="text-sm text-center text-gray-500 leading-4">{s.content}</div>
						</div>
					))
				}
			</div>
		</div>
	)
}

export default Readme
