import { useEffect, useRef, useState } from 'react'
import { usePlayer } from '../context/PlayerContext'
import Image from 'next/image'

import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'

import style from './Player.module.css'
import { convertDurationToTimeString } from '../utils/convertDurationToTimestring'

function Player(){

    const [progress, setprogress] = useState(0)
    const audioRef = useRef<HTMLAudioElement>(null)

    const { episodeList,
            currentEpisodeIndex,
            isPlaying,
            isShuffling,
            togglePlay,
            setPlayingState,
            playNext,
            playPrevious,
            isLooping,
            toggleLoop,
            toggleShuffle,
        } = usePlayer()

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
    

    function setupProgressListener(){
        audioRef.current.currentTime = 0

        audioRef.current.addEventListener('timeupdate', () => {
            setprogress(Math.floor(audioRef.current.currentTime))
        })
    }

    function handleSeek(amount: number ){
        audioRef.current.currentTime = amount
        setprogress(amount)
    }


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
                <span>{convertDurationToTimeString(progress)}</span>
                { episode ? (
                    <Slider 
                        max={episode.duration}
                        value={progress}
                        onChange={handleSeek}
                        trackStyle={{ background: '#04d361'}}
                        railStyle={{background: '#9f75ff'}}
                        handleStyle={{ borderColor: '#04d361', borderWidth: 4}}
                    />
                ) : (
                    <div className={style.emptySlider} />
                )
                }
                <span>{convertDurationToTimeString(episode?.duration ?? 0)}</span>
            </div>

                { episode && (
                    <audio 
                        src={episode.url}
                        ref={audioRef}
                        autoPlay
                        loop={isLooping}
                        onEnded={handleEpisodeEnded}
                        onPlay={ () => setPlayingState(true)}
                        onPause={() => setPlayingState(false)}
                        onLoadedMetadata={setupProgressListener}
                    />
                )}

            <div className={style.buttons} >
                <button type='button'
                className={isShuffling ? style.isActive : '' }
                onClick={toggleShuffle}
                disabled={ !episode || episodeList.length === 1}>
                    <img src='/shuffle.svg' alt='shuffle' />
                </button>
                <button type='button' onClick={playPrevious} disabled={ !episode}>
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
                <button type='button' onClick={playNext} disabled={ !episode}>
                    <img src='/play-next.svg' alt='play-next' />
                </button>
                <button type='button' 
                    className={isLooping ? style.isActive : ''}
                    onClick={toggleLoop}
                     disabled={ !episode}>
                    <img src='/repeat.svg' alt='repeat' />
                </button>
            </div>

        </footer>
    </div>

    )
}

export default Player