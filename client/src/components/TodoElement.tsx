import { useEffect, useState } from "react"
import BACKEND_URI from "../config/uriConfig"
import { useRecoilState, useSetRecoilState } from "recoil"
import todoatom from "../recoil/atoms/todoatom"
import editatom from "../recoil/atoms/editatom"
import { Link } from "react-router-dom"


const TodoViewElement = () => {

    const [todus, setTodus] = useRecoilState(todoatom)
    const setEdit = useSetRecoilState(editatom)
    const [singleTodo, setSingleTodo] = useState<any>({})
    const [showSingle, setShowSingle] = useState<boolean>(false)

    const token = localStorage.getItem("token")

    
    async function renderTodos() {
        const response = await fetch(`${BACKEND_URI}/todos/todos`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        })
        const data = await response.json()
        setTodus(data.todos)
    }
    
useEffect(() => {
  
  renderTodos();


  const interval = setInterval(() => {
    renderTodos();
  }, 10000);

    return () => clearInterval(interval);
}, []);



    async function DeleteTodo(id: any) {
        await fetch(`${BACKEND_URI}/todos/delete?id=${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })

    }

    function openSingleTodo(id: any){
        const single = todus.find((todo:any) => todo.id == id)
        setSingleTodo(single)
        setShowSingle(true)
    }

   

    async function viewCheck(value:boolean, id:any){

        const todo:any = todus.find((todo:any) => todo.id==id)

        
        await fetch(`${BACKEND_URI}/todos/update?id=${id}`, {
            method: "PUT", 
             headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
             },
            body: JSON.stringify({
                name: todo.name,
                detail: todo.detail,
                checkbox: value ? 1 : 0
            })
           
        })

    }

    

    return (
        
        <div>
         { !showSingle ? <ul>
                {todus.map((todo: any) => (
                    <li key={todo.id} className="flex justify-between p-1 bg-pink-100">
                        <button onClick={() => openSingleTodo(todo.id)} > {todo.name}</button>
                        <div className="space-x-2 items-center">
                            <input type="checkbox" checked={todo.checkbox} onChange={(e) => viewCheck(e.target.checked, todo.id)} className="size-5" />
                          <Link to={"/edit"}  ><button onClick={() => setEdit(todo.id)}> <svg width="24px" height="24px" viewBox="0 0 24 24" strokeWidth="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="#282725"><path d="M14.3632 5.65156L15.8431 4.17157C16.6242 3.39052 17.8905 3.39052 18.6716 4.17157L20.0858 5.58579C20.8668 6.36683 20.8668 7.63316 20.0858 8.41421L18.6058 9.8942M14.3632 5.65156L4.74749 15.2672C4.41542 15.5993 4.21079 16.0376 4.16947 16.5054L3.92738 19.2459C3.87261 19.8659 4.39148 20.3848 5.0115 20.33L7.75191 20.0879C8.21972 20.0466 8.65806 19.8419 8.99013 19.5099L18.6058 9.8942M14.3632 5.65156L18.6058 9.8942" stroke="#282725" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg></button></Link>
                            <button onClick={() => DeleteTodo(todo.id)}> <svg width="24px" height="24px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#282725"><path d="M3.03919 4.2939C3.01449 4.10866 3.0791 3.92338 3.23133 3.81499C3.9272 3.31953 6.3142 2 12 2C17.6858 2 20.0728 3.31952 20.7687 3.81499C20.9209 3.92338 20.9855 4.10866 20.9608 4.2939L19.2616 17.0378C19.0968 18.2744 18.3644 19.3632 17.2813 19.9821L16.9614 20.1649C13.8871 21.9217 10.1129 21.9217 7.03861 20.1649L6.71873 19.9821C5.6356 19.3632 4.90325 18.2744 4.73838 17.0378L3.03919 4.2939Z" stroke="#282725" strokeWidth="1.5"></path><path d="M3 5C5.57143 7.66666 18.4286 7.66662 21 5" stroke="#282725" strokeWidth="1.5"></path><path d="M11 18L14 14.5M14 14.5L19 17M14 14.5L20 11.5" stroke="#282725" strokeWidth="1.5"></path><path d="M4.5 16L7.73595 15.5377C7.90405 15.5137 8.07446 15.562 8.20491 15.6708L11 18L14 21" stroke="#282725" strokeWidth="1.5"></path><path d="M8 15.5L10.6149 12.4493C10.8284 12.2001 11.2025 12.1688 11.4546 12.3788L14 14.5" stroke="#282725" strokeWidth="1.5"></path></svg></button>
                        </div>
                    </li>
                ))}
            </ul>

            : <div className="flex flex-col space-y-5 items-center text-center">
                <div> <p className="text-2xl font-bold ">Title:</p> <p className="text-lg">{singleTodo.name} </p> </div>
                <div> <p className="text-2xl font-bold">Description:</p> <p className="text-lg"> {singleTodo.detail} </p> </div>
                <button onClick={() => setShowSingle(false)} className="px-2 py-1 rounded w-30 bg-pink-100 mb-5"> go back</button>
            </div>
        }
          

        </div>
    )
}

export default TodoViewElement
