# study guide based on React Course NLW

##This is a compile of everything I learned with is guided project and made for future consultation

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

### Libs

`date fns`

Lib to work with dates