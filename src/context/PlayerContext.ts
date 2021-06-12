import { createContext } from 'react'

type Episode = {
    title: string,
    members: string,
    thumbnail: string,
    duration: string,
    utl: string
}

type PlayerContextData = {
    episodeList: Episode[],
    currentEpisodeIndex: Number 
}

export const playerContext = createContext('')