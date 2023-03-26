import { FC, useState, createContext,useEffect, useRef } from 'react'
import { nanoid } from 'nanoid'

import request from './utils/request'
import getCurrentDate from './utils/getCurrentDate'

import TopBar from './components/TopBar'
import Content, { IMessage } from './components/Content'
import SendInput from './components/SendInput'

export const Context = createContext<{
  typer: boolean,
  loading: boolean,
  setTyper: (status: boolean) => void
  setLoading: (status: boolean) => void
} | null>(null)


const App: FC = () => {
  const [contentDivHeight, setContentDivHeight] = useState('300px')
  const [typer, setTyper] = useState(false)
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState<IMessage[]>(JSON.parse(localStorage.getItem('message') || "[]"))
  const contentRef = useRef<HTMLDivElement>(null)
  const cRef = useRef<{scrollBottm: () => void}>(null)

  useEffect(() => {
    cRef.current?.scrollBottm()
  }, [])

  useEffect(() => {
    const dValue = window.innerWidth > 576 ? 40 : 120
    if (contentRef.current) {
      setContentDivHeight(`${contentRef.current.clientHeight - dValue}px`)
    }
  }, [])


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
      <div className="vh-100 d-flex flex-column fixed-top">
        <TopBar />
        <div style={{flex: '1', backgroundColor: '#EEE'}} className="d-flex flex-column">
          <div ref={contentRef} style={{flex: '1'}} className="container border">
            <Content cRef={cRef} height={contentDivHeight} dialog={msg}/>
            <SendInput loading={loading} onSubmit={onSubmit} />
          </div>
          <div className="text-center text-muted footer">
            Copyright &copy;
          </div>
        </div>
      </div>
    </Context.Provider>
  )
}

export default App
