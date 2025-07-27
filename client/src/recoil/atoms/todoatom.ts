import { atom } from "recoil";





const todoatom = atom<any>({
    key: "tododata",
    default: []
})

export default todoatom