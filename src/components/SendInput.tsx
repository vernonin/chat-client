import { FC, useEffect, useRef, useState } from "react"
import { toast } from "react-toastify"

import ArrowPath from "../icon/ArrowPath"
import Send from "../icon/Send"

import "react-toastify/dist/ReactToastify.css"
import { input } from "../style"

interface SendInputProps {
  loading: boolean
  onSubmit: (value: string) => void
}

const SendInput: FC<SendInputProps> = ({ loading, onSubmit }) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [value, setValue] = useState<string>("")

  const emitClick = () => {
    if (value.trim() === "") return toast("请输入您要提问的问题？")

    onSubmit(value.trim())
    setValue("")
  }

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  return (
    <>
      <div style={{ height: "40px" }} className="w-full relative">
        <input
          ref={inputRef}
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
    </>
  )
}

export default SendInput
