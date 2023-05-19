import React, { FC, useContext, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula, duotoneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
// import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";


// 打字效果
import Copy from "../icon/Copy";
import { Context } from "../page/ChatMain";



const CodeBlock = ({ children, match }: {
	children: React.ReactNode & React.ReactNode[]
	match: RegExpExecArray
}) => {

	const context = useContext(Context)
	const [copied, setCopied] = useState(false);

	const handleCopy = () => {
		setCopied(true);
		setTimeout(() => {
			setCopied(false);
		}, 1500);
	};

	return (
		<div className="code-block">
			<CopyToClipboard text={String(children)} onCopy={handleCopy}>
				<button className="copy-button">
					{copied ? "Copied!" : <Copy />}
				</button>
			</CopyToClipboard>
			<SyntaxHighlighter
				// eslint-disable-next-line react/no-children-prop
				children={String(children).replace(/\n$/, "")}
				style={context?.theme === "dark" ? dracula : duotoneLight}
				language={match[1]}
				PreTag="div"
				showLineNumbers={true}
			/>
		</div>
	)
}


const str = `
**动机**

前段时间，ChatGPT特别火热，推出仅两个月，月活跃用户就破亿。掀起了AI热潮，紧随其后，各种AI层出不穷，如：文心一言、New Bing、Notion AI等等。在ChatGPT推出不久后OpenAI宣布开放API接口，也就是ChatGPT可以集成到自己产品中。

虽然，GPT-3完全免费，但是由于国内的无法使用，导致了许多人还没有去接触它（排除开发者）。刚好OpenAI API也开放了，就想着自己做一个，供我们使用，并且我觉得做C端产品也觉得挺有成就感的。当然，也有许多开发者对接OpenAI API并也上线试用了。


**关于**

这个聊天助手使用的是gpt-3.5-turbo模型。虽然gpt-3.5-turbo模型是收费的，好运的是价格很便宜。购买服务器也需要成本，但我们是完全免费试用的。希望它能帮助到你。
`


interface MarkDownProps {
	content: string
}

const MarkDown: FC<MarkDownProps> = ({ content }) => {

	return (
		<ReactMarkdown
			// eslint-disable-next-line react/no-children-prop
			children={content}
			skipHtml={true}
			remarkPlugins={[remarkGfm]}
			// rehypePlugins={[rehypeRaw]}
			components={{
				code({ node, inline, className, children, ...props }) {
					const match = /language-(\w+)/.exec(className || "")

					return !inline && match
						?
						<CodeBlock
							// eslint-disable-next-line react/no-children-prop
							children={children}
							match={match}
						/>
						:
						<code className={className} {...props}>
							{children}
						</code>
				}
			}}
		/>
	)
}

export default MarkDown
