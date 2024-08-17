'use client'
import Header from '../components/header'
import styles from './page.module.css'
import getLocalData from '../../json/question.json'
import NextPrev from '../components/nextprev';
import { ChangeEvent, SetStateAction, useEffect, useState } from 'react';
import Process from '../components/process';
import Image from 'next/image';

// async function getData() {
//   const res = await fetch('https://main.d31a5g2ita1bq4.amplifyapp.com/api/questionnaire/651161f056dcb17f40325b81')
//   if (!res.ok) {
//     throw new Error('Failed to fetch data')
//   }
//   return res.json()
// }

 function getData() {
  const res = getLocalData;

  return res;
}
// export default async function Questionnaire() {

export default function Questionnaire() {
    const data =  getData();
    // const questionnaire = data.questions;
    const questionnaire = data;


    const [activeStep, setActiveStep] = useState(1);
    const [optionValue, setOptionValue] = useState<any>([]);
    const [checkArray, setCheckArray] = useState<any> ([]);
    // const [cmsFormData, setCmsFormData] = useState<any>([]);
    const cmsFormData = [];
    const nextStep = () => {
    setActiveStep(activeStep + 1)
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }

    const prevStep = () => {
    setActiveStep(activeStep - 1)
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }
    // const stepValue = activeStep;
    const onOptionChange = (questionId: string, optionId: any) => {
               setOptionValue((prevSelectedAnswers: any) => ({
                    ...prevSelectedAnswers,
                    [questionId]: optionId
                }));
            };

    const handleChange = (e:any) => {
    if (e.target.checked === true) {
      setCheckArray([...checkArray, e.target.value]);

    } else {
      const selectedAcc = checkArray.filter((a: any) => {
        if (a === e.target.value) return false;
        return true;
      });
      setCheckArray([...selectedAcc]);
    }
  };
  const radioObj = Object.entries(optionValue).map(([type, value]) => ({
      type,
      value,
    }));

  const checkObj = Object.entries(checkArray).map(([type, value]) => ({
      type,
      value,
    }));

    const cmsData = [...radioObj,...checkObj]

    for(let cmsValue of cmsData){
      for(let allValues of questionnaire){
        for(let allOptions of allValues.options){
            const selectedValue = cmsValue.value;
            const optionIdValue = allOptions.optionId

              if(selectedValue == optionIdValue){
              const projectValues = allOptions.recommendation
              cmsFormData.push(projectValues)
            }
        }
      }
    }
    // console.log(cmsFormData)
    const d: any[]= cmsFormData
    const flattenedformData:any[] = [].concat(...d);
    // console.log('data',flattenedformData);

    const res = Array.from(
      flattenedformData.reduce(
        (
          m,
           {CMS, recommendation_value}:any
        ) => m.set(CMS, (m.get(CMS) || 0) + parseInt(recommendation_value)),
        new Map()
      ),
      ([CMS, recommendation_value]) => ({
        CMS,
        recommendation_value,
      })
    );
    // console.log('res',res)

    const cmsImagesVlaue:any[] = res;
    const imageSort = cmsImagesVlaue.sort(
      (
        a: { recommendation_value: string },
        b: { recommendation_value: string }
      ) => parseInt(b.recommendation_value) - parseInt(a.recommendation_value)
    );

        Object.keys(flattenedformData).forEach((el:any) => {
        for (let i = 0; i < cmsImagesVlaue.length; i++) {
        if (flattenedformData[el].CMS === cmsImagesVlaue[i].CMS) {
          cmsImagesVlaue[i].image = flattenedformData[el].image;
        }
      }
    });

  return (
      <div>
        <Header/>
        <Process steps={activeStep}/>
        <div className={`${styles.form_grid} container clearfix`}>
          <div className={styles.fields_grid}>
        {questionnaire.length > 0 ? (
        <form action="">
          {activeStep === 1 &&
          <fieldset className={`${styles.step1} stepOne`}>
            {questionnaire.filter(x => x.stepperName == 'general requirment').map((question)=>
              <div key={question.questionId} className={styles.options}>
                 <h3>{question.question}</h3>
                    <div className={styles.option_grid}>
                      {
                        question.type == 'single-choice' ? (
                           question.options.map((option:any, i)=>
                    <label className={styles.radio_btn} htmlFor={option.optionId} key={i}>{option.option}
                    <input type="radio" key={i} id={option.optionId} name={question.questionId} value={option.optionId} checked={optionValue[question.questionId] === option.optionId} onChange={() => onOptionChange(question.questionId, option.optionId)}/>
                    <span className={styles.checkmark}></span>
                    </label>
                    )
                    ):(
                     question.options.map((option:any, index:any)=>
                    <label key={index} className={styles.check_box} htmlFor={option.optionId}>{option.option}
                    <input type="checkbox" id={option.optionId} name={question.questionId} value={option.optionId} checked={
                    checkArray.lastIndexOf(option.optionId) >= 0 ? true : false} onChange={(e)=> handleChange(e)}/>
                    <span className={styles.boxCheckmark}></span>
                    </label>
                    )
                      )
                      }
                    </div>
            </div>
            )}
             <div>
        <button className={styles.button} onClick={prevStep} disabled={activeStep === 1}>Back</button>
        <button className={styles.button} onClick={nextStep} >Next</button>
           </div>
            </fieldset>
          }

          {activeStep === 2 &&
          <fieldset className={styles.step2}>
            {questionnaire.filter(x => x.stepperName == 'content management').map((question)=>
              <div key={question.questionId} className={styles.options}>
                 <h3>{question.question}</h3>
                    <div className={styles.option_grid}>
                      {
                        question.type == 'single-choice' ? (
                           question.options.map((option:any, i)=>
                    <label className={styles.radio_btn} htmlFor={option.optionId} key={i}>{option.option}
                    <input type="radio" key={i} id={option.optionId} name={question.questionId} value={option.optionId} checked={optionValue[question.questionId] === option.optionId} onChange={() => onOptionChange(question.questionId, option.optionId)}   />
                    <span className={styles.checkmark}></span>
                    </label>
                    )
                    ):(
                     question.options.map((option:any, index:any)=>
                    <label key={index} className={styles.check_box} htmlFor={option.optionId}>{option.option}
                    <input type="checkbox" id={option.optionId} name={question.questionId} value={option.optionId} checked={
                    checkArray.lastIndexOf(option.optionId) >= 0 ? true : false} onChange={(e)=> handleChange(e)}/>
                    <span className={styles.boxCheckmark}></span>
                    </label>
                    )
                      )
                      }
                    </div>
            </div>
            )}
             <div>
        <button className={styles.button} onClick={prevStep}>Back</button>
        <button className={styles.button} onClick={nextStep} >Next</button>
           </div>
            </fieldset>
          }

          {activeStep === 3 &&
          <fieldset className={styles.step3}>
            {questionnaire.filter(x => x.stepperName == 'marketing').map((question)=>
              <div key={question.questionId} className={styles.options}>
                 <h3>{question.question}</h3>
                    <div className={styles.option_grid}>
                      {
                        question.type == 'single-choice' ? (
                           question.options.map((option:any, i)=>
                    <label className={styles.radio_btn} htmlFor={option.optionId} key={i}>{option.option}
                    <input type="radio" key={i} id={option.optionId} name={question.questionId} value={option.optionId} checked={optionValue[question.questionId] === option.optionId} onChange={() => onOptionChange(question.questionId, option.optionId)}   />
                    <span className={styles.checkmark}></span>
                    </label>
                    )
                    ):(
                     question.options.map((option:any, index:any)=>
                    <label key={index} className={styles.check_box} htmlFor={option.optionId}>{option.option}
                    <input type="checkbox" id={option.optionId} name={question.questionId} value={option.optionId} checked={
                    checkArray.lastIndexOf(option.optionId) >= 0 ? true : false} onChange={(e)=> handleChange(e)}/>
                    <span className={styles.boxCheckmark}></span>
                    </label>
                    )
                      )
                      }
                    </div>
            </div>
            )}
             <div>
        <button className={styles.button} onClick={prevStep}>Back</button>
        <button className={styles.button} onClick={nextStep} >Next</button>
           </div>
            </fieldset>
          }

          {activeStep === 4 &&
          <fieldset className={styles.step4}>
            {questionnaire.filter(x => x.stepperName == 'technical it').map((question)=>
              <div key={question.questionId} className={styles.options}>
                 <h3>{question.question}</h3>
                    <div className={styles.option_grid}>
                      {
                        question.type == 'single-choice' ? (
                           question.options.map((option:any, i)=>
                    <label className={styles.radio_btn} htmlFor={option.optionId} key={i}>{option.option}
                    <input type="radio" key={i} id={option.optionId} name={question.questionId} value={option.optionId} checked={optionValue[question.questionId] === option.optionId} onChange={() => onOptionChange(question.questionId, option.optionId)}   />
                    <span className={styles.checkmark}></span>
                    </label>
                    )
                    ):(
                     question.options.map((option:any, index:any)=>
                    <label key={index} className={styles.check_box} htmlFor={option.optionId}>{option.option}
                    <input type="checkbox" id={option.optionId} name={question.questionId} value={option.optionId} checked={
                    checkArray.lastIndexOf(option.optionId) >= 0 ? true : false} onChange={(e)=> handleChange(e)}/>
                    <span className={styles.boxCheckmark}></span>
                    </label>
                    )
                      )
                      }
                    </div>
            </div>
            )}
             <div>
        <button className={styles.button} onClick={prevStep}>Back</button>
        <button className={styles.button} onClick={nextStep} >Next</button>
           </div>
            </fieldset>
          }

          {activeStep === 5 &&
          <fieldset className={styles.step5}>
            {questionnaire.filter(x => x.stepperName == 'technical development').map((question)=>
              <div key={question.questionId} className={styles.options}>
                 <h3>{question.question}</h3>
                    <div className={styles.option_grid}>
                      {
                        question.type == 'single-choice' ? (
                           question.options.map((option:any, i)=>
                    <label className={styles.radio_btn} htmlFor={option.optionId} key={i}>{option.option}
                    <input type="radio" key={i} id={option.optionId} name={question.questionId} value={option.optionId} checked={optionValue[question.questionId] === option.optionId} onChange={() => onOptionChange(question.questionId, option.optionId)}   />
                    <span className={styles.checkmark}></span>
                    </label>
                    )
                    ):(
                     question.options.map((option:any, index:any)=>
                    <label key={index} className={styles.check_box} htmlFor={option.optionId}>{option.option}
                    <input type="checkbox" id={option.optionId} name={question.questionId} value={option.optionId} checked={
                    checkArray.lastIndexOf(option.optionId) >= 0 ? true : false} onChange={(e)=> handleChange(e)}/>
                    <span className={styles.boxCheckmark}></span>
                    </label>
                    )
                      )
                      }
                    </div>
            </div>
            )}
             <div>
                <button className={styles.button} onClick={prevStep}>Back</button>
                <button className={styles.button} onClick={nextStep} >Next</button>
           </div>
            </fieldset>
          }
        </form>
        ):(<p>Loading...</p>)}
        </div>
        <div className={styles.cms_grid}>
          <h3 className={styles.cms_text}>CMS’s that matches your requirement so far</h3>
          <p>Answer all the questions to see the CMS that would best match your requirements</p>
            {cmsImagesVlaue.map((image,index)=>
            <div key={index} className={styles.cms_img}>
              <Image key={index} src={image.image} alt={image.CMS}/>
              </div>
            )
            }
        </div>
     </div>
    </div>
  )
}




