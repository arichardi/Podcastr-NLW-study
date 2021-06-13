import { useState } from 'react'
import Header from '../components/Header'
import Player from '../components/Player'
import { playerContext } from '../context/PlayerContext'

import '../styles/global.css'
import style from '../styles/app.module.css'

function MyApp({ Component, pageProps }) {

  const [episodeList, setEpisodeList] = useState([])
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0)

  function play(episode): void{
    setEpisodeList([episode])
    setCurrentEpisodeIndex(0)
  }

  return (
    <playerContext.Provider value={{ episodeList, currentEpisodeIndex, play }} >
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
