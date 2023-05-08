import { nanoid } from 'nanoid'
import { FC, createContext, useEffect, useRef, useState } from 'react'

import useTheme from './hooks/useTheme'
import getCurrentDate from './utils/getCurrentDate'
import getUUID from './utils/getUUID'

import ChatTitle from './components/ChatTitle'
import Content, { IMessage } from './components/Content'
import Footer from './components/Footer'
import SendInput from './components/SendInput'
import TopBar from './components/TopBar'


import { outContainer } from "./style"
import { createSource } from './utils/request'


interface IChat {
  sessionId: string
  title: string
  isActive: boolean
  content: IMessage[]
}


export const Context = createContext<{
  loading: boolean
  showTopic: boolean
  theme: 'light' | 'dark'
  innerHeight: string
  allChats: IChat[]
  changeTheme: () => void
  setLoading: (status: boolean) => void
} | null>(null)


const App: FC = () => {
  const [innerHeight, setInnerHeight] = useState("900px")
  const [contentDivHeight, setContentDivHeight] = useState('500px')
  const [loading, setLoading] = useState(false)
  const [theme, changeTheme] = useTheme()
  const contentRef = useRef<HTMLDivElement>(null)
  const cRef = useRef<{ scrollBottm: () => void }>(null)

  // 所有聊天记录
  const [allChats, setAllChats] = useState<IChat[]>([])

  // 当前聊天记录
  const [messages, setMessages] = useState<IMessage[]>([])

  // 移动端下是否显示聊天标题
  const [showTopic, setShowTopic] = useState(false)


  useEffect(() => {
    cRef.current?.scrollBottm()
  }, [])

  useEffect(() => {
    const innerHeight = window.innerHeight
    setInnerHeight(`${innerHeight}px`)

    if (contentRef.current) {
      // 获取浏览器总高度，在减去头部（42px）和底部（36px）的区域 = 内容区域
      setContentDivHeight(`${innerHeight - 82}px`)
    }
  }, [])


  // 判断是否有当前聊天
  const chatIsCurrent = (): boolean => {
    const current = allChats.find(v => v.isActive)
    if (!current) return false

    return true
  }

  const addChat = (chat: IChat, isActive: boolean) => {
    if (isActive) {
      setAllChats(chats => {
        return [chat, ...chats]
      })
    }
    else {
      setAllChats(chats => {
        return chats.map(v => {
          if (v.isActive) {
            v.content = [...chat.content]
          }
          return v
        })
      })
    }
  }

  // 新增聊天
  const onNewChat = () => {
    setMessages([])

    setAllChats(chats => {
      return chats.map(v => {
        v.isActive = false
        return v
      })
    })
  }

  // 接口返回数据，将数据展示
  const receiveData = (value: string) => {
    const message = value.replace(/!xsy!/g, '\n')

    setMessages(msg => {
      const lastIndex = msg.length - 1

      if (msg[lastIndex].role !== 'assistant') {

        const newMsg: IMessage[] = [...msg, {
          key: nanoid(),
          role: 'assistant',
          date: getCurrentDate(),
          message: value
        }]

        addChat({
          sessionId: "",
          title: "",
          isActive: false,
          content: newMsg
        }, false)

        return newMsg
      }

      msg[lastIndex].message = message

      addChat({
        sessionId: "",
        title: "",
        isActive: false,
        content: msg
      }, false)

      return [...msg]
    })
  }


  // 用户输入回车
  const onSubmit = async (value: string) => {

    setLoading(true)

    const newMsg: IMessage[] = [...messages, {
      key: nanoid(),
      role: 'user',
      date: getCurrentDate(),
      message: value
    }]

    setMessages(newMsg)

    const uid = getUUID()

    addChat({
      sessionId: uid,
      title: value,
      isActive: true,
      content: newMsg
    }, !chatIsCurrent())

    const currentChat = allChats.find(v => v.isActive)

    try {
      await createSource({
        message: value,
        callBack: receiveData,
        sessionId: currentChat?.sessionId || uid,
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
    <Context.Provider value={{
      loading, showTopic, theme, innerHeight, allChats,
      changeTheme, setLoading
    }}>
      <div style={{ height: innerHeight }} className={`outer fixed ${showTopic ? 'outer-translateX' : ''}`}>

        {/* 主体 */}
        <div className={outContainer}>
          <div style={{ width: "270px" }} className="hidden sm:block">
            <ChatTitle onNew={onNewChat} />
          </div>
          <div style={{ maxWidth: "100vw", flex: 1 }}>
            {/* top：46px */}
            <TopBar onAdd={() => setShowTopic(showTopic => !showTopic)} />

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
          <ChatTitle onNew={onNewChat} />
        </div>
      </div>
    </Context.Provider>
  )
}

export default App
