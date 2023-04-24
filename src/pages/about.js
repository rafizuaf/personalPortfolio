import React, { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

import Head from "next/head";
import Image from "next/image";

import AnimatedText from "@/components/AnimatedText";
import Layout from "@/components/Layout";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import TransitionEffect from "@/components/TransitionEffect";

import ProfilePicture from "../../public/images/photo.png";

const AnimatedNumbers = ({ value }) => {
    const ref = useRef(null);

    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, { duration: 3000 });
    const isInView = useInView(ref);

    useEffect(() => {
        if(isInView) {
            motionValue.set(value);
        }
    }, [isInView, value, motionValue]);

    useEffect(() => {
        springValue.on('change', (latest) =>{
            if(ref.current && latest.toFixed(0) <= value) {
                ref.current.textContent = latest.toFixed(0);
            }
        })
    }, [springValue, value]);
    


    return <span ref={ref}></span>
}

const about = () => {
    return (
        <>
            <Head>
                <title>About</title>
                <meta name="description" content="about me" />
            </Head>
            <TransitionEffect />
            <main 
                className="
                    flex 
                    w-full 
                    flex-col 
                    items-center 
                    justify-center
                    text-dark dark:text-light
                "
            >
                <Layout className="pt-16">
                    <AnimatedText
                        className="
                            !text-4xl lg:!text-3xl sm:!text-2xl xs:!text-xl 
                            mb-16 sm:!mb-8
                            
                            "
                        text='"How do we know that you are a good candidate?"'
                    />
                    <div className="grid w-full grid-cols-8 gap-16 sm:gap-8">
                        <div className="col-span-3 xl:col-span-4 md:col-span-8 flex flex-col items-start justify-start md:order-2">
                            <h2 className="mb-4 text-lg font-bold uppercase text-dark/75 dark:text-light/75">
                                Say no more!
                            </h2>
                            <p className="font-medium md:text-center">
                                Hi! I'm <span className="font-bold text-primary dark:text-secondary">Rafi,</span> a bachelor degree of Mechanical Engineering from
                                Mercu Buana University. Graduated Full-Stack Web Developer
                                bootcamp program from harisenin.com for deepening skills in Web
                                Development.
                            </p>
                            <p className="font-medium my-4 md:text-center">
                                Experienced as a Full Stack Web Developer who works
                                with JavaScript, React.js, Next.js, Node.js, Express.js, MongoDB
                                and MySQL.
                            </p>
                            <p className="font-medium md:text-center">
                                Specialized in quickly learning new skills and programming
                                languages, implementing clean code principles, and creating
                                responsive designs that optimize website performance. Has
                                strengths in problem-solving, website optimization, discipline,
                                resilience, attention to small details, and analytical thinking.
                                A self-motivated, dedicated, and driven individual who is
                                passionate about developing innovative solutions to complex
                                problems and always strives to deliver high-quality work.
                            </p>
                        </div>

                        <div
                            className="
                                col-span-3 xl:col-span-4 md:col-span-8
                                relative
                                xs:max-w-sm
                                h-max 
                                rounded-2xl 
                                border-2 
                                border-solid 
                                border-dark dark:border-light/75
                                bg-light
                                p-8
                                md:order-1
                                md:justify-center
                                md:items-center
                            "
                        >
                            <div
                                className="
                                    absolute 
                                    top-0 
                                    -right-3 
                                    -z-10 
                                    w-[102%] 
                                    h-[103%] 
                                    rounded-[2rem] 
                                    bg-dark dark:bg-light/75
                                "
                            />
                            <Image 
                                src={ProfilePicture} 
                                alt="Rafi" 
                                className="w-full h-auto rounded-2xl" 
                                priority
                                sizes="
                                    (max-width: 768px) 100vw,
                                    (max-width: 1200px) 500vw,
                                    33vw
                                "
                            />
                        </div>

                        <div 
                            className="
                                col-span-2 xl:col-span-8 
                                flex flex-col xl:flex-row 
                                items-end xl:items-center
                                justify-between
                                md:order-3
                            "
                        >
                            <div className="hidden flex flex-col items-end xl:items-center justify-center">
                                <span className="inline-block text-7xl md:text-6xl sm:text-5xl xs:text-4xl font-bold">
                                    <AnimatedNumbers value={50} />+
                                </span>
                                <h2 className="text-xl md:text-lg sm:text-base xs:text-sm md:text-center font-medium text-dark/75 dark:text-light/75">
                                    satisfied clients
                                </h2>
                            </div>
                            <div className="flex flex-col items-end xl:items-center justify-center">
                                <span className="inline-block text-7xl md:text-6xl sm:text-5xl xs:text-4xl font-bold">
                                    <AnimatedNumbers value={5}/>+
                                </span>
                                <h2 className="text-xl md:text-lg sm:text-base xs:text-sm md:text-center font-medium text-dark/75 dark:text-light/75">
                                    projects completed
                                </h2>
                            </div>
                            <div className="flex flex-col items-end xl:items-center justify-center">
                                <span className="inline-block text-7xl md:text-6xl sm:text-5xl xs:text-4xl font-bold">
                                    <AnimatedNumbers value={1}/>+
                                </span>
                                <h2 className="text-xl md:text-lg sm:text-base xs:text-sm md:text-center font-medium text-dark/75 dark:text-light/75">
                                    years of experience
                                </h2>
                            </div>
                        </div>

                    </div>

                    <Skills />
                    <Experience />
                    <Education />
                    

                </Layout>
            </main>
        </>
    );
};

export default about;
