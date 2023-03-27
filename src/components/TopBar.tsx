import { FC } from 'react'
import './content.css'

const TopBar: FC = () => {
	return (
		<div style={{height: "42px"}} className="bg-dark d-flex text-white align-items-center">
			<div className="container d-flex justify-content-between fw-bold top-text">
				<div>
					<i className="bi bi-columns-gap"></i>
					<span className="ms-2 text-nowrap">聊天助手</span>
				</div>
				<div className="nav-item dropdown">
					<a className="nav-link text-white" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
						<i className="bi bi-people-fill me-2"></i>
						开发者
					</a>
					<ul className="dropdown-menu">
						<li>
							<a className="dropdown-item" target="_blank" href="https://github.com/vernonin">
								黄琳
							</a>
						</li>
						<li><hr className="dropdown-divider" /></li>
						<li>
							<a className="dropdown-item" target="_blank" href="#">
								谢胜瑜
							</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	)
}

export default TopBar
