import styles from './process.module.css'
import { useState } from 'react'

export default function Process(props: any){

    return(
        <div className={`${styles.progress_container} container`}>
            <div className={styles.wrapper_progressBar}>
            <ul className={styles.progressBar}>
                <li className={styles.active}>General Requirement</li>
                <li className={props.steps === 2 ? `${styles.active}`: props.steps === 3 ? `${styles.active}`: props.steps === 4 ? `${styles.active}`:props.steps === 5 ? `${styles.active}`:''}>Content Management</li>
                <li className={props.steps === 3 ? `${styles.active}`: props.steps === 4 ? `${styles.active}`: props.steps === 5 ? `${styles.active}`:'' }>Marketing</li>
                <li className={props.steps === 4 ? `${styles.active}`:props.steps === 5 ? `${styles.active}`:''}>Technical - IT</li>
                <li className={props.steps === 5 ? `${styles.active}`:''}>Technical - Development</li>
            </ul>
            </div>
        </div>
    )
}