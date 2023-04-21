import { FC, useState, createContext,useEffect, useRef } from 'react'
import { nanoid } from 'nanoid'

import request from './utils/request'
import getCurrentDate from './utils/getCurrentDate'
import useTheme from './hooks/useTheme'

import TopBar from './components/TopBar'
import Content, { IMessage } from './components/Content'
import SendInput from './components/SendInput'
import Footer from './components/Footer'
import ChatTitle from './components/ChatTitle'


import {
  outContainer
} from "./style"



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
  const [msg, setMsg] = useState<IMessage[]>(JSON.parse(localStorage.getItem('message') || "[]"))
  const contentRef = useRef<HTMLDivElement>(null)
  const cRef = useRef<{scrollBottm: () => void}>(null)

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

  const scrollButtm = () => {
    cRef.current?.scrollBottm()
  }

  const handleAdd = () => {
    setShowTopic(showTopic => !showTopic)
  }

  const setStroage = (data: IMessage): IMessage[] => {
    const sMess = JSON.parse(localStorage.getItem('message') || "[]")
    const message = [...sMess, data]
    localStorage.setItem('message', JSON.stringify(message))

    return message
  }

  const onSubmit = async (value: string) => {

    setTyper(true)
    setLoading(true)
    setMsg(setStroage({key: nanoid(),role: 'user',date: getCurrentDate(),message: value}))

    try {

      const session: string = localStorage.getItem('session') || '';

      let result = await request({
        message: value, 
        sessionId:  session
      })

      if (result.sessionId) {
        localStorage.setItem('session', result.sessionId)
      }

      setMsg(setStroage({
        key: nanoid(),
        role: 'assistant',
        date: getCurrentDate(),
        message: result.message
      }))
    }
    catch (error){
      setMsg(setStroage({
        key: nanoid(),
        role: 'error',
        date: getCurrentDate(),
        message: (error as Error).message
      }))
      setTyper(false)
    }
  }

  return (
    <Context.Provider value={{typer, loading, showTopic, theme, changeTheme, setTyper, setLoading}}>
      <div style={{height: innerHeight}} className={`outer ${showTopic ? 'outer-translateX' : ''}`}>
        <div style={{height: '100vh', width: "100vw", display: "flex"}} className={outContainer}>
          <div style={{width: "270px"}} className="hidden sm:block">
            <ChatTitle />
          </div>
          <div style={{flex: 1}} className="">
            {/* top：46px */}
            <TopBar onAdd={handleAdd}/>

            {/* main */}
            <div style={{height: contentDivHeight}} className="bg-gray-100 dark:bg-gray-700 px-2 lg:px-12 md:px-6">
              <div
                ref={contentRef}
                className="flex flex-col pb-4 relative h-full"
              >
                <Content cRef={cRef} dialog={msg}/>
                <SendInput loading={loading} onSubmit={onSubmit} />
              </div>
            </div>

            {/* footer：36px */}
            <Footer />
          </div>
        </div>

        <div style={{width: "300px"}}>
          <ChatTitle />
        </div>
      </div>
    </Context.Provider>
  )
}

export default App
