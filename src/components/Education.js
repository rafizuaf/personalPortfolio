import React, { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import LiIcon from "./LiIcon";

const Details = ({ type, time, place, info }) => {
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
                    {type}
                </h3>
                <span className="capitalize font-medium text-dark/75 dark:text-light/75 xs:text-sm">
                    {time} |&nbsp;
                </span>
                <span className="capitalize font-medium text-primary dark:text-secondary">
                    {place}
                </span>
                <p className="font-medium w-full md:text-sm">
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
            <h2
                className="
                    font-bold 
                    text-8xl md:text-6xl xs:text-4xl 
                    mb-32 
                    w-full 
                    text-center
                "
            >
                Education
            </h2>

            <div ref={ref} className="w-[75%] lg:w-[90%] md:w-full mx-auto relative">

                <motion.div
                    style={{ scaleY: scrollYProgress }}
                    className="absolute left-12 md:left-[30px] xs:left-[20px] top-2 w-[4px] md:w-[2px] h-full bg-dark dark:bg-light origin-top" />

                <ul className="w-full flex flex-col justify-between ml-4">
                    <Details
                        type="Bachelor of Engineering in Mechanical Engineering"
                        time="2016 - 2020"
                        place="Mercu Buana University"
                        info="GPA: 3.11"
                    />
                    <span className="capitalize text-2xl md:text-lg font-medium text-dark/75 dark:text-light/75 my-8 first:mt-0 last:mb-0 w-[60%] md:w-[70%] mx-auto flex items-start justify-start">
                        Non-formal Education
                    </span>
                    <Details
                        type="Bootcamp Full Stack Javascript Web Development"
                        time="October 2023 - January 2024"
                        place="Hacktiv8"
                        info="Graduated Full-Stack Web Developer bootcamp program from Hacktiv8 for deepening skills in Web Development. Relevant skills included JavaScript, Tailwind CSS, React.js, Node.js, Express.js, Next.js, PostgreSQL, MySQL, and many more."
                    />
                </ul>
            </div>
        </div>
    );
};

export default Education;
