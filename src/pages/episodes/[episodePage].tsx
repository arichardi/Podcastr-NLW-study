import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import { api } from '../../Services/api'

import {format, parseISO} from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { convertDurationToTimeString } from '../../utils/convertDurationToTimestring'

import styles from './episode.module.css'

type Episode = {
    id: string
    title: string
    thumbnail: string
    members: number
    publishedAt: string
    duration: number
    durationAsString: string
    description: string
    url: string
}

type EpisodeProps = { episode: Episode}

export default function episode({episode}: EpisodeProps){

    const router = useRouter()

    return(
        <div className={styles.episodeContainer}>
            <div className={styles.thumbnailContainer}>
                <Link href='/'>
                <button type='button'>
                    <img src='/arrow-left.svg' alt='retornar' />
                </button>
                </Link>
                <Image width={700} height={160} src={episode.thumbnail} objectFit='cover' />
                <button type='button'>
                    <img src='/play.svg' alt='Tocar episodio'/>
                </button>
            </div>

            <header className={styles.body}>
                <h1>{episode.title}</h1>
                <span>{episode.members}</span>
                <span>{episode.publishedAt}</span>
                <span>{episode.durationAsString}</span>
            </header>
            <div 
            className={styles.description}
            dangerouslySetInnerHTML={{__html: episode.description}}
            />

        </div>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps = async (ctx) => {  //ctx = context

    const { episodePage } = ctx.params
    const { data } = await api.get(`/episodes/${episodePage}`)
    
    const episode = {
        id: data.id,
        title: data.title,
        thumbnail: data.thumbnail,
        members: data.members,
        publishedAt: format(parseISO(data.published_at), 'd MMM yy', { locale: ptBR }),
        duration: Number(data.file.duration),
        durationAsString: convertDurationToTimeString(Number(data.file.duration)),
        description: data.description,
        url: data.file.url
    }

    return {
        props: {
            episode,
        },
        revalidate: 60 * 60 * 24, //24 hours
    }
}