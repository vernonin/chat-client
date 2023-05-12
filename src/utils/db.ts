import Dexie, { Table } from "dexie"
import { IMessage } from "../components/Content"

export interface IChat {
	id?: number
  sessionId: string
  title: string
  isActive: boolean
  content: IMessage[]
}

export class MySubClassedDexie extends Dexie {
  friends!: Table<IChat>; 

  constructor() {
    super("chat");
    this.version(1).stores({
      friends: "++id, sessionId, title, isActive, content"
    })
  }
}

export const db = new MySubClassedDexie()
