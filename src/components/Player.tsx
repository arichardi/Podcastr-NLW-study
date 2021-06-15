import { useContext, useEffect, useRef } from 'react'
import { playerContext } from '../context/PlayerContext'
import Image from 'next/image'

import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'

import style from './Player.module.css'

function Player(){

    const audioRef = useRef<HTMLAudioElement>(null)

    const { episodeList,
            currentEpisodeIndex,
            isPlaying,
            togglePlay,
            setPlayingState
        } = useContext(playerContext)

    useEffect( () => {
        if (!audioRef.current){
            return;
        }
        if(isPlaying){
            audioRef.current.play()
        }else {
            audioRef.current.pause()
        }

    }, [isPlaying])

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

        <footer className={!episode ? style.empty : ''}>
            <div className={style.progress}>
                <span>00:00</span>
                { episode ? (
                    <Slider 
                        trackStyle={{ background: '#04d361'}}
                        railStyle={{background: '#9f75ff'}}
                        handleStyle={{ borderColor: '#04d361', borderWidth: 4}}
                    />
                ) : (
                    <div className={style.emptySlider} />
                )
                }
                <span>00:00</span>
            </div>

                { episode && (
                    <audio 
                        src={episode.url}
                        ref={audioRef}
                        autoPlay
                        onPlay={ () => setPlayingState(true)}
                        onPause={() => setPlayingState(false)}
                    />
                )}

            <div className={style.buttons} >
                <button type='button' disabled={ !episode}>
                    <img src='/shuffle.svg' alt='shuffle' />
                </button>
                <button type='button' disabled={ !episode}>
                    <img src='/play-previous.svg' alt='play-previous' />
                </button>
                <button type='button' 
                className={style.playButton} 
                disabled={ !episode}
                onClick={togglePlay}
                
                >
                    { isPlaying ? (
                        <img src='/pause.svg' alt='play' />
                    ) : (
                        <img src='/play.svg' alt='play' />
                    )}
                </button>
                <button type='button' disabled={ !episode}>
                    <img src='/play-next.svg' alt='play-next' />
                </button>
                <button type='button' disabled={ !episode}>
                    <img src='/repeat.svg' alt='repeat' />
                </button>
            </div>

        </footer>
    </div>

    )
}

export default Player