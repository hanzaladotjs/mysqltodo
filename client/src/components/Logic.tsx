import { Link, useNavigate } from "react-router-dom"
import { useRecoilState, useSetRecoilState } from "recoil"
import useratom from "../recoil/atoms/useratom"
import authAtom from "../recoil/atoms/authatom"
import BACKEND_URI from "../config/uriConfig"

const Login = () => {


    const [user, setUser] = useRecoilState(useratom)
    const setAuth = useSetRecoilState(authAtom)
    const navigate = useNavigate()

    const signinIn = async () => {
       

        const respo = await fetch(`${BACKEND_URI}/user/signin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                identity: user.email,
                password: user.password
            })
        })

        const data = await respo.json()
        localStorage.setItem("token", data.token)
        setAuth(true)
        navigate("/")
    }

    console.log(BACKEND_URI)


    return (
        <div>
            <div className="flex flex-col space-y-4 font-mono md:w-110 w-80">
                <h1 className="text-3xl text-gray-800 font-bold mb-10">
                    {" "}
                    Glad you're back!{" "}
                </h1>


                <input
                    value={user.email}
                    onChange={(e) => setUser(({ ...prev }) => ({ ...prev, email: e.target.value }))}
                    type="text"
                    placeholder="Email address or username"
                    className="p-3 border rounded  border-black placeholder-gray-300  text-black outline-none hover:border-2"
                />

                <input
                    value={user.password}
                    onChange={(e) => setUser(({ ...prev }) => ({ ...prev, password: e.target.value }))}
                    type="text"
                    placeholder="Password"
                    className="p-3 border border-black placeholder-gray-300 text-black  rounded outline-none hover:border-2"
                />
                <button onClick={signinIn} type="submit" className="p-3  text-black hover:text-white rounded-lg bg-[#BBCEA8] hover:bg-[#283747]">
                    {" "}
                    Continue{" "}
                </button>
                <p className="text-md  text-gray-400 px-10">
                    {" "}
                    Don't have an account?{" "}
                    <Link to={"/signup"}><span className=" font-semibold hover:underline">Sign up. </span>{" "}</Link>
                </p>

            </div>
        </div>
    )
}

export default Login