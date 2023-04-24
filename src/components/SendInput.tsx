import { FC, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'

import Send from '../icon/Send'
import ArrowPath from '../icon/ArrowPath'

import 'react-toastify/dist/ReactToastify.css'
import { input } from '../style'

interface SendInputProps {
  loading: boolean
  onSubmit: (value: string) => void 
}

const SendInput: FC<SendInputProps> = ({ loading, onSubmit }) => {
  const [value, setValue] = useState<string>("")

  const emitClick = () => {
    if(value.trim() === "") return toast("请输入您要提问的问题？")
    
    onSubmit(value.trim())
    setValue("")
  }

	return (
		<>
      <div style={{height: "40px"}} className="w-full relative">
        <input
          disabled={loading}
          value={value}
          placeholder="请输入你的内容~"
          className={input}
          onChange={event => setValue(event.target.value)}
          onKeyUp={e => {
            if (e.key === "Enter") emitClick()
          }}
        />
        {
          loading ? <ArrowPath /> : <Send click={emitClick} /> 
        }
      </div>

      {/* Empty message toast */}
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
	)
}

export default SendInput
