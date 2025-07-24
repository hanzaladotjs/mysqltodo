import { Link, useNavigate } from "react-router-dom"
import { useRecoilState, useSetRecoilState, } from "recoil"
import useratom from "../recoil/atoms/useratom"
import authAtom from "../recoil/atoms/authatom"
import BACKEND_URI from "../config/uriConfig"

const Signup = () => {

    const [user, setUser] = useRecoilState(useratom)
    const setAuth = useSetRecoilState(authAtom)
    const navigate = useNavigate()


    const signedUp = async () => {
        
        
        const respo = await fetch(`${BACKEND_URI}/user/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify(user)
        } )
        const data = await respo.json()
        localStorage.setItem("token", data.token)
        setAuth(true)
        navigate("/")
        
    }
    
    return (
        <div>
        <div className="flex flex-col space-y-4 font-mono w-80 md:w-110">
            <h1 className="text-3xl text-gray-800 font-bold mb-10">
                {" "}
                Yo! What's up?{" "}
            </h1>

             <input
                value={user.username}
                onChange={(e) => setUser(({...prev}) =>({...prev, username: e.target.value}) )}
                type="text"
                placeholder="Username"
                className="p-3 border  border-black rounded placeholder-gray-300 text-black outline-none hover:border-2"
            />
            <input
                value={user.email}
                onChange={(e) => setUser(({...prev}) =>({...prev, email: e.target.value}) )}
                type="text"
                placeholder="Email address"
                className="p-3 border rounded  border-black placeholder-gray-300 text-black outline-none hover:border-2"
            />

            <input
            value={user.password}
                onChange={(e) => setUser(({...prev}) =>({...prev, password: e.target.value}) )}
                type="text"
                placeholder="Password"
                className="p-3 border  border-black placeholder-gray-300 text-black rounded outline-none hover:border-2"
            />
            <button onClick={signedUp} type="submit" className="p-3 text-black hover:text-white rounded-lg bg-[#BBCEA8] hover:bg-[#283747]">
                {" "}
                Continue{" "}
            </button>
          
           <div className="text-md flex-wrap text-gray-400 px-10">
                {" "}
                Already an user?{" "}
               <Link to={"/login"}> <span className=" font-semibold hover:underline">Login right now. </span></Link>{" "}
            </div>


        </div>
        </div>
    )
}

export default Signup