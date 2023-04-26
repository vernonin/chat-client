import { FC, useContext } from 'react'
import Moon from '../icon/Moon'
import Sun from '../icon/Sun'
import Add from '../icon/Add'

import { topBar } from '../style'
import { Context } from '../App'

import '../style/style.css'
import Logo from '../icon/Logo'


interface TopBarProps {
	onAdd: () => void
}

const TopBar: FC<TopBarProps> = ({ onAdd }) => {

	const context = useContext(Context)

	return (
		<div style={{height: "46px"}} className={topBar}>
			<div className="hidden sm:block">
				{/* 打算做广告展示区 */}
			</div>
			<div className="sm:hidden flex items-center">
				{/* <Logo /> */}
				<img style={{height: "18px", width: "18px"}} src="/ai.png" alt="" />
				<span className="ml-2 tracking-widest">聊天助手</span>
			</div>
			<div className="flex">
				<div className="switch-theme" onClick={context?.changeTheme}>
					{
						context?.theme === 'light'
						? <Moon /> 
						: <Sun />
					}
				</div>
				<span className={`transition-all mr-2 duration-300 sm:hidden ${context?.showTopic ? 'rotate-45' : ''}`} onClick={onAdd}>
					<Add />
				</span>
			</div>
		</div>
	)
}

export default TopBar
