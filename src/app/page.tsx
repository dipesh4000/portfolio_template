import { Navbar } from '@/components/layout/Navbar'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { DataBank } from '@/components/sections/DataBank'
import { Projects } from '@/components/sections/Projects'
import { Experience } from '@/components/sections/Experience'
import { Education } from '@/components/sections/Education'
import { DSAActivity } from '@/components/sections/DSAActivity'
import { GitHubActivity } from '@/components/sections/GitHubActivity'
import { Footer } from '@/components/layout/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="overflow-hidden">
        <Hero />
        <About />
        <DataBank />
        <Projects />
        <Experience />
        <Education />
        <DSAActivity />
        <GitHubActivity />
      </main>
      <Footer />
    </>
  )
}
