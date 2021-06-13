import { useContext } from 'react'
import { playerContext } from '../context/PlayerContext'
import Image from 'next/image'

import style from './Player.module.css'

function Player(){

    const { episodeList, currentEpisodeIndex} = useContext(playerContext)

    const episode = episodeList[currentEpisodeIndex]

    return (

    <div className={style.playerContainer}>
        <header>
            <img src='/playing.svg' alt='Tocando agora' />
            <strong>Tocando agora {episode?.title} </strong>
        </header>

        { episode ? 
        (
            <div className={style.currentEpisode}>
                <Image 
                    width={592} height={592}
                    src={episode.thumbnail}
                    objectFit='cover'
                />
                <strong>{episode.title}</strong>
                <span>{episode.members}</span>
            </div>
        ) : 
        
         (
            <div className={style.emptyPlayer}>
                <strong>Selecione um podcast para ouvir</strong>
            </div>
        )}

        <footer className={style.empty}>
            <div className={style.progress}>
                <span>00:00</span>
                <div className={style.emptySlider}/>
                <span>00:00</span>
            </div>
            <div className={style.buttons} >
                <button type='button'>
                    <img src='/shuffle.svg' alt='shuffle' />
                </button>
                <button type='button'>
                    <img src='/play-previous.svg' alt='play-previous' />
                </button>
                <button type='button' className={style.playButton}>
                    <img src='/play.svg' alt='play' />
                </button>
                <button type='button'>
                    <img src='/play-next.svg' alt='play-next' />
                </button>
                <button type='button'>
                    <img src='/repeat.svg' alt='repeat' />
                </button>
            </div>

        </footer>
    </div>

    )
}

export default Player