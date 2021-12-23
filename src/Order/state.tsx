import { atom } from "recoil";

export const newMoviesSelected = atom<boolean>({
    key: "NewMoviePage",
    default: false
})