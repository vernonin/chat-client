import { FC } from 'react'
import Moon from '../icon/Moon'
import Sun from '../icon/Sun'

import { topBar } from '../style'
import '../style/style.css'

const TopBar: FC = () => {
	return (
		<div style={{height: "46px"}} className={topBar}>
			<div>
				{/* 打算做广告展示区 */}
			</div>
			<div>
				<div className="switch-theme">
					<Moon />
				</div>
			</div>
		</div>
	)
}

export default TopBar
