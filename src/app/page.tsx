import Contact from "@/components/sections/Contact";
import Credentials from "@/components/sections/Credentials";
import Hero from "@/components/sections/Hero";
import Log from "@/components/sections/Log";
import Logbook from "@/components/sections/Logbook";
import Nav from "@/components/sections/Nav";
import Stack from "@/components/sections/Stack";
import Statement from "@/components/sections/Statement";
import Work from "@/components/sections/Work";
import StructuredData from "@/components/StructuredData";

export default function HomePage() {
  return (
    <>
      <StructuredData />
      <Nav />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Statement />
        <Logbook />
        <Work />
        <Stack />
        <Credentials />
        <Log />
      </main>
      <Contact />
    </>
  );
}
