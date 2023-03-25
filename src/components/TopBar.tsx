import { FC } from 'react'
import './content.css'

const TopBar: FC = () => {
	return (
		<div className="bg-dark d-flex align-items-center pt-2 pb-2">
			<div className="container d-flex text-white fw-bold top-text">
				<i className="bi bi-columns-gap"></i>
				<span className="ms-2 text-nowrap">WECOLE TO CHAT ASSISTANT</span>
			</div>
		</div>
	)
}

export default TopBar
