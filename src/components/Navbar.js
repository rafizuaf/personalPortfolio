import Link from 'next/link';
import React from 'react'
import Logo from './Logo';
import { useRouter } from 'next/router';
import { EmailIcon, GithubIcon, LinkedInIcon, MoonIcon, SunIcon } from './Icons';
import { motion } from 'framer-motion';
import useThemeSwitcher from './hooks/useThemeSwitcher';

const CustomLink = ({ href, title, className="" }) => {
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
    )
}

const Navbar = () => {
    const [mode, setMode] = useThemeSwitcher();
    
    return (
        <header 
            className='
                w-full 
                px-32 
                py-8 
                font-medium 
                flex 
                items-center 
                justify-between
                text-dark dark:text-light
            '
        >
            <nav>
                <CustomLink href='/' title='Home' className='mr-4'/>
                <CustomLink href='/about' title='About' className='mx-4'/>
                <CustomLink href='/projects' title='Projects' className='ml-4'/>
            </nav>
            
            <nav className='flex items-center justify-center flex-wrap'>
                <motion.a 
                    className='w-6 mr-2'
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
                    className='w-6 mx-2'
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
                    className='w-6 ml-2'
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
                    onClick={ () => setMode(mode === 'light' ? 'dark' : 'light') }
                    className={`
                        ml-3 
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

            <div className='absolute left-[50%] top-2 translate-x-[-50%]'>
                <Logo />
            </div>

        </header>
    )
}

export default Navbar;