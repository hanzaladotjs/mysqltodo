import { useRecoilValue } from "recoil"
import auth from "../recoil/atoms/authatom"
import todoatom from "../recoil/atoms/todoatom"

const Todo = () => {

    const authstate = useRecoilValue(auth)
    const todos = useRecoilValue(todoatom)
    return (
        <div>
            {authstate ? <div className="flex bg-gray-200 flex-col justify-center items-center w-80 md:w-200 rounded border-2 border-stone-200 my-5">

                {todos.map((index: any, twdw: any) => (
                    <div key={index} className="flex space-x-5">
                       <button> {twdw.name} </button> 
                       <input type="checkbox"/>
                    </div>
                ))}


            </div> : <div className="flex animation fade-in slide-up mx-2 md:mx-0 text-black font-mono text-xl underline md:text-3xl font-semibold italic justify-center items-center min-h-90 md:min-h-110">
                Welcome to the best todo application ever made<br></br>in the history of mankind.
            </div>}
        </div>
    )
}

export default Todo