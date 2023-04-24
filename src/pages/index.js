import Image from "next/image";
import Head from "next/head";

import Layout from "@/components/Layout";
import AnimatedText from "@/components/AnimatedText";
import TransitionEffect from "@/components/TransitionEffect";

import ProfilePic from "../../public/images/pp.png";
import Link from "next/link";
import { DownloadIcon, EmailIcon } from "@/components/Icons";

export default function Home() {
  return (
    <>
      <Head>
        <title>Welcome</title>
        <meta name="description" content="Built using Next" />
      </Head>
      <TransitionEffect />
      <main 
        className="
          flex 
          items-center 
          text-dark 
          dark:text-light 
          w-full 
          min-h-screen">
        <Layout className="pt-0 md:pt-16 sm:pt-8">
          <div className="flex lg:flex-col items-center justify-between w-full">
            <div className="w-1/2 md:w-full">
              <Image 
                priority 
                className="
                  w-3/4 md:w-full
                  h-auto 
                  lg:hidden md:inline-block
                  md:mb-8
                  md:-mt-16 sm:-mt-48
                  " 
                src={ProfilePic} 
                alt="Rafi" 
                sizes="
                  (max-width: 768px) 100vw,
                  (max-width: 1200px) 500vw,
                  50vw
                "
                />
            </div>
            <div 
              className="
                w-1/2 lg:w-full 
                flex 
                flex-col 
                items-center 
                self-center
                lg:text-center
              "
            >
              <AnimatedText 
                text='Turning Vision Into Reality.' 
                className="
                  !text-6xl xl:!text-5xl lg:!text-6xl md:!text-5xl sm:!text-3xl
                  !text-left lg:!text-center
                "
              />
              <p className="my-4 text-base font-medium md:text-sm">
                Graduated Full-Stack Web Developer bootcamp program from
                harisenin.com for deepening skills in Web Developer. Explore my
                latest projects, showcasing my expertise in web development.
              </p>
              <div className="flex items-center self-start lg:self-center mt-2">
                <Link 
                  className="
                    flex 
                    items-center 
                    bg-dark dark:bg-light
                    text-light dark:text-dark
                    p-2.5 md:p-2
                    px-6 md:px-2
                    rounded-lg
                    text-lg md:text-base
                    font-semibold
                    border-2
                    border-solid
                    border-transparent
                    hover:bg-light hover:dark:bg-dark
                    hover:border-dark hover:dark:border-light
                    hover:text-dark hover:dark:text-light
                    "
                  href='/resume.pdf' 
                  target={"_blank"}
                  >
                    Resume 
                    <DownloadIcon className='ml-1' />
                </Link>

                <Link 
                  className="
                    flex 
                    items-center 
                    bg-primary dark:bg-secondary
                    text-light dark:text-dark
                    p-2.5 md:p-2
                    px-4 md:px-1
                    rounded-lg
                    text-lg md:text-base
                    font-semibold
                    border-2
                    border-solid
                    border-transparent
                    hover:bg-light hover:dark:bg-dark
                    hover:border-primary hover:dark:border-secondary
                    hover:text-primary hover:dark:text-secondary
                    mx-4
                    "
                  href='mailto:mukhtar.r.f@gmail.com' 
                  target={"_blank"}
                  >
                    Contact&nbsp;Me
                    <EmailIcon className='ml-1' />
                </Link>
              </div>
            </div>
          </div>
        </Layout>
      </main>
    </>
  );
}
