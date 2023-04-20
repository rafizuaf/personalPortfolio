import React, { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";
import Head from "next/head";
import Image from "next/image";
import AnimatedText from "@/components/AnimatedText";
import Layout from "@/components/Layout";
import Skills from "@/components/Skills";
import profilePicture from "../../public/images/photo.png";
import Experience from "@/components/Experience";
import Education from "@/components/Education";

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
            <main className="flex w-full flex-col items-center justify-center">
                <Layout className="pt-16">
                    <AnimatedText
                        className="!text-3xl mb-16"
                        text='"So, how do we know that you are a good candidate?"'
                    />
                    <div className="grid w-full grid-cols-8 gap-16">
                        <div className="col-span-3 flex flex-col items-start justify-start">
                            <h2 className="mb-4 text-lg font-bold uppercase text-dark/75">
                                Say no more!
                            </h2>
                            <p className="font-medium">
                                Hi! I'm <span className="font-bold">Rafi,</span> a bachelor degree of Mechanical Engineering from
                                Mercu Buana University. Graduated Full-Stack Web Developer
                                bootcamp program from harisenin.com for deepening skills in Web
                                Developer. Experienced as a Full Stack Web Developer who works
                                with JavaScript, React.js, Next.js, Node.js, Express.js, MongoDB
                                and MySQL.
                            </p>
                            <p className="font-medium my-4">
                                I believe that design is about more than just making things look
                                pretty – it's about solving problems and creating intuitive,
                                enjoyable experiences for users.
                            </p>
                            <p className="font-medium">
                                I'm specialized in quickly learning new skills and programming
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
                                col-span-3 
                                relative 
                                w-96 
                                h-full 
                                rounded-2xl 
                                border-2 
                                border-solid 
                                border-dark 
                                bg-light 
                                p-8
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
                                    bg-dark
                                "
                            />
                            <Image src={profilePicture} alt="Rafi" className="w-full h-auto rounded-2xl" />
                        </div>

                        <div className="col-span-2 flex flex-col items-end justify-between">
                            <div className="flex flex-col items-end justify-center">
                                <span className="inline-block text-7xl font-bold">
                                    <AnimatedNumbers value={50} />+
                                </span>
                                <h2 className="text-xl font-medium text-dark/75">
                                    satisfied clients
                                </h2>
                                <p className="text-[10px]">
                                    *I'm joking bro I've got no client, pls hire me &#128557;
                                </p>
                            </div>
                            <div className="flex flex-col items-end justify-center">
                                <span className="inline-block text-7xl font-bold">
                                    <AnimatedNumbers value={5}/>+
                                </span>
                                <h2 className="text-xl font-medium text-dark/75">
                                    projects completed
                                </h2>
                            </div>
                            <div className="flex flex-col items-end justify-center">
                                <span className="inline-block text-7xl font-bold">
                                    <AnimatedNumbers value={1}/>+
                                </span>
                                <h2 className="text-xl font-medium text-dark/75">
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
