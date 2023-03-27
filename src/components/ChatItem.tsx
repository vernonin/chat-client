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
		<div ref={isLastEle ? lastEleRef : null} className={`d-flex mt-2 ${role === 'user' ? 'flex-row-reverse' : ''}`}>
			<img style={style} className='rounded' src={role === 'user' ? '/ikun.jpg' : '/gpt.png'} />
			<div className={role === 'user' ? 'me-2' : 'ms-2'}>
				<p
					style={{fontSize: '12px'}}
					className={`lh-sm mb-1 text-muted ${role === 'user' ? 'text-end' : ''}`}
				>{ date }</p>
				<div
					style={{display: 'inline-block'}}
					className={`lh-sm border p-2 bg-opacity-10 rounded 
						${role === 'user' ? 'bg-info' : role === 'error' ? 'bg-danger text-danger' : 'bg-dark'}`
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
