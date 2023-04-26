import React from 'react'
import Head from 'next/head'
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

import AnimatedText from '@/components/AnimatedText'
import Layout from '@/components/Layout'
import TransitionEffect from '@/components/TransitionEffect';
import { GithubIcon } from '@/components/Icons';

import Featured1 from '../../public/images/projects/NetflixClone.jpg'
import Featured2 from '../../public/images/projects/Kalibrr.jpg'

import Project1 from '../../public/images/projects/ProductLandingPage.jpg'
import Project2 from '../../public/images/projects/SurveyForm.jpg'
import Project3 from '../../public/images/projects/TechDoc.jpg'
import Project4 from '../../public/images/projects/WebPorto.jpg'

const FramerImage = motion(Image);

const FeaturedProject = ({ type, title, summary, img, link, github }) => {
    return (
        <article 
            className='
                w-full 
                flex lg:flex-col
                items-center 
                justify-between 
                rounded-3xl xs:rounded-2xl
                border 
                border-solid 
                border-dark dark:border-light
                bg-light dark:bg-dark
                shadow-2xl
                p-12 lg:p-8 xs:p-4
                relative
                rounded-br-2xl xs:rounded-br-3xl
            '
        >

            <div
                className="
                    absolute 
                    top-0 
                    -right-4 xs:-right-2
                    -z-10 
                    w-[101%] xs:w-full
                    h-[103%] sm:h-[102%]
                    rounded-[2.5rem] xs:rounded-[1.5rem]
                    bg-dark dark:bg-light
                    rounded-br-3xl
                "
            />
            <Link
                className='
                    w-1/2 lg:w-full 
                    cursor-pointer 
                    overflow-hidden 
                    rounded-lg
                '
                href={link} 
                target='_blank'
            >
                <FramerImage 
                    whileHover={{
                        y: -5,
                    }}
                    transition={{
                        duration: 0.2,
                    }}
                    priority
                    sizes="
                        (max-width: 768px) 100vw,
                        (max-width: 1200px) 500vw,
                        50vw
                    "
                    src={img} 
                    alt={title} 
                    className='
                        w-full 
                        h-auto
                        bg-cover
                        ' 
                />
            </Link>

            <div 
                className='
                    w-1/2 lg:w-full
                    flex
                    flex-col
                    items-start
                    justify-between
                    pl-6 lg:pl-0
                    lg:pt-6
                '
            >
                <span 
                    className='
                        text-primary dark:text-secondary
                        font-medium
                        text-xl xs:text-base
                    '
                >
                    {type}
                </span>
                <Link 
                    href={link} 
                    target='_blank' 
                    className='hover:underline underline-offset-4'
                >
                    <h2 
                        className='
                            my-2
                            w-full
                            text-left
                            text-4xl sm:text-sm
                            font-bold
                            text-dark dark:text-light
                        '
                    >
                        {title}
                    </h2>
                </Link>
                <p 
                    className='
                        my-2 
                        font-medium 
                        text-dark dark:text-light
                        sm:text-sm
                    '
                >
                    {summary}
                </p>
                <div 
                    className='
                        mt-2
                        flex
                        items-center
                    '
                >
                    <Link 
                        href={github} 
                        target='_blank'
                        className='w-10 text-dark dark:text-light'
                    >
                        <GithubIcon />
                    </Link>
                    <Link 
                        href={link} 
                        target='_blank'
                        className='
                            ml-4
                            rounded-lg
                            bg-dark dark:bg-light
                            text-light dark:text-dark
                            p-2
                            px-6 sm:px-4
                            text-lg sm:text-base
                            font-semibold
                        '
                    >
                        Live Demo
                    </Link>
                </div>
            </div>
        </article>
    )
};

const Project = ({ title, type, img, link, github }) => {
    return (
        <article 
            className='
                w-full 
                flex
                flex-col
                items-center 
                justify-center 
                rounded-2xl 
                border 
                border-solid 
                border-dark dark:border-light
                bg-light dark:bg-dark
                p-6 xs:p-4
                relative
                rounded-br-xl
            '
        >
            <div
                className="
                    absolute 
                    top-0 
                    -right-3 md:-right-2
                    -z-10 
                    w-[101%] md:w-[101%]
                    h-[103%] xs:h-[102%]
                    rounded-[2rem] xs:rounded[1.5rem]
                    bg-dark dark:bg-light
                    rounded-br-3xl
                "
            />
            <Link
                className='w-full cursor-pointer overflow-hidden rounded-lg'
                href={link} 
                target='_blank'
            >
                <FramerImage
                    whileHover={{
                        y: -5,
                    }}
                    transition={{
                        duration: 0.2,
                    }}
                    priority
                    sizes="
                        (max-width: 768px) 100vw,
                        (max-width: 1200px) 500vw,
                        50vw
                    "
                    src={img} 
                    alt={title} 
                    className='
                        w-full
                        h-auto
                        bg-cover
                    ' 
                />
            </Link>

            <div 
                className='
                    w-full
                    flex
                    flex-col
                    items-start
                    justify-between
                    mt-4
                '
            >
                <span 
                    className='
                        text-primary dark:text-secondary
                        font-medium
                        text-xl lg:text-lg md:text-base
                    '
                >
                    {type}
                </span>
                <Link 
                    href={link} 
                    target='_blank' 
                    className='hover:underline underline-offset-4'
                >
                    <h2 
                        className='
                            my-2
                            w-full
                            text-left
                            text-3xl lg:text-2xl
                            font-bold
                            text-dark dark:text-light
                        '
                    >
                        {title}
                    </h2>
                </Link>
                <div 
                    className='
                        w-full
                        mt-2
                        flex
                        items-center
                        justify-between
                    '
                >
                    <Link 
                        href={link} 
                        target='_blank'
                        className='
                            text-lg md:text-base
                            font-semibold
                            underline
                            text-dark dark:text-light
                        '
                    >
                        Demo
                    </Link>
                    <Link 
                        href={github} 
                        target='_blank'
                        className='w-8 md:w-6 text-dark dark:text-light'
                    >
                        <GithubIcon />
                    </Link>
                    
                </div>
            </div>
        </article>
    )
}

const projects = () => {
    return (
        <>
            <Head>
                <title>Projects</title>
                <meta name="description" content="my projects" />
            </Head>
            <TransitionEffect />
            <main className='w-full mb-16 flex flex-col items-center justify-center text-dark dark:text-light'>
                <Layout className='pt-16'>
                    <AnimatedText text='Take a look!' className='mb-16 lg:!text-7xl sm:!text-6xl xs:!text-4xl sm:mb-8' />
                    <div 
                        className='
                            grid 
                            grid-cols-12 
                            gap-24 
                            gap-y-32 md:gap-y-24
                            xl:gap-x-16 lg:gap-x-8 sm:gap-x-0
                        '
                    >
                        <div className='col-span-12'>
                            <FeaturedProject 
                                title='Netflix Clone' 
                                img={Featured1}
                                summary='A Netflix-like web app using React.js, Next.js, Prisma, MongoDB, NextAuth, and Tailwind CSS.'
                                link='https://konzflix.vercel.app/'
                                type='Featured Project'
                                github='https://github.com/rafizuaf/netflix-clone'
                            />
                        </div>
                        <div className='col-span-6 sm:col-span-12'>
                            <Project 
                                title='Product Landing Page' 
                                img={Project1}
                                link='https://freecodecamp-product-landing-page.vercel.app/'
                                type='Landing Page'
                                github='https://github.com/rafizuaf/freecodecamp-ProductLandingPage'
                            />
                        </div>
                        <div className='col-span-6 sm:col-span-12'>
                            <Project 
                                title='Survey Form' 
                                img={Project2}
                                link='https://freecodecamp-survey-form-six.vercel.app/'
                                type='Landing Page'
                                github='https://github.com/rafizuaf/freecodecamp-SurveyForm'
                            />
                        </div>

                        <div className='col-span-12'>
                            <FeaturedProject 
                                title='Job Portal' 
                                img={Featured2}
                                summary='A job portal clone. Built using React.js, Express.js, Node.js, MySQL, and Tailwind CSS.'
                                link='https://kalibrr.vercel.app/'
                                type='Featured Project'
                                github='https://github.com/harisenincom-batch4-team1/'
                            />
                        </div>
                        <div className='col-span-6 sm:col-span-12'>
                            <Project 
                                title='JavaScript Technical Documentation Page' 
                                img={Project3}
                                link='https://freecodecamp-techdocpage.vercel.app/'
                                type='Landing Page'
                                github='https://github.com/rafizuaf/freecodecamp-TechDocPage'
                            />
                        </div>
                        <div className='col-span-6 sm:col-span-12'>
                            <Project 
                                title='Simple Portfolio Website' 
                                img={Project4}
                                link='https://simple-portfolio-rafizuaf.vercel.app/'
                                type='Landing Page'
                                github='https://github.com/rafizuaf/portoReactJS'
                            />
                        </div>
                    </div>
                </Layout>
            </main>
        </>
    )
}

export default projects