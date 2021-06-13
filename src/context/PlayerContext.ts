import { createContext } from 'react'

type Episode = {
    title: string,
    members: string,
    thumbnail: string,
    duration: number,
    url: string
}

type PlayerContextData = {
    episodeList: Episode[],
    currentEpisodeIndex: number,
    play: (episode: Episode) => void
}

export const playerContext = createContext({} as PlayerContextData) //force attribution of types