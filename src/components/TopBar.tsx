import { FC, useContext } from 'react'
import Moon from '../icon/Moon'
import Sun from '../icon/Sun'
import Add from '../icon/Add'

import { topBar } from '../style'
import { Context } from '../App'
import '../style/style.css'

const TopBar: FC = () => {

	const context = useContext(Context)

	return (
		<div style={{height: "46px"}} className={topBar}>
			<div>
				{/* 打算做广告展示区 */}
			</div>
			<div className="flex">
				<div className="switch-theme" onClick={context?.changeTheme}>
					{
						context?.theme === 'light'
						? <Moon /> 
						: <Sun />
					}
				</div>
				<Add />
			</div>
		</div>
	)
}

export default TopBar
