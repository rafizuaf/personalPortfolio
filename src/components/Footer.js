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
                text-lg
            '
        >
            <Layout className='py-8 flex items-center justify-between text-dark dark:text-light'>
                <span>{new Date().getFullYear()} &copy; All Rights Reserved.</span>
                <div className='flex items-center'>
                    Made under exhaustion and compulsion <span className='text-primary dark:text-secondary text-2xl px-1'>&#9825;</span>
                </div>
            </Layout>
        </footer>
    )
}

export default Footer