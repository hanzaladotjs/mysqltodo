import { useEffect, useState } from "react"
import { useRecoilValue } from "recoil"
import editatom from "../recoil/atoms/editatom"
import BACKEND_URI from "../config/uriConfig"
import todoatom from "../recoil/atoms/todoatom"
import { useNavigate } from "react-router-dom"

const Update = () => {
    const id = useRecoilValue(editatom)
    const todus = useRecoilValue(todoatom)
    const thisOne =  todus.find((todo:any)=> todo.id==id)
    const token:any = localStorage.getItem("token")

     const [updated, setUpdated] = useState<any>({
    name: "",
    detail: "",
    checkbox: false,
  })
const navigate = useNavigate()

  useEffect(() => {
    if (thisOne) {
      setUpdated({
        name: thisOne.name,
        detail: thisOne.detail,
        checkbox: thisOne.checkbox,
      })
    }
  }, [])

    

    async function updateTodo(id:any){

        await fetch(`${BACKEND_URI}/todos/update?id=${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify( {
                name: updated.name,
                detail: updated.detail,
                checkbox: updated.checkbox
            })
        })
        navigate("/")

    }


    
    return (
       <div className="flex flex-col items-center bg-yellow-100 md:w-200 w-80 border-x-[3px] border-red-400">
           
               <textarea value={updated.name} onChange={(e)=> setUpdated((prev:any)=> ({...prev, name: e.target.value}))} className="w-full mt-5 h-20  px-5 outline-none overflow-auto placeholder-gray-400" placeholder="Title"/>
             
            
            <textarea onChange={(e)=> setUpdated((prev:any)=> ({...prev, detail: e.target.value}))} value={updated.detail} className="w-full h-60 mt-5 px-5 outline-none overflow-auto  placeholder-gray-400" placeholder="Description"/>
                <div className="flex items-center my-5">
            <input  type="checkbox" checked={updated.checkbox} onChange={(e) => setUpdated((prev:any) => ({...prev, checkbox: e.target.checked}))} className="mr-5 size-10"/>
            <div className="flex space-x-5">
            <button onClick={() => updateTodo(id)} className="w-20 h-10 border-2 border-gray-600"> Done </button>

            <button onClick={() => navigate("/")} className="w-20 h-10 border-2 border-gray-600"> Edit later </button>
            
            </div></div>
        </div>
    )
}

export default Update