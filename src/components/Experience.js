import React, { useRef } from "react";
import {motion, useScroll } from "framer-motion";
import LiIcon from "./LiIcon";

const Details = ({ position, company, companyLink, time, address, work }) => {
    const ref = useRef(null);

    return (
        <li 
            ref={ref} 
            className="
                my-8 
                first:mt-0 
                last:mb-0 
                w-[60%] md:w-[70%]
                mx-auto 
                flex 
                flex-col 
                items-start 
                justify-start
            "
        >
        
        <LiIcon reference={ref} />
        
        <motion.div 
            initial={{
                y: 50,
            }}
            whileInView={{
                y: 0,
            }}
            transition={{
                duration: 0.5,
                type: 'spring',
            }}
            >
            <h3 className="font-bold text-2xl sm:text-xl xs:text-lg">
                {position}&nbsp; <a className="text-primary dark:text-secondary" target="_blank" href={companyLink}>@{company}</a>
            </h3>
            <span className="capitalize font-medium text-dark/75 dark:text-light/75 xs:text-sm">
                {time} | {address}
            </span>
            <p className="font-medium w-full md:text-sm">
                {work}
            </p>
        </motion.div>
    </li>
    )
};

const Experience = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'center start']
    });

    return (
        <div className="my-64">
            <h2 
                className="
                    font-bold 
                    text-8xl md:text-6xl xs:text-4xl
                    mb-32 md:mb-16
                    w-full 
                    text-center
                "
            >
                Experience
            </h2>

            <div ref={ref} className="w-[75%] lg:w-[90%] md:w-full mx-auto relative">

                <motion.div 
                    style={{ scaleY: scrollYProgress }}
                    className="absolute left-9 md:left-[30px] xs:left-[20px] top-0 w-[4px] md:w-[2px] h-full bg-dark dark:bg-light origin-top" />

                <ul className="w-full flex flex-col justify-between ml-4">
                    <Details
                        position="Full Stack Web Developer Student"
                        company="harisenin.com"
                        companyLink="https://www.harisenin.com/"
                        time="Dec 2022 - Apr 2023"
                        address="Remote"
                        work="Developed a job portal using Tailwind CSS, React.js, Node.js, Express.js and MySQL as a final project. Collaborated with a team of three via GitHub. Created several personal projects."
                    />
                </ul>
            </div>
        </div>
    );
};

export default Experience;
