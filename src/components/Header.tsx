import format from 'date-fns/format'
import ptBR from 'date-fns/locale/pt-BR'

import styles from './Header.module.css'

function Header() {

    const currentDate = format(new Date(), 'EEEEEE, d MMMM', {
        locale: ptBR
    })

    return(
        <header className={styles.HeaderContainer}>
            <img src='/logo.svg' alt='Podcast' />

            <p>O melhor para você escutar, sempre</p>
            <span>{currentDate}</span>
        </header>
    )
};

export default Header