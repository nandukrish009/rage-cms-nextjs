'use client'
import styles from './header.module.css'

export default function Header (){
    return(
        <header className={styles.header}>
            <div className={`${styles.header_flex} container`}>
                <div className={styles.logo_image}> <img src="/assets/rage_logo.svg" alt="logo" /></div>
                <p>CMS RECOMMENDATION TOOL</p>
            </div>
        </header>
    )
}