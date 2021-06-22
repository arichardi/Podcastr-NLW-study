import { createContext, useState, ReactNode, useContext } from 'react'

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
    isPlaying: boolean,
    isLooping: boolean,
    isShuffling: boolean
    play: (episode: Episode) => void
    togglePlay: () => void
    toggleLoop: () => void
    toggleShuffle: () => void
    setPlayingState: (state: boolean) => void
    playList: (list: Episode[], index: number) => void
    playNext: () => void
    playPrevious: () => void
}

type PlayerContextProviderProps = {
    children: ReactNode;
}

export const playerContext = createContext({} as PlayerContextData) //force attribution of types

export function PlayerContextProvider({children}: PlayerContextProviderProps) {
   
  const [episodeList, setEpisodeList] = useState([])
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLooping, setIsLooping] = useState(false)
  const [isShuffling, setIsShuffling] = useState(false)

  function play(episode: Episode){
    setEpisodeList([episode])
    setCurrentEpisodeIndex(0)
    setIsPlaying(true)
  }

  function playList(list: Episode[], index: number){
    setEpisodeList(list)
    setCurrentEpisodeIndex(index)
    setIsPlaying(true)
  }
  
  const nextEpisodeIndex = currentEpisodeIndex + 1
  const hasNext = isShuffling || (currentEpisodeIndex + 1) < episodeList.length
  
  function clearPlayerState(){
      setEpisodeList([])
      setCurrentEpisodeIndex(0);
  }

  function playNext(){

    if(isShuffling){
        const playRandonNextEpisodeIndex = Math.floor(Math.random() * episodeList.length)
        setCurrentEpisodeIndex(playRandonNextEpisodeIndex)
    }

    else if(hasNext){
        setCurrentEpisodeIndex(nextEpisodeIndex)
    }

  }

  function handleEpisodeEnded(){
    if(hasNext){
        playNext()
    }else {

    }

  }

  function playPrevious(){
      if (currentEpisodeIndex > 0){
          setCurrentEpisodeIndex(currentEpisodeIndex - 1)
      }
}

  function togglePlay(){
    setIsPlaying(!isPlaying)
  }

  function toggleLoop(){
      setIsLooping(!isLooping)
  }

  function toggleShuffle(){
      setIsShuffling(!isShuffling)
  }

  function setPlayingState(state: boolean){
    setIsPlaying(state)
  }

  return (
    <playerContext.Provider value={{ episodeList,
        currentEpisodeIndex,
        isPlaying,
        isLooping,
        isShuffling,
        play,
        playNext,
        playPrevious,
        playList,
        togglePlay,
        toggleLoop,
        toggleShuffle,
        setPlayingState
        }}>
        {children}
    </playerContext.Provider> 
  )
}

export const usePlayer = () => {
    return useContext(playerContext)
}