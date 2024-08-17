'use client'
import styles from './header.module.css'
import Image from 'next/image'

export default function Header (){
    return(
        <header className={styles.header}>
            <div className={`${styles.header_flex} container`}>
                <div className={styles.logo_image}> <Image src="/assets/rage_logo.svg" alt="logo" /></div>
                <p>CMS RECOMMENDATION TOOL</p>
            </div>
        </header>
    )
}