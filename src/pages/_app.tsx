import { useState } from 'react'
import Header from '../components/Header'
import Player from '../components/Player'
import { playerContext } from '../context/PlayerContext'

import '../styles/global.css'
import style from '../styles/app.module.css'

function MyApp({ Component, pageProps }) {

  const [episodeList, setEpisodeList] = useState([])
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  function play(episode){
    setEpisodeList([episode])
    setCurrentEpisodeIndex(0)
    setIsPlaying(true)
  }

  function togglePlay(){
    setIsPlaying(!isPlaying)
  }

  function setPlayingState(state: boolean){
    setIsPlaying(state)
  }

  return (
    <playerContext.Provider value={{ episodeList, currentEpisodeIndex, isPlaying,  play, togglePlay, setPlayingState }} >
    <div className={style.wrapper}>
      <main>
      <Header />
      <Component {...pageProps} />
      </main>
      <Player />
    </div>
    </playerContext.Provider>
  )
}

export default MyApp
