import { atom } from "recoil";

export type movieFilter = {
    key: string,  // Could make enum
    value: string
}

export const movieFilters = atom<Set<movieFilter>>({
    key: "DesiredMovieFilters",
    default: new Set()
})