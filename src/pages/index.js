import Image from "next/image";
import Head from "next/head";

import Layout from "@/components/Layout";
import AnimatedText from "@/components/AnimatedText";

import profilePic from "../../public/images/pp.png";
import Link from "next/link";
import { DownloadIcon } from "@/components/Icons";

export default function Home() {
  return (
    <>
      <Head>
        <title>Welcome</title>
        <meta name="description" content="Built using Next" />
      </Head>
      <main className="flex items-center text-dark w-full min-h-screen">
        <Layout className="pt-0">
          <div className="flex items-center justify-between w-full">
            <div className="w-1/3">
              <Image className="w-full h-auto" src={profilePic} alt="Rafi" />
            </div>
            <div className="w-1/2 flex flex-col items-center self-center">
              <AnimatedText text='Turning vision into reality.' className="!text-6xl !text-left"/>
              <p className="my-4 text-base font-medium">
                Graduated Full-Stack Web Developer bootcamp program from
                harisenin.com for deepening skills in Web Developer. Explore my
                latest projects, showcasing my expertise in web development.
              </p>
              <div className="flex items-center self-start mt-2">
                <Link 
                  className="
                    flex 
                    items-center 
                    bg-dark 
                    text-light 
                    p-2.5 
                    px-6
                    rounded-lg
                    text-lg
                    font-semibold
                    hover:bg-light
                    hover:text-dark
                    border-2
                    border-solid
                    border-transparent
                    hover:border-dark
                    "
                  href='/resume.pdf' 
                  target={"_blank"}
                  >
                    Resume 
                    <DownloadIcon className='w-6 ml-1' />
                </Link>
              </div>
            </div>
          </div>
        </Layout>
      </main>
    </>
  );
}
