import { FC,useEffect,useRef } from 'react'
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

	const lastEleRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		let timer = setTimeout(() => {
			isLastEle && lastEleRef.current?.scrollIntoView()
		}, 0)

		return () => {
			clearTimeout(timer)
			isLastEle && lastEleRef.current?.scrollIntoView()
		}
	}, [])


	return (
		<div ref={isLastEle ? lastEleRef : null} className={`flex mt-2 chat-item ${role === 'user' ? 'flex-row-reverse' : ''}`}>
			<img style={style} className="rounded-lg" src={role === 'user' ? '/user.png' : '/gpt.png'} />
			<div className={role === 'user' ? 'me-2 text-right' : 'ms-2'}>
				<p
					style={{fontSize: '12px'}}
					className={`lh-sm mb-1 text-sm ${role === 'user' ? 'text-end' : ''}`}
				>{ date }</p>
				<div
					style={{display: 'inline-block'}}
					className={`lh-sm border rounded-lg p-2
						${role === 'user' ? 'bg-blue-100' : role === 'error' ? 'bg-red-100 text-red-500' : 'bg-gray-200'}`
					}
				>
					{
						role === 'user' ? content : <MarkDown content={content}/>
					}
				</div>
			</div>
		</div>
	)
}

export default LeftChat
