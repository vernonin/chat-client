import {FC, useState, useEffect, useContext} from 'react'
import ReactMarkdown from 'react-markdown'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
// import meatch from 'react-syntax-highlighter/dist/esm/styles/prism'
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';

// 打字效果
import EasyTyper from 'easy-typer-js'
import { Context } from '../App'

interface MarkDownProps {
	content: string
}

const MarkDown: FC<MarkDownProps> = ({ content }) => {
	const [message, setMessage] = useState('')
	const context = useContext(Context)

	let typer: any = null

	const initTyper = () => {
    typer = new EasyTyper({
			output: '',
			isEnd: false,
			speed: context?.typer ? 80 : 0,
			singleBack: false,
			sleep: 0,
			type: 'normal',
			backSpeed: 40,
			sentencePause: false
		}, content, () => {
			context?.setTyper(false)
			context?.setLoading(false)
		}, (output: string) => {
			setMessage(output)
		})
	}

	useEffect(() =>{
		initTyper()

		return () => {
			typer.close()
		}
	}, [])

	return (
		<ReactMarkdown
			children={message}
			components={{
				code({node, inline, className, children, ...props}) {
					const match = /language-(\w+)/.exec(className || '')
					return !inline && match ? (
						<SyntaxHighlighter
							children={String(children).replace(/\n$/, '')}
							style={dark}
							language={match[1]}
							PreTag="p"
							{...props}
						/>
					) : (
						<code className={className} {...props}>
							{children}
						</code>
					)
				}
			}}
		/>
	)
}

export default MarkDown
