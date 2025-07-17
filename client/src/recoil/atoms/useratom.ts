import { atom } from "recoil";

const useratom = atom({
    key: "userdata",
    default: {
        username: "",
        email: "",
        password: ""
    }
})

export default useratom