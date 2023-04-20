import React from 'react'
import Head from 'next/head'
import Link from 'next/link';
import Image from 'next/image';

import AnimatedText from '@/components/AnimatedText'
import Layout from '@/components/Layout'
import { GithubIcon } from '@/components/Icons';

import Featured1 from '../../public/images/projects/NetflixClone.jpg'
import Featured2 from '../../public/images/projects/Kalibrr.jpg'

import Project1 from '../../public/images/projects/ProductLandingPage.jpg'
import Project2 from '../../public/images/projects/SurveyForm.jpg'
import Project3 from '../../public/images/projects/TechDoc.jpg'
import Project4 from '../../public/images/projects/WebPorto.jpg'

const FeaturedProject = ({ type, title, summary, img, link, github }) => {
    return (
        <article 
            className='
                w-full 
                flex 
                items-center 
                justify-between 
                rounded-3xl 
                border 
                border-solid 
                border-dark
                bg-light
                shadow-2xl
                p-12
            '
        >
            <Link
                className='w-1/2 cursor-pointer overflow-hidden rounded-lg'
                href={link} 
                target='_blank'
            >
                <Image 
                    src={img} 
                    alt={title} 
                    className='w-full h-auto' 
                />
            </Link>

            <div 
                className='
                    w-1/2
                    flex
                    flex-col
                    items-start
                    justify-between
                    pl-6
                '
            >
                <span 
                    className='
                        text-primary
                        font-medium
                        text-xl
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
                            text-4xl
                            font-bold
                        '
                    >
                        {title}
                    </h2>
                </Link>
                <p 
                    className='
                        my-2 
                        font-medium 
                        text-dark 
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
                        className='w-10'
                    >
                        <GithubIcon />
                    </Link>
                    <Link 
                        href={link} 
                        target='_blank'
                        className='
                            ml-4
                            rounded-lg
                            bg-dark
                            text-light
                            p-2
                            px-6
                            text-lg
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
                border-dark 
                bg-light 
                p-6 
                relative
            '
        >
            <Link
                className='w-full cursor-pointer overflow-hidden rounded-lg'
                href={link} 
                target='_blank'
            >
                <Image 
                    src={img} 
                    alt={title} 
                    className='w-full h-auto' 
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
                        text-primary
                        font-medium
                        text-xl
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
                            text-3xl
                            font-bold
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
                            text-lg
                            font-semibold
                            underline
                        '
                    >
                        Demo
                    </Link>
                    <Link 
                        href={github} 
                        target='_blank'
                        className='w-8'
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
            <main className='w-full mb-16 flex flex-col items-center justify-center'>
                <Layout className='pt-16'>
                    <AnimatedText text='Take a look!' className='mb-16' />
                    <div className='grid grid-cols-12 gap-24'>
                        <div className='col-span-12'>
                            <FeaturedProject 
                                title='Netflix Clone' 
                                img={Featured1}
                                summary='A Netflix-like web app using React.JS, Next.JS, Prisma, MongoDB, NextAuth, and Tailwind CSS.'
                                link='https://konzflix.vercel.app/'
                                type='Featured Project'
                                github='https://github.com/rafizuaf/netflix-clone'
                            />
                        </div>
                        <div className='col-span-6'>
                            <Project 
                                title='Product Landing Page' 
                                img={Project1}
                                link='https://freecodecamp-product-landing-page.vercel.app/'
                                type='Landing Page'
                                github='https://github.com/rafizuaf/freecodecamp-ProductLandingPage'
                            />
                        </div>
                        <div className='col-span-6'>
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
                                summary='A job portal clone. Built using React.JS, Express.JS, Node.JS, MySQL, and Tailwind CSS.'
                                link='https://kalibrr.vercel.app/'
                                type='Featured Project'
                                github='https://github.com/harisenincom-batch4-team1/'
                            />
                        </div>
                        <div className='col-span-6'>
                            <Project 
                                title='JavaScript Technical Documentation Page' 
                                img={Project3}
                                link='https://freecodecamp-survey-form-six.vercel.app/'
                                type='Landing Page'
                                github='https://github.com/rafizuaf/freecodecamp-SurveyForm'
                            />
                        </div>
                        <div className='col-span-6'>
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