import Header from '../components/Header'
import Player from '../components/Player'
import { playerContext } from '../context/PlayerContext'

import '../styles/global.css'
import style from '../styles/app.module.css'

function MyApp({ Component, pageProps }) {
  return (
    <playerContext.Provider value={'Andre'}>
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
