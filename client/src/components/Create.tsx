import { useState } from "react"
import BACKEND_URI from "../config/uriConfig"
import { useSetRecoilState } from "recoil"
import modalview from "../recoil/atoms/modalView"
import todoview from "../recoil/atoms/todoView"


const CreateView= () => {
    const setModalView = useSetRecoilState(modalview)
    const setTodoView = useSetRecoilState(todoview)

    interface Todo {
        name: string,
        detail: string,
        checkbox: boolean
    }

    const [message,setMessage] = useState<any | string>(null)

    const [newTodo, setNewTodo] = useState<Todo>({
        name: "",
        detail: "",
        checkbox: false
    })

    const token:string |null = localStorage.getItem("token")
   async function AddTodo(){
const response = await fetch(`${BACKEND_URI}/todos/add`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(newTodo),
    
    })
    const data = await response.json()
    setMessage(data.msg)
    setModalView(false)
    setTodoView(true)
    }
    

    return(
        <div className="flex flex-col items-center">
           
               <textarea value={newTodo.name} onChange={(e)=> setNewTodo((prev)=> ({...prev, name: e.target.value}))} className="w-full mt-5 h-20  px-5 outline-none overflow-auto placeholder-gray-400" placeholder="Title"/>
             
            
            <textarea onChange={(e)=> setNewTodo((prev)=> ({...prev, detail: e.target.value}))} value={newTodo.detail} className="w-full h-60 mt-5 px-5 outline-none overflow-auto  placeholder-gray-400" placeholder="Description"/>
                <div className="flex items-center my-5">
            <input  type="checkbox" checked={newTodo.checkbox} onChange={(e) => setNewTodo((prev) => ({...prev, checkbox: e.target.checked}))} className="mr-5 size-10"/>
            <div>{message}</div>
            <button onClick={AddTodo} className="w-20 h-10 border-2 border-gray-600"> Submit </button>
            </div>
        </div>
    )
}

export default CreateView