import { FC, createContext, useEffect, useRef, useState } from "react"

import { useLiveQuery } from "dexie-react-hooks"
import { nanoid } from "nanoid"

import useSize from "../hooks/useSize"
import useTheme from "../hooks/useTheme"
import { IChat, db } from "../utils/db"
import getCurrentDate from "../utils/getCurrentDate"
import getUUID from "../utils/getUUID"
import { createSource } from "../utils/request"

import ChatTitle from "../components/ChatTitle"
import Content, { IMessage } from "../components/Content"
import Footer from "../components/Footer"
import Notification from "../components/Notification"
import SendInput from "../components/SendInput"
import TopBar from "../components/TopBar"

import { ToastContainer } from "react-toastify"
import EditBox from "../components/EditBox"
import { outerLayer } from "../style"
import "../style/style.css"


export const Context = createContext<{
  loading: boolean
  showTopic: boolean
  theme: "light" | "dark"
  changeTheme: () => void
  setLoading: (status: boolean) => void
} | null>(null)


const ChatMain: FC = () => {
	const size = useSize()
  const [theme, changeTheme] = useTheme()

	const chatList = useLiveQuery(
		async () => await db.friends.toArray()
	)


	const contentRef = useRef<HTMLDivElement>(null)
	const cRef = useRef<{ scrollBottm: () => void }>(null)


	// 请求数据加载状态
	const [loading, setLoading] = useState(false)

	// 移动端下是否显示聊天标题
  const [showTopic, setShowTopic] = useState(false)

	// 当前聊天记录
	const [messages, setMessages] = useState<IMessage[]>([])

	// 滚动是否有滑动效果
  const [scrollSmooth, setScrollSmooth] = useState(false)

  // 删除弹框显示隐藏
  const [openConfirm, setOpenConfirm] = useState(false)

  // 编辑弹框显示隐藏
  const [openEditBox, setOpenEditBox] = useState(false)

  const [deleteState, setDeleteState] = useState<{id: number, isActive: boolean}>({
		id: 0,
		isActive: false
	})


	useEffect(() => {
    initMessage()
    cRef.current?.scrollBottm()
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

  const newChat = () => {
    setShowTopic(false)
    setMessages([])
  }

  const editChat = (id: number) => {
    setOpenEditBox(true)

    setDeleteState({id, isActive: false})
  }

  const editChatSubmit = async (title: string) => {
    const current = chatList?.find(v => v.id === deleteState.id)

    await db.friends.update(current?.id as number, {...current, title})

    setOpenEditBox(false)
  }

  const deleteChat = (id: number, isActive: boolean) => {
		setOpenConfirm(true)

		setDeleteState({id, isActive})
	}

  /**
   * 删除聊天项
   */
  const confirm = async () => {
		const {id, isActive} = deleteState
		await db.friends.delete(id)

		if (isActive) {
			setMessages([])
      setShowTopic(false)
		}
		setOpenConfirm(false)
	}

	/**
   * 切换聊天项
   * @id 聊天项ID
   */
	const changeActive = async (id: number) => {
		setScrollSmooth(false)

    chatList?.forEach(async (v) => {
      if (v.id === id) {
        setMessages(v.content)
        return await db.friends.update(id, {...v, isActive: true})
      }

      await db.friends.update(v.id as number, {...v, isActive: false})
    })

    setShowTopic(false)
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

    if (value.trim() === "") return

    setMessages(msg => {
      const lastIndex = msg.length - 1

      if (msg[lastIndex].role !== "assistant") {

        const newMsg: IMessage[] = [...msg, {
          key: nanoid(),
          role: "assistant",
          date: getCurrentDate(),
          message: value
        }]

        updateChat(newMsg)
        return newMsg
      }

      msg[lastIndex].message = value
      updateChat([...msg])
      return [...msg]
    })

    cRef.current?.scrollBottm()
  }


	/**
	 * 用户输入回车
	 * @value 输入的值
	 */
	const onSubmit = async (value: string) => {
		setLoading(true)
    setScrollSmooth(true)
    
    const uid = getUUID()
    const length = messages.length
    const newMsg: IMessage[] = [...messages, {
      key: nanoid(),
      role: "user",
      date: getCurrentDate(),
      message: value
    }]

    setMessages(newMsg)

    if (length < 1) {
      addChat({ sessionId: uid, title: value.slice(0, 20), isActive: true, content: newMsg })
    } else {
      updateChat(newMsg)
    }

    try {
      await createSource({
        message: encodeURIComponent(value),
        callBack: receiveData,
        sessionId: getCurrSessionId() || uid,
      })
    }
    catch (error) {
      setMessages(msg => [...msg, {
        key: nanoid(),
        role: "error",
        date: getCurrentDate(),
        message: "连接失败，请重试！"
      }])
    }

    setLoading(false)
	}

  const chatMainWidth = size.width < 640 ? size.width : size.width - 280


	return (
    <Context.Provider value={{
      loading, showTopic, theme,
      changeTheme, setLoading
    }}>
      <section className={outerLayer}>
        <main style={{height: size.height + "px"}} className={`over-layer ${showTopic ? "outer-translateX" : ""}`}>

          {/* 主要聊天，移动端下会往左移 */}
          <div className={`over-main flex`}>
            <aside className="hidden sm:block">
              <ChatTitle onNew={newChat} onEdit={editChat} onDelete={deleteChat} onChangeActive={changeActive} />
            </aside>
            <section style={{maxWidth: "100vw", width: chatMainWidth + "px"}} className="relative bottom-0 left-0">
              <TopBar onAdd={() => setShowTopic(showTopic => !showTopic)} />

              {/* 主聊天框 */}
              <div
                style={{ height: `${size.height - 82}px` }}
                className={`dark:bg-slate-800 px-2 lg:px-12 md:px-6 ${showTopic ? "opacity-50" : ""}`}
                onClick={() => setShowTopic(false)}
              >
                <div
                  ref={contentRef}
                  className="flex flex-col pb-4 relative h-full"
                >
                  <Content cRef={cRef} smooth={scrollSmooth} dialog={messages} />
                  <SendInput loading={loading} onSubmit={onSubmit} />
                </div>
              </div>

              <Footer />
            </section>
          </div>

          {/* 移动端可见 */}
          <div className="block sm:hidden">
            <ChatTitle onNew={newChat} onEdit={editChat} onDelete={deleteChat} onChangeActive={changeActive} />
          </div>
        </main>

        <Notification
          visible={openConfirm}
          onCancel={() => setOpenConfirm(false)}
          onConfirm={confirm}
        />

        <EditBox
          visible={openEditBox}
          onCancel={() => setOpenEditBox(false)}
          onSubmit={editChatSubmit}
        />

        {/* Empty message toast */}
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          draggable
          pauseOnHover
          theme={theme}
        />
      </section>
    </Context.Provider>
	)
}

export default ChatMain
