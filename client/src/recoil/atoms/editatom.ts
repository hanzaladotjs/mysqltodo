import { atom } from "recoil";

const editatom = atom<any>({
    key: "edit",
    default: ""
})

export default editatom