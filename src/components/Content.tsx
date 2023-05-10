import {
	forwardRef,
	ForwardRefRenderFunction,
	useImperativeHandle,
	useRef,
	useState
} from 'react'

import ChatItem from './ChatItem'

// import './content.css'
import '../style/style.css'
import Readme from './Readme'

export interface IMessage {
	key: string
	role: 'assistant' | 'user' | 'error'
	date: string
	message: string
}

interface ContentProps {
	cRef: any
	smooth: boolean
	dialog: IMessage[]
}

type cRef = null

let timer: NodeJS.Timeout | null = null


const Content: ForwardRefRenderFunction<cRef, ContentProps> = ({ dialog, smooth, cRef }, ref) => {
	const [showScroll, setShowScroll] = useState(false)
	const divRef = useRef<HTMLDivElement>(null)

	const scrollBottm = () => {
		if (divRef.current) {
			divRef.current.scrollTop = divRef.current.scrollHeight
		}
	}

	const onScroll = () => {
		setShowScroll(true)

		if (timer) {
			clearTimeout(timer as NodeJS.Timeout)
		}

		timer = setTimeout(() => {
			setShowScroll(false)

		}, 1500)
	}

	useImperativeHandle(cRef, () => ({
		scrollBottm: () => {
			scrollBottm()
		}
	}))

	return (
		<div
			ref={divRef}
			style={smooth ? {scrollBehavior: "smooth"} : {}}
			className={`flex-1 relative content-h overflow-auto pb-2 ${showScroll ? 'scroll-show' : 'scroll-hide'}`}
			onScroll={onScroll}
		>
			{
				dialog.length > 0 && dialog.map((d, i) => (
					<ChatItem
						key={d.key}
						role={d.role}
						date={d.date}
						content={d.message}
						isLastEle={i === dialog.length - 1 ? true : false}
					/>
				))
			}
			{
				dialog.length === 0 && <Readme />
			}
		</div>
	)
}

export default forwardRef(Content)
