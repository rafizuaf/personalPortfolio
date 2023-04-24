import React from 'react'
import Layout from './Layout'
import Link from 'next/link'

const Footer = () => {
    return (
        <footer 
            className='
                w-full 
                border-t-2 
                border-solid 
                border-dark dark:border-light
                font-md 
                text-lg sm:text-base
            '
        >
            <Layout className='py-8 lg:py-6 flex lg:flex-col items-center justify-between text-dark dark:text-light md:text-center'>
                <span>{new Date().getFullYear()} &copy; All Rights Reserved.</span>
                <span className='flex items-center lg:py-2 md:text-center'>
                    Made under exhaustion and compulsion <span className='text-primary dark:text-secondary text-2xl px-1'>&#9825;</span>
                </span>
            </Layout>
        </footer>
    )
}

export default Footer