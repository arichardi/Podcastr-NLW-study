import Header from '../components/Header'
import Player from '../components/Player'

import '../styles/global.css'
import style from '../styles/app.module.css'

function MyApp({ Component, pageProps }) {
  return (
    <div className={style.wrapper}>
      <main>
      <Header />
      <Component {...pageProps} />
      </main>
      <Player />
    </div>
  )
}

export default MyApp
