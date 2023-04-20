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
                        font-semibold 
                        bg-dark 
                        text-light 
                        py-3
                        px-6 
                        shadow-dark
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
                        x:x, y:y
                    }}
                    transition={{
                        duration: 1.5,
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
                    text-8xl 
                    mt-64 
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
                    h-screen 
                    relative 
                    flex 
                    items-center 
                    justify-center 
                    rounded-full 
                    bg-circularLight
                '
            >

                <motion.div 
                    className='
                        flex 
                        items-center 
                        justify-center 
                        rounded-full 
                        font-semibold 
                        bg-dark 
                        text-light 
                        p-5 
                        shadow-dark
                        cursor-pointer
                    '
                    whileHover={{
                        scale: 1.05,
                    }}
                >
                    Web
                </motion.div>

                <Skill name='CSS' x='5vw' y='0vw'/>
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