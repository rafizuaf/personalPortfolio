import React, { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import LiIcon from "./LiIcon";

const Details = ({ position, company, companyLink, time, address, work }) => {
    const ref = useRef(null);

    const workParts = work.split('\n').filter(item => item.trim() !== '');
    const companyDescription = workParts[0];
    const bulletPoints = workParts.slice(1).map(point => point.replace(/^-\s*/, '').trim());

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
                initial={{ y: 50 }}
                whileInView={{ y: 0 }}
                transition={{
                    duration: 0.5,
                    type: 'spring',
                }}
            >
                <h3 className="font-bold text-2xl sm:text-xl xs:text-lg">
                    {position}&nbsp;
                    <a
                        className="text-primary dark:text-secondary"
                        target="_blank"
                        href={companyLink}
                    >
                        @{company}
                    </a>
                </h3>
                <span className="capitalize font-medium text-dark/75 dark:text-light/75 xs:text-sm">
                    {time} | {address}
                </span>
                <div className="font-medium w-full md:text-sm">
                    <p className="mb-2">{companyDescription}</p>
                    <ul className="list-disc pl-5">
                        {bulletPoints.map((point, index) => (
                            <li key={index}>{point}</li>
                        ))}
                    </ul>
                </div>
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
                    className="absolute left-12 md:left-[30px] xs:left-[20px] top-2 w-[4px] md:w-[2px] h-full bg-dark dark:bg-light origin-top" />

                <ul className="w-full flex flex-col justify-between ml-4">
                    <Details
                        position="Software Engineer"
                        company="Soedarpo Informatika"
                        companyLink="https://www.soedarpo.id/"
                        time="Mar 2023 - Present"
                        address="Jakarta, Indonesia - Hybrid"
                        work="Soedarpo Informatika, part of Samudera Indonesia, is an Indonesian IT and communications company. Developed a payment approval and asset management system using TypeScript, Next.js, and MySQL. Designed an intuitive interface with Ant Design and Shadcn, streamlining workflows and enhancing user experience while collaborating with cross-functional teams."
                    />
                </ul>
            </div>
        </div>
    );
};

export default Experience;
