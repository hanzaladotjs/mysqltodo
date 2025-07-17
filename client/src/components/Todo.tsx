import { useRecoilValue } from "recoil"
import auth from "../recoil/atoms/authatom"

const Todo = () => {

    const authstate = useRecoilValue(auth)
    return (
        <div>
            {authstate ? <div className="flex bg-[#BBCEA8] flex-col justify-center items-center w-200 rounded border-2 border-stone-200 my-5">

                <input className="outline-none placeholder mb-10 border w-full h-20 my-2" type="text" />
                


            </div> : <div className="flex animation fade-in slide-up mx-2 md:mx-0 text-stone-200 font-mono text-xl underline md:text-3xl font-semibold italic justify-center items-center min-h-90 md:min-h-110">
                Welcome to the best todo application ever made<br></br>in the history of mankind.
            </div>}
        </div>
    )
}

export default Todo