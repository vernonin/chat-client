import { nanoid } from 'nanoid'
import { FC, createContext, useEffect, useRef, useState } from 'react'

import useTheme from './hooks/useTheme'
import getCurrentDate from './utils/getCurrentDate'

import ChatTitle from './components/ChatTitle'
import Content, { IMessage } from './components/Content'
import Footer from './components/Footer'
import SendInput from './components/SendInput'
import TopBar from './components/TopBar'


import {
  outContainer
} from "./style"
import { createSource } from './utils/request'


const styleff = "color: red"

export const Context = createContext<{
  typer: boolean
  loading: boolean
  showTopic: boolean
  theme: 'light' | 'dark'
  changeTheme: () => void
  setTyper: (status: boolean) => void
  setLoading: (status: boolean) => void
} | null>(null)


const App: FC = () => {
  const [innerHeight, setInnerHeight] = useState("100vh")
  const [contentDivHeight, setContentDivHeight] = useState('500px')
  const [typer, setTyper] = useState(false)
  const [loading, setLoading] = useState(false)
  const [theme, changeTheme] = useTheme()
  // const [msg, setMsg] = useState<IMessage[]>(JSON.parse(localStorage.getItem('message') || "[]"))
  const contentRef = useRef<HTMLDivElement>(null)
  const cRef = useRef<{ scrollBottm: () => void }>(null)

  // 聊天信息
  const [messages, setMessages] = useState<IMessage[]>([])

  // 移动端下是否显示聊天标题
  const [showTopic, setShowTopic] = useState(false)


  useEffect(() => {
    cRef.current?.scrollBottm()
  }, [])

  useEffect(() => {
    // 获取浏览器总高度，在减去头部（42px）和底部（36px）的区域
    const innerHeight = window.innerHeight

    setInnerHeight(`${innerHeight}px`)

    if (contentRef.current) {
      setContentDivHeight(`${innerHeight - 82}px`)
    }
  }, [])


  const handleAdd = () => {
    setShowTopic(showTopic => !showTopic)
  }

  // const setStroage = (data: IMessage): IMessage[] => {
  //   const sMess = JSON.parse(localStorage.getItem('message') || "[]")
  //   const message = [...sMess, data]
  //   localStorage.setItem('message', JSON.stringify(message))

  //   return message
  // }


  const receiveData = (value: string) => {



    setMessages(msg => {
      const length = msg.length

      if (msg[length - 1].role !== 'assistant') {
        return [...msg, {
          key: nanoid(),
          role: 'assistant',
          date: getCurrentDate(),
          message: value
        }]
      }


      // const newMessages = [...msg]
      msg[length - 1].message = value

      return msg
    })
  }


  /// 用户输入回车
  const onSubmit = async (value: string) => {

    setLoading(true)

    setMessages(msg => [...msg, {
      key: nanoid(),
      role: 'user',
      date: getCurrentDate(),
      message: value
    }])


    try {
      await createSource({
        message: value,
        callBack: receiveData
      })
    }
    catch (error) {
      setMessages(msg => [...msg, {
        key: nanoid(),
        role: 'error',
        date: getCurrentDate(),
        message: (error as Error).message
      }])
    }

    setLoading(false)
  }

  return (
    <Context.Provider value={{ typer, loading, showTopic, theme, changeTheme, setTyper, setLoading }}>
      <div style={{ height: innerHeight }} className={`outer ${showTopic ? 'outer-translateX' : ''}`}>

        {/* 主体 */}
        <div className={outContainer}>
          <div style={{ width: "270px" }} className="hidden sm:block">
            <ChatTitle />
          </div>
          <div style={{ maxWidth: "100vw", flex: 1 }}>
            {/* top：46px */}
            <TopBar onAdd={handleAdd} />

            {/* main */}
            <div
              style={{ height: contentDivHeight }}
              className={`dark:bg-gray-700 px-2 lg:px-12 md:px-6 ${showTopic ? 'opacity-50' : ''}`}
              onClick={() => setShowTopic(false)}
            >
              <div
                ref={contentRef}
                className="flex flex-col pb-4 relative h-full"
              >
                <Content cRef={cRef} dialog={messages} />
                <SendInput loading={loading} onSubmit={onSubmit} />
              </div>
            </div>

            {/* footer：36px */}
            <Footer />
          </div>
        </div>

        {/* 移动端可见 */}
        <div style={{ width: "300px" }}>
          <ChatTitle />
        </div>
      </div>
    </Context.Provider>
  )
}

export default App
