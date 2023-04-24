import React from 'react'
import { motion } from 'framer-motion'

const Skill = ({ name, x, y }) => {
    return (
        <motion.div 
                    className='
                        flex 
                        items-center 
                        justify-center 
                        rounded-full 
                        font-semibold xs:font-bold
                        md:text-sm 
                        bg-dark dark:bg-light sm:bg-transparent sm:dark:bg-transparent
                        text-light dark:text-dark sm:text-dark sm:dark:text-light
                        py-3 lg:py-2 md:py-1.5
                        px-6 lg:px-4 md:px-3
                        shadow-dark dark:shadow-light
                        cursor-pointer
                        absolute
                    '
                    whileHover={{
                        scale: 1.05,
                    }}
                    initial={{
                        x:0, y:0
                    }}
                    whileInView={{
                        x:x, y:y,
                        transition: { duration: 1.5 }
                    }}
                    viewport={{
                        once: true,
                    }}
                >
                    {name}
                </motion.div>
    )
}

const Skills = () => {
    return (
        <>
            <h2 
                className='
                    font-bold 
                    text-8xl md:text-6xl
                    mt-64 md:mt-32
                    w-full 
                    text-center
                '
            >
                Skills
            </h2>
            {/* repeating-radial-gradient() */}
            <div 
                className='
                    w-full 
                    h-screen lg:h-[80vh] sm:h-[60vh] xs:h-[50vh]
                    relative 
                    flex 
                    items-center 
                    justify-center 
                    rounded-full 
                    bg-circularLight lg:bg-circularLightLg md:bg-circularLightMd sm:bg-circularLightSm 
                    dark:bg-circularDark lg:dark:bg-circularDarkLg md:dark:bg-circularDarkMd sm:dark:bg-circularDarkSm
                '
            >

                <motion.div 
                    className='
                        flex 
                        items-center 
                        justify-center 
                        rounded-full 
                        font-semibold
                        xs:text-xs
                        bg-dark dark:bg-light
                        text-light dark:text-dark
                        p-5 lg:p-4 md:p-2 xs:p-1
                        shadow-dark dark:shadow-light
                        cursor-pointer
                    '
                    whileHover={{
                        scale: 1.05,
                    }}
                >
                    Web
                </motion.div>

                <Skill name='CSS' x='-5vw' y='-9vw'/>
                <Skill name='HTML' x='-8vw' y='4vw'/>
                <Skill name='JavaScript' x='14vw' y='4vw'/>
                <Skill name='React.js' x='0vw' y='12vw'/>
                <Skill name='Next.js' x='-20vw' y='-15vw'/>
                <Skill name='Express.js' x='17vw' y='-12vw'/>
                <Skill name='Tailwind CSS' x='30vw' y='-5vw'/>
                <Skill name='Github' x='0vw' y='-21.5vw'/>
                <Skill name='MongoDB' x='-30vw' y='18vw'/>
                <Skill name='MySQL' x='-37vw' y='2vw'/>

            </div>
        </>
    )
}

export default Skills