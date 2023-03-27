import { FC, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import './content.css'
interface SendInputProps {
  loading: boolean
  onSubmit: (value: string) => void 
}

const SendInput: FC<SendInputProps> = ({ loading, onSubmit }) => {
  const [value, setValue] = useState<string>("")

  const emitClick = () => {
    if(value.trim() === "") return toast("难道你就没有什么事吗？")
    
    onSubmit(value.trim())
    setValue("")
  }

	return (
		<div style={{ height: "40px" }} className="mx-auto w-100">
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
      <div className="d-flex" role="search">
        <input
          disabled={loading}
          type="text"
          value={value}
          aria-label="Search"
          placeholder="来都来了，说点什么吧~"
          className="form-control form-control-sm"
          onChange={event => setValue(event.target.value)}
          onKeyUp={e => {
            if (e.key === "Enter") emitClick()
          }}
        />
        {
          loading
          ? (
            <button className="btn btn-primary ms-2 text-nowrap" type="button" disabled>
              <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
              <span className="ms-2">请稍等</span>
            </button>
          )
          :
          (
            <button
              className="btn ms-2 d-flex text-nowrap btn-primary w-300"
              onClick={emitClick}
              disabled={loading}
            >
              <i className="bi bi-send"></i>
              <span className="ms-2 send-text">发送</span>
            </button>
          )
        }
       
      </div>
    </div>
	)
}

export default SendInput
