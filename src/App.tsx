import { FC, useState, createContext,useEffect, useRef } from 'react'
import { nanoid } from 'nanoid'

import request from './utils/request'
import getCurrentDate from './utils/getCurrentDate'

import TopBar from './components/TopBar'
import Content, { IMessage } from './components/Content'
import SendInput from './components/SendInput'
import Footer from './components/Footer'

export const Context = createContext<{
  typer: boolean,
  loading: boolean,
  setTyper: (status: boolean) => void
  setLoading: (status: boolean) => void
} | null>(null)


const App: FC = () => {
  const [contentDivHeight, setContentDivHeight] = useState('500px')
  const [typer, setTyper] = useState(false)
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState<IMessage[]>(JSON.parse(localStorage.getItem('message') || "[]"))
  const contentRef = useRef<HTMLDivElement>(null)
  const cRef = useRef<{scrollBottm: () => void}>(null)

  useEffect(() => {
    cRef.current?.scrollBottm()
  }, [])

  useEffect(() => {
    // 获取浏览器总高度，在减去头部（42px）和底部（36px）的区域
    const innerHeight = window.innerHeight

    if (contentRef.current) {
      setContentDivHeight(`${innerHeight - 78}px`)
    }
  }, [])

  const scrollButtm = () => {
    cRef.current?.scrollBottm()
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
    <Context.Provider value={{typer, loading, setTyper, setLoading}}>
      <div className="vh-100 fixed-top">

        {/* Top nav */}
        <TopBar />

        {/* content */}
        <div style={{height: contentDivHeight}}
          className="bg-info bg-opacity-10 overflow-hidden"
        >
          <div
            ref={contentRef}
            style={{height: "100%", position: "relative"}}
            className="container border d-flex flex-column pb-2"
          >
            <Content cRef={cRef} dialog={msg}/>
            <SendInput loading={loading} onSubmit={onSubmit} />
            <span onClick={scrollButtm}>
              <i className="bi bi-arrow-down-circle-fill text-primary down-icon"></i>
            </span>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </Context.Provider>
  )
}

export default App

/**
 * heder: 42px
 * footer: 36px
 * inputSearch: 40px
 * 
 * total: 112px
 */