import { GetStaticProps } from 'next'
import { api } from '../Services/api'
import { format, parseISO } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { convertDurationToTimeString } from '../utils/convertDurationToTimestring'

//typing my objects
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

type HomeProps = {
  episodes: Episode[]
}


export default function Home(props: HomeProps) {
  return (
    <>
   <div>Index</div>
   <p>{JSON.stringify(props.episodes)}</p>
   </>
  )
}

//fetch the data from the server
export const getStaticProps: GetStaticProps = async () => {
  const response = await api.get('episodes', {
    params: {
      _limit: 12,
      _sort: 'published_at',
      _order: 'desc',
    }
  })
  const data = response.data

  //format all the time data before it arrives in the component

  const episodes = data.map( episode => {
    return {
      id: episode.id,
      title: episode.title,
      thumbnail: episode.thumbnail,
      members: episode.members,
      publishedAt: format(parseISO(episode.published_at), 'd MMM yy', { locale: ptBR }),
      duration: Number(episode.file.duration),
      durationAsString: convertDurationToTimeString(Number(episode.file.duration)),
      description: episode.file.description,
      url: episode.file.url
    }
  })

  return {
    props: {
      episodes: data
    },
    revalidate: 60 * 60 * 24
  }
}