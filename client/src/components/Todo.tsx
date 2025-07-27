import { useRecoilState, useSetRecoilState} from "recoil"
import authAtom from "../recoil/atoms/authatom"
import CreateView from "./Create"
import TodoViewElement from "./TodoElement"
import modalview from "../recoil/atoms/modalView"
import todoview from "../recoil/atoms/todoView"

const Todo = () => {

   
    const [authstate, setAuthState] = useRecoilState(authAtom)
    const [modal, setModal] = useRecoilState(modalview)
    const setTodoView = useSetRecoilState(todoview)

     const token = localStorage.getItem("token")

    if(token){
        setAuthState(true)
    }


    function goToTodoView(){
        setModal(false)
        setTodoView(true)
    }

      function goToCreateView(){
    setTodoView(false)
        setModal(true)
    }


    return (
        <div>
            {authstate ? <div className="bg-yellow-100 w-80 md:w-200 rounded border-2 border-stone-200 my-5">

             
                <div className="flex justify-between items-center mb-5 px-2 py-2 border-b border-gray-600">
                    <button onClick={goToTodoView}><svg width="28px" height="28px" viewBox="0 0 24 24" strokeWidth="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="#282725"><path d="M16 14V8.00005C16 5.23862 13.7614 3 11 3C8.23858 3 6 5.23862 6 8.00005V21" stroke="#282725" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M12 11C13.5621 12.5621 14.4379 13.4379 16 15C17.5621 13.4379 18.4379 12.5621 20 11" stroke="#282725" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg></button>
                    <button onClick={goToCreateView}><svg width="28px" height="28px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#282725" strokeWidth="1.5"><path fillRule="evenodd" clipRule="evenodd" d="M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM12.75 8C12.75 7.58579 12.4142 7.25 12 7.25C11.5858 7.25 11.25 7.58579 11.25 8V11.25H8C7.58579 11.25 7.25 11.5858 7.25 12C7.25 12.4142 7.58579 12.75 8 12.75H11.25V16C11.25 16.4142 11.5858 16.75 12 16.75C12.4142 16.75 12.75 16.4142 12.75 16V12.75H16C16.4142 12.75 16.75 12.4142 16.75 12C16.75 11.5858 16.4142 11.25 16 11.25H12.75V8Z" fill="#282725"></path></svg></button>
                </div>

                {modal ? <CreateView/> :  <TodoViewElement/> }

              


            </div> : <div className="flex animation fade-in slide-up mx-2 md:mx-0 text-black font-mono text-xl underline md:text-3xl font-semibold italic justify-center items-center min-h-90 md:min-h-110">
                Welcome to the best todo application ever made<br></br>in the history of mankind.
            </div>}
        </div>
    )
}

export default Todo