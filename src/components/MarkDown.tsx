import React, { FC, useContext, useState } from 'react';
import { CopyToClipboard } from "react-copy-to-clipboard";
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula, duotoneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';

// 打字效果
import { Context } from '../App';
import Copy from '../icon/Copy';



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
				children={String(children).replace(/\n$/, '')}
				style={context?.theme === 'dark' ? dracula : duotoneLight}
				language={match[1]}
				PreTag="div"
				showLineNumbers={true}
			/>
		</div>
	)
}





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
			components={{
				code({ node, inline, className, children, ...props }) {
					const match = /language-(\w+)/.exec(className || '')

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
