import Link from 'next/link';
import React, { useState } from 'react'
import Logo from './Logo';
import { useRouter } from 'next/router';
import { EmailIcon, GithubIcon, LinkedInIcon, MoonIcon, SunIcon } from './Icons';
import { motion } from 'framer-motion';
import useThemeSwitcher from './hooks/useThemeSwitcher';

const CustomLink = ({ href, title, className = "" }) => {
    const router = useRouter();
    return (
        <Link href={href} className={`${className} relative group`}>
            {title}

            <span
                className={`
                h-[1px] 
                inline-block 
                bg-dark dark:bg-light
                absolute 
                left-0 
                -bottom-0.5
                group-hover:w-full
                transition-[width]
                ease
                duration-300
                ${router.asPath === href ? 'w-full' : 'w-0'}
                `}
            >
                &nbsp;
            </span>
        </Link>
    );
};

const CustomMobileLink = ({ href, title, className = "", toggle }) => {
    const router = useRouter();

    const handleClick = () => {
        toggle();
        router.push(href)
    }

    return (
        <button href={href} className={`${className} relative group text-light dark:text-dark my-2`} onClick={handleClick}>
            {title}

            <span
                className={`
                h-[1px] 
                inline-block 
                bg-light dark:bg-dark
                absolute 
                left-0 
                -bottom-0.5
                group-hover:w-full
                transition-[width]
                ease
                duration-300
                ${router.asPath === href ? 'w-full' : 'w-0'}
                `}
            >
                &nbsp;
            </span>
        </button>
    );
};

const Navbar = () => {
    const [mode, setMode] = useThemeSwitcher();
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen(!isOpen);
    }

    return (
        <header
            className='
                w-full 
                px-32 lg:px-16 md:px-12 sm:px-8
                py-8 
                font-medium 
                flex 
                items-center 
                justify-between
                text-dark dark:text-light
                relative
                z-10
            '
        >

            <button className='hidden lg:flex flex-col justify-center items-center' onClick={handleClick}>
                <span className={`bg-dark dark:bg-light transition-all duration-300 ease-out block h-0.5 w-6 rounded-sm ${isOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`}></span>
                <span className={`bg-dark dark:bg-light transition-all duration-300 ease-out block h-0.5 w-6 rounded-sm my-0.5 ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`bg-dark dark:bg-light transition-all duration-300 ease-out block h-0.5 w-6 rounded-sm ${isOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`}></span>
            </button>

            {/* desktop menu */}

            <div
                className='
                    w-full 
                    flex 
                    justify-between 
                    items-center 
                    lg:hidden
                '
            >
                <nav>
                    <CustomLink href='/' title='Home' className='mr-4' />
                    <CustomLink href='/about' title='About' className='mx-4' />
                    <CustomLink href='/projects' title='Projects' className='ml-4' />
                </nav>

                <nav className='flex items-center justify-center flex-wrap'>
                    <motion.a
                        className='w-8 mx-3 flex justify-center items-center rounded-full'
                        href='mailto:mukhtar.r.f@gmail.com'
                        target={'_blank'}
                        whileHover={{
                            y: -2,
                        }}
                        whileTap={{
                            scale: 0.9
                        }}
                    >
                        <EmailIcon />
                    </motion.a>
                    <motion.a
                        className='w-6 mx-3'
                        href='https://github.com/rafizuaf'
                        target={'_blank'}
                        whileHover={{
                            y: -2,
                        }}
                        whileTap={{
                            scale: 0.9
                        }}
                    >
                        <GithubIcon />
                    </motion.a>
                    <motion.a
                        className='w-6 mx-3'
                        href='https://www.linkedin.com/in/rafizuaf/'
                        target={'_blank'}
                        whileHover={{
                            y: -2,
                        }}
                        whileTap={{
                            scale: 0.9
                        }}
                    >
                        <LinkedInIcon />
                    </motion.a>

                    <button
                        onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
                        className={`
                        mx-3 
                        flex 
                        items-center 
                        justify-center 
                        rounded-full 
                        p-1
                        ${mode === 'light' ? 'bg-dark text-light' : 'bg-light text-dark'}
                    `}
                    >
                        {
                            mode === 'dark' ?
                                <SunIcon className={'fill-dark'} />
                                :
                                <MoonIcon className={'fill-dark'} />
                        }
                    </button>

                </nav>
            </div>

            {/* mobile menu */}

            {
                isOpen ?
                    <motion.div
                        initial={{
                            scale: 0,
                            opacity: 0,
                            x: '-50%',
                            y: '-50%',
                        }}
                        animate={{
                            scale: 1,
                            opacity: 1,
                        }}
                        className='
                    min-w-[70vw] 
                    flex 
                    flex-col 
                    justify-between 
                    z-30 
                    items-center 
                    fixed 
                    top-1/2 
                    left-1/2 
                    -translate-x-1/2 
                    -translate-y-1/2 
                    bg-dark/90 dark:bg-light/75
                    rounded-lg
                    backdrop-blur-md
                    py-32
                '
                    >
                        <nav className='flex items-center flex-col justify-center'>
                            <CustomMobileLink href='/' title='Home' className='' toggle={handleClick} />
                            <CustomMobileLink href='/about' title='About' className='' toggle={handleClick} />
                            <CustomMobileLink href='/projects' title='Projects' className='' toggle={handleClick} />
                        </nav>

                        <nav className='flex items-center justify-center flex-wrap mt-2'>
                            <motion.a
                                className='w-6 mx-3 sm:mx-1 text-light dark:text-dark rounded-full'
                                href='mailto:mukhtar.r.f@gmail.com'
                                target={'_blank'}
                                whileHover={{
                                    y: -2,
                                }}
                                whileTap={{
                                    scale: 0.9
                                }}
                            >
                                <EmailIcon />
                            </motion.a>
                            <motion.a
                                className='w-6 mx-3 sm:mx-1 bg-light dark:bg-dark rounded-full'
                                href='https://github.com/rafizuaf'
                                target={'_blank'}
                                whileHover={{
                                    y: -2,
                                }}
                                whileTap={{
                                    scale: 0.9
                                }}
                            >
                                <GithubIcon />
                            </motion.a>
                            <motion.a
                                className='w-6 mx-3 sm:mx-1'
                                href='https://www.linkedin.com/in/rafizuaf/'
                                target={'_blank'}
                                whileHover={{
                                    y: -2,
                                }}
                                whileTap={{
                                    scale: 0.9
                                }}
                            >
                                <LinkedInIcon />
                            </motion.a>

                            <button
                                onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
                                className={`
                        w-6 
                        mx-3 sm:mx-1
                        flex 
                        items-center 
                        justify-center 
                        rounded-full 
                        p-1
                        ${mode === 'light' ? 'bg-dark text-light' : 'bg-light text-dark'}
                    `}
                            >
                                {
                                    mode === 'dark' ?
                                        <SunIcon className={'fill-dark'} />
                                        :
                                        <MoonIcon className={'fill-dark'} />
                                }
                            </button>

                        </nav>
                    </motion.div>
                    :
                    null
            }

            <div className='absolute left-[50%] top-2 translate-x-[-50%]'>
                <Logo />
            </div>

        </header>
    )
}

export default Navbar;