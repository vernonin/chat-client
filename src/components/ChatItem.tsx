import { FC, useContext, useEffect, useRef } from 'react'
import { Context } from '../App'
import MarkDown from './MarkDown'

/**
 * @assistant 助理角色，聊天在左边
 * @user      用户角色，聊天在右边
 */
interface LeftChatProps {
	role: 'assistant' | 'user' | 'error'
	date: string
	content: string
	isLastEle: boolean
}

const style = {
	width: '36px',
	height: '36px'
}

const LeftChat: FC<LeftChatProps> = ({
	role,
	date,
	content,
	isLastEle
}) => {

	const context = useContext(Context)
	const lastEleRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const timer = setTimeout(() => {
			isLastEle && lastEleRef.current?.scrollIntoView()
		}, 0)

		return () => {
			clearTimeout(timer)
			isLastEle && lastEleRef.current?.scrollIntoView()
		}
	}, [])


	return (
		<div
			style={{ fontSize: '0.94rem' }}
			ref={isLastEle ? lastEleRef : null}
			className={`flex overflow-x-scroll mt-2 chat-item dark:text-gray-100 ${role === 'user' ? 'flex-row-reverse' : ''}`}
		>
			<img style={style} className="rounded-lg transform translate-y-2" src={role === 'user' ? '/user.png' : '/gpt.png'} />
			<div className={role === 'user' ? 'me-2 text-right' : 'ms-2'}>
				<p
					className={`lh-sm mb-1 text-xs ${role === 'user' ? 'text-end' : ''}`}
				>{date}</p>
				<div
					style={{ display: 'inline-block' }}
					className={`
						lh-sm border dark:border-gray-500 rounded-lg py-1.5 px-2.5
						${context?.loading && isLastEle ? 'typing' : ''} 
						${role === 'user' ? 'bg-blue-100 dark:bg-gray-400 mml-40' : role === 'error' ? 'bg-red-100 text-red-500 mmr-40' : 'bg-gray-200 dark:bg-gray-600 sdafsd mmr-40'}
					`}
				>
					{
						role === 'user' ? content : <MarkDown content={content} />
					}
				</div>
			</div>
		</div>
	)
}

export default LeftChat
