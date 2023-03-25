import { useRef, forwardRef, useImperativeHandle, ForwardRefRenderFunction } from 'react'

import ChatItem from './ChatItem'

import './content.css'

export interface IMessage {
	key: string
	role: 'assistant' | 'user' | 'error'
	date: string
	message: string
}

interface ContentProps {
	cRef: any
	height: string
	dialog: IMessage[]
}

type cRef = null

const Content: ForwardRefRenderFunction<cRef, ContentProps> = ({ height, dialog, cRef }, ref) => {

	const divRef = useRef<HTMLDivElement>(null)

	const scrollBottm = () => {
		if (divRef.current) {
			divRef.current.scrollTop = divRef.current.scrollHeight
		}
	}

	useImperativeHandle(cRef, () => ({
		scrollBottm: () => {
			scrollBottm()
		}
	}))

	return (
		<div ref={divRef} style={{ height }} className="content-h overflow-auto">
			<p style={{height: '0.25rem'}}></p>
			{
				dialog.map((d, i) => (
					<ChatItem
						key={d.key}
						role={d.role}
						date={d.date}
						content={d.message}
						isLastEle={i === dialog.length -1 ? true : false}
					/>
				))
			}

			<p style={{height: '20px'}}></p>
		</div>
	)
}

export default forwardRef(Content)
