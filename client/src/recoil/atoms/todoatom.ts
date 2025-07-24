import { atom } from "recoil";

const todoatom = atom({
    key: "tododata",
    default: []
})

export default todoatom