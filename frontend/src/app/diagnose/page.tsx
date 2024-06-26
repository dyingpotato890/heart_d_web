"use client"
import React from 'react'
import { motion } from "framer-motion";
import axios from 'axios'
import { AuroraBackground } from "../components/ui/aurora-background";
import Link from "next/link";
import { useState,useEffect } from 'react';
import Tfield from '../components/Tfield'
import Selecter from '../components/Selecter'
import Chestpain from '../components/Chestpain'
import Sugar from '../components/Sugar'
import Ecg from '../components/Ecg'
import Slope from '../components/Slope'
import Angina from '../components/Angina'
import Card from '../components/ui/Card'
import { TypewriterEffect } from '../components/ui/type-writer';
interface Word {
  text: string;
  className?: string;
}
const PageComponent = () => {
  const [count, setCount] = useState(0)
  const[age,setage]=useState("0");
  const[sex,setsex]=useState("0");
  const[chestpain,setchestpain]=useState("1");
  const[restingbp,setrestingbp]=useState("0");
  const[cholestrol,setcholestrol]=useState("0");
  const[sugar,setsugar]=useState("0");
  const[ecg,setecg]=useState("0");
  const[heart,setheart]=useState("0");
  const[angina,setangina]=useState("0");
  const[peak,setpeak]=useState("0")
  const[slope,setslope]=useState("1");
  const[array,setarray]=useState<number[]>([]);
  const[result,setresult]=useState()
  const[percentage,setpercentage]=useState(0)
  const[text,settext]=useState<Word[]>([
    {
      text: "Fill",
    },
    {
      text: "the",
    },
    {
      text: "form",
    },
    {
      text: "to",
    },
    {
      text: "Check.",
      className: "text-yellow-500 dark:text-blue-500",
    },
  ],);
  const convertToNumber = (value: string): number => {
    return parseInt(value, 10); // Use parseInt to convert string to number
  };
  useEffect(() => {
    setarray([
      parseInt(age),
      parseInt(sex),
      parseInt(chestpain),
      parseInt(restingbp),
      parseInt(cholestrol),
      parseInt(sugar),
      parseInt(ecg),
      parseInt(heart),
      parseInt(angina),
      parseInt(peak),
      parseInt(slope)
    ]);
  }, [age, sex, chestpain, restingbp, cholestrol, sugar, ecg, heart, angina, peak, slope]);
  useEffect(() => {
    console.log("State array:", array);
  }, [array]);
console.log(percentage)
console.log(result)
 /*const handleclick= async()=>{
    console.log("clicked")
    const res=await fetch("http://localhost:5000/diagnose")
    const parsed=await res.json();
    console.log(parsed)
  }*/
  //https://heart-d-backend.onrender.com/diagnose
  const handleclick=async(): Promise<void> =>{
   const response= await fetch('https://heart-d-backend.onrender.com/diagnose', {
      method: 'POST', // Important for sending data
      headers: {
        'Content-Type': 'application/json', // Indicate JSON data
      },
      body: JSON.stringify({ numbers: [parseInt(age),
        parseInt(sex),
        parseInt(chestpain),
        parseInt(restingbp),
        parseInt(cholestrol),
        parseInt(sugar),
        parseInt(ecg),
        parseInt(heart),
        parseInt(angina),
        parseInt(peak),
        parseInt(slope)]}), // Replace with your numbers array
    })
    const data=await response.json();
    //console.log(data.result[0])
    //console.log(data.result[1])
    setresult(data.result[0])
    setpercentage(data.result[1]);
  };
  const words = [
    {
      text: "Your",
    },
    {
      text: "Heart",
    },
    {
      text: "is",
    },
    {
      text: "Totally",
    },
    {
      text: "Healthy.",
      className: "text-blue-500 dark:text-blue-500",
    },
    {
      text: `Accuracy  :${ percentage*100} %`,
      className: "text-grey-500 dark:text-blue-500",
    },
  ];
  const words2 = [
    {
      text: "Your",
    },
    {
      text: "Heart",
    },
    {
      text: "is",
    },
    {
      text: "Not",
      className: "text-red-500 dark:text-blue-500",
    },
    {
      text: "Healthy.",
      className: "text-red-500 dark:text-blue-500",
    },
    {
      text: `Accuracy  :${ percentage*100 }%`,
      className: "text-grey-500 dark:text-blue-500",
    },
  ];
  
  useEffect(()=>{
    if(result==0){
        settext(words)
    }
    else if(result==1){
      settext(words2)
    }
    setpercentage(percentage)
  },[result,percentage])
  return (
    <div className='w-screen h-[140vh] bg-white  justify-center content-center lg:h-[100vh]'
     >
    <AuroraBackground>
 <motion.div
   initial={{ opacity: 0.0, y: 40 }}
   whileInView={{ opacity: 1, y: 0 }}
   transition={{
     delay: 0.3,
     duration: 0.8,
     ease: "easeInOut",
   }}
   className="relative flex flex-col  gap-10 items-center justify-center px-4 pb-10 pt-80 lg:flex-row lg:pt-0"
 >  
  
   <div className='flex flex-col w-22 gap-y-[2vh] lg:w-1/2'>
<Tfield state={age} setstate={setage} title="age"/>
<Selecter state={sex} setstate={setsex}/>
<Chestpain state={chestpain} setstate={setchestpain}/>
<Tfield state={restingbp} setstate={setrestingbp} title="resting bp"/>
<Tfield state={cholestrol} setstate={setcholestrol} title="cholestrol"/>
</div>
<div className='flex flex-col w-22 gap-y-[2vh] lg:w-1/2'>
<Sugar state={sugar} setstate={setsugar}/>
<Ecg state={ecg} setstate={setecg}/>
<Tfield state={heart} setstate={setheart} title="max-heart-rate"/>
<Angina state={angina} setstate={setangina}/>
<Tfield state={peak} setstate={setpeak} title="Old Peak"/>
<Slope state={slope} setstate={setslope}/>

 </div>
   <button className="bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-4 py-2" onClick={handleclick}>
     Check
   </button>
 </motion.div>
 <TypewriterEffect words={text} percentage={percentage}></TypewriterEffect>
</AuroraBackground>
</div>
  )
}

export default PageComponent