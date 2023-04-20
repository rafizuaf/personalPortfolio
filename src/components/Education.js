import React, { useRef } from "react";
import {motion, useScroll } from "framer-motion";
import LiIcon from "./LiIcon";

const Details = ({ type, time, place, info }) => {
    const ref = useRef(null);

    return (
        <li ref={ref} className="my-8 first:mt-0 last:mb-0 w-[60%] mx-auto flex flex-col items-start justify-start">
        
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
            <h3 className="font-bold text-2xl">
                {type}
            </h3>
            <span className="capitalize font-medium text-dark/75">
                {time} |&nbsp;
            </span>
            <span className="capitalize font-medium text-primary">
                {place}
            </span>
            <p className="font-medium w-full">
                {info}
            </p>
        </motion.div>
    </li>
    )
};

const Education = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'center start']
    });

    return (
        <div className="my-64">
            <h2 className="font-bold text-8xl mb-32 w-full text-center">
                Education
            </h2>

            <div ref={ref} className="w-[75%] mx-auto relative">

                <motion.div 
                    style={{ scaleY: scrollYProgress }}
                    className="absolute left-9 top-0 w-[4px] h-full bg-dark origin-top" />

                <ul className="w-full flex flex-col justify-between ml-4">
                    <Details
                        type="Bachelor of Engineering in Mechanical Engineering"
                        time="2016 - 2020"
                        place="Mercu Buana University"
                        info="GPA: 3.11"
                        />
                    <span className="capitalize text-2xl font-medium text-dark/75 my-8 first:mt-0 last:mb-0 w-[60%] mx-auto flex items-start justify-start">
                        Non-formal Education
                    </span>
                    <Details
                        type="Bootcamp Full Stack Web Developer"
                        time="Dec 2022 - Apr 2023"
                        place="harisenin.com"
                        info="Graduated Full-Stack Web Developer bootcamp program from harisenin.com for deepening skills in Web Development. Relevant skills included JavaScript, Tailwind CSS, React.js, Node.js, Express.js, and MySQL."
                        />
                </ul>
            </div>
        </div>
    );
};

export default Education;
