import Header from '@/components/Header'
import Hero from '@/components/Hero'
import PopularMangas from '@/components/sections/PopularMangas'
import LatestUpdates from '@/components/sections/LatestUpdates'
import NewReleases from '@/components/sections/NewReleases'
import PersonalizedRecommendations from '@/components/sections/Recommendations'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow">
        <Hero />
        <div className="container mx-auto px-4 space-y-12 py-8 pb-36">
          <PopularMangas />
          <LatestUpdates />
          <NewReleases />
          <PersonalizedRecommendations />
        </div>
      </main>
      <Footer />
    </div>
  )
}