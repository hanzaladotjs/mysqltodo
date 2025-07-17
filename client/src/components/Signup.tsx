const Signup = () => {
    return (
        <div className="flex justify-center items-center min-h-150 ">
        <div className="flex flex-col space-y-4 font-mono w-80 md:w-110">
            <h1 className="text-3xl text-stone-100 font-bold mb-10">
                {" "}
                Yo! What's up?{" "}
            </h1>

             <input
                type="text"
                placeholder="Username"
                className="p-3 border text-stone-100 border-black rounded  outline-none hover:border-2"
            />
            <input
                type="text"
                placeholder="Email address"
                className="p-3 border rounded text-stone-100 border-black  outline-none hover:border-2"
            />

            <input
                type="text"
                placeholder="Password"
                className="p-3 border text-stone-100 border-black  rounded outline-none hover:border-2"
            />
            <button type="submit" className="p-3 text-black hover:text-white rounded-lg bg-[#BBCEA8] hover:bg-[#283747]">
                {" "}
                Continue{" "}
            </button>
          
           <p className="text-md flex-wrap text-stone-100 px-10">
                {" "}
                Already an user?{" "}
                <span className=" font-semibold hover:underline">Login right now. </span>{" "}
            </p>


        </div>
        </div>
    )
}

export default Signup