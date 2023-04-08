import { FC } from 'react'

import { footer } from '../style'

const Footer: FC = () => {
	return (
		<div
			style={{height: "36px", lineHeight: "36px"}}
			className={footer}
		>
			&copy;&nbsp;广州万笙科技有限公司 | gpt-3.5-turbo-0301
		</div>
	)
}

export default Footer
