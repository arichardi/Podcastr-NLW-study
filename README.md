# study guide based on React Course NLW

#### This is a compile of everything I learned with is guided project and made for future consultation

## What about the project

The project is an podcast player site, with live player and a page with details of episode chosen

### Start the project

Start with the basic: create-next-app project name --typescript
Using the next or gatsby will provide the possibility of indexing the page 


## Basic rules

### Folder organization 

src
	pages
	styles

### Styles

On styles page we concentrate all the css files, starting with a basic reset of browser styles
margin, padding, box-sizing and background-color

also using a root to define all the colors using variables

```css
:root{
	--variablename: #color
}
body{
	color: var(--variablename)
}
```

`using rem for text sizes and @media queries with % for diferent sizes`

If you use rem you can keep the cohension and acessibility for the user

`creating _document`

It will allow to insert configurations (like font family) be loaded throw all my content without need to reload the content
when the user change to a different route as if we had inserted on index page

Used the structure as it follows on next docs to load the fonts

#### New css ressources never used by me before

calc(100vh - 6.5rem); - calculus inside css
linear-gradient - name speaks by itself
overflow-y: scroll - better experience
text-overflow: ellipsis; put '...' on excess text

### why Next

The possibility to perform the application better with the use of SSG suport (Bellow) and other features.

`IMAGE`

the possibility of reduce and control the image quality before arrives in the browser

`Routing`

All files in the pages folder whose name does not start with '_' are automatically
defined as a route

*Using a slug or an user friendly interface for query params ?*

create a hierarquie folder inside pages, and the name of file as *[slug].tsx*
to receive the param, you import useRouter from next/router, and insert an useRouter()

```typescript

	import { useRouter } from 'next/router'

	const router = useRouter()
	<h1> {router.query.slug} </h1>
```

*How use the links with is system*

You pass a anchor tag, with the adress, nothing new.
But now you need to wrap this anchot tag, with a Link tag from next, and pass the adress
as a paramether of Link this time

*You can use Link arround and button too*

```Javascript 

	import Link from 'next/link'

	<Link href={`/episodes/${episode.id}`} >
		<a> {episode.title} </a>
	</Link>
	
```

### Fetching the API

We can consume the api data in 3 ways.
SPA, SSR and SSG

`SPA single page aplication`

The traditional way of react fetch the save states, using useEffect
The downsize of this method is the impossibility of indexing data 

```typescript
useEffect( () => {
	fetch('adress')
	.then( response => response.json())
	.then( data => setState(data) ) //save the data in a state
}, [])
```

`SSR service side rendering`

A new way where a intermediate server will fetch and send you the data
so a bot can index your data without problem

```typescript
export async function getServerSideProps(){ //inside the component
	const response = await fetch('adress')
	const data = await response.json()
	
	return {
		props: { //keep the name props
			nameOfDaata: data,
		}
	}
}
```
when you use in this way, the next will understand that it needs to save the data/function when this component loads
and send the return/result by props


`SSG Static Site Generator`

The most clever way to do, in SSR method, it will execute the command everytime your app execute,
in SSG method you can specificate how offen your app need to be reloaded or updated
and in this way you can save ressources

```typescript
export const GetStaticProps: GetStaticProps = async () => { //inside the component
	const response = await fetch('adress')
	const data = await response.json()
	
	return {
		props: { //keep the name props
			nameOfDaata: data,
		},
		revalidate: 60 * 60 * 8                  //frequency in seconds of data update. in the exemple 8 hours
	}
}
```
when you use in this way, the next understand that it needs to save the data/function when this component loads
and send the return/result by props
the data will be updated accordingly with the revalidate time

In this method you will nedd build your app to work properly

`Get Static Path`

mandatory the use with dynamic routes and when we use getStaticProps


### Components

`Public import on Next`

As a characteristics of next you dont need to import the images on the public folders
they are automatically imported.

`name.module.css`

This allow you to import css easelly to your component following the name of the css module
and importing as style and using className with style and the name used in css module

```typescript
import styles from './Header.module.css'

 <header className={styles.HeaderContainer}>
```

`Header`

A simple header of our app, with the date-fns showing the current date brazilian format

`Player`

Basic player responsable to execute the podcasts

### Libs

As a measure of performance we convert the data types to string and other things before,
we send to the app, as a way to avoid a large number of process in the user browser and send this 
work to que server

### Libs

`date fns`

Lib to work with dates

used: format(format the data as desired), parsedISO (convert a date to a string)

`Json Server`

A lib to spoof your API server in development mode, allowing you to 
develop a solution in offline enviroment

we created a script to run toguether with the app
running in whatchmode '-w', with 720 ms delay '-d' in the port 3333 '-p 3333'

```json
"server": "json-server server.json -w -d 720 -p 3333"
```
The JasonServer has a lots of params about how you fetch your api
 `
 ```json
 "adress?_limit=12"     							//limit the number of requisitions
 "adress?_limit=12&_sort=published_at"	    		//sort the data by something
 "adress?_limit=12&_sort=published_at&_order=desc"	//what order asc or desc
 ```

 `Axios`

 a lib where you can fetch data, making request in a clever way
 exemple setting a baseURL on a separate folder 

  ```javascript
export const api = axios.create({
    baseURL: 'http://localhost:3333/'
})
```

You can execute the fetch in a clean way using the class created above 

```javascript
  const response = await api.get('episodes', {
    params: {
      _limit: 12,
      _sort: 'published_at',
      _order: 'desc',
    }
  })
  ```