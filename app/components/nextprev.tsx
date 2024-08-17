'use client'
import { useEffect, useState } from 'react'
import styles from './nextprev.module.css'

export default function NextPrev(){
    const [activeStep, setActiveStep] = useState(1);
    const [optionValue, setOptionValue] = useState();

    const nextStep = () => {
    setActiveStep(activeStep + 1)
    }

    const prevStep = () => {
    setActiveStep(activeStep - 1)
    }

    console.log('option',optionValue);
    const onOptionChange = (e:any) =>{
      setOptionValue(e.target.value)
    }
    // console.log('activeStep', activeStep)
    // if(activeStep == 1){
    //     var one = document.getElementsByClassName("stepOne")[0] as HTMLElement;
    //     one.classList.add("mystyle");
    //     console.log('i am inn')
    // }
  // const totalSteps = questionnaire.length
    return(

        <div>
        <button className={styles.button} onClick={prevStep} >Back</button>
        <button className={styles.button} onClick={nextStep} >Next</button>
    </div>
    )

}


