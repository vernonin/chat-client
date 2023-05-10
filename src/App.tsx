import { useLiveQuery } from "dexie-react-hooks";
import { nanoid } from 'nanoid';
import { FC, createContext, useEffect, useRef, useState } from 'react';

import useTheme from './hooks/useTheme';
import { db } from './utils/db';
import getCurrentDate from './utils/getCurrentDate';
import getUUID from './utils/getUUID';
import { createSource } from './utils/request';

import ChatTitle from './components/ChatTitle';
import Content, { IMessage } from './components/Content';
import Footer from './components/Footer';
import SendInput from './components/SendInput';
import TopBar from './components/TopBar';

import { outContainer } from "./style";


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

  // 当前聊天记录
  const [messages, setMessages] = useState<IMessage[]>([])

  // 移动端下是否显示聊天标题
  const [showTopic, setShowTopic] = useState(false)


  const chatList = useLiveQuery(
		async () => await db.friends.toArray()
	)


  useEffect(() => {
    initMessage()
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

  /**
   * 初始化聊天记录
   */
  const initMessage = async () => {
    const chatList =  await db.friends.toArray()

    const current = chatList.find(v => v.isActive)

    if (current) {
      setMessages(current.content)
    }
  }

  /**
   * 切换聊天项
   * @id 聊天项ID
   */
  const changeActive = async (id: number) => {
    chatList?.forEach(async (v) => {
      if (v.id === id) {
        setMessages(v.content)
        return await db.friends.update(id, {...v, isActive: true})
      }

      await db.friends.update(v.id as number, {...v, isActive: false})
    })
  }

  
  const getCurrSessionId = (): string | undefined => {
    const current = chatList?.find(v => v.isActive)

    return current?.sessionId
  }

  /**
   * @IChat 聊天项
   * @isNew 是否是新聊天
   */
  const addChat = async (chat: IChat) => {
    await db.friends.add(chat)
  }

  /**
   * content对话内容
   */
  const updateChat = async (content: IMessage[]) => {
    const current = (await db.friends.toArray()).find(v => v.isActive)
    if (current) {
      await db.friends.update(current?.id as number, {...current, content})
    }
  }

  /**
   * 接口返回数据，将数据展示
   * @value 服务器返回值
   */
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

        updateChat(newMsg)
        return newMsg
      }

      msg[lastIndex].message = message
      updateChat([...msg])
      return [...msg]
    })

    cRef.current?.scrollBottm()
  }


  /**
   * 用户按下回车键，发送消息
   * @value 输入值
   */
  const onSubmit = async (value: string) => {

    setLoading(true)
    
    const uid = getUUID()
    const length = messages.length
    const newMsg: IMessage[] = [...messages, {
      key: nanoid(),
      role: 'user',
      date: getCurrentDate(),
      message: value
    }]

    setMessages(newMsg)

    if (length < 1) {
      addChat({ sessionId: uid, title: value, isActive: true, content: newMsg })
    } else {
      updateChat(newMsg)
    }

    try {
      await createSource({
        message: value,
        callBack: receiveData,
        sessionId: getCurrSessionId() || uid,
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
      loading, showTopic, theme, innerHeight,
      changeTheme, setLoading
    }}>
      <div style={{ height: innerHeight }} className={`outer fixed ${showTopic ? 'outer-translateX' : ''}`}>

        {/* 主体 */}
        <div className={outContainer}>
          <div style={{ width: "270px" }} className="hidden sm:block">
            <ChatTitle onNew={() => setMessages([])} onChangeActive={changeActive} />
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
          <ChatTitle onNew={() => setMessages([])} onChangeActive={changeActive} />
        </div>
      </div>
    </Context.Provider>
  )
}

export default App
