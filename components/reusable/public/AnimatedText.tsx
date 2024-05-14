"use client"
import React from 'react'
import { motion } from 'framer-motion' 

const AnimatedText = ({text, className,style} : {
    text: string ,
    className:string,
    style? : object
}) => {

    const words = text.split('-');

    const container  = {
        hidden: { opacity:0 },
        visible: (i = 1) =>({
            opacity:1,
            transition: {
              staggerChildren: 0.12, delayChildren: 0.06 * i
            },
        }),
    }
    const child = {
        visible: {
          opacity: 1,
          x: 0,
          transition: {
            type: "spring",
            damping: 19,
            stiffness: 100,
          },
        },
        hidden: {
          opacity: 0,
          x: 20,
          transition: {
            type: "spring",
            damping: 19,
            stiffness: 100,
          },
        },
      };
  return (
    <motion.div
      style={{display: "flex", fontSize: "1.4rem" }}
      className='flex flex-wrap justify-start'
      whileInView="visible"
                viewport={{once: true}}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, index) => (
        <motion.span
        className={`${className} mt-[0px] sm:mt-[-10px]`}
          variants={child}
          style={{ marginRight: "15px" }}
          key={index}
        >
          {word.replace('_',' ')}
        </motion.span>
      ))}
    </motion.div>
  )
}

export default AnimatedText
