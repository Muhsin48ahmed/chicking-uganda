import { FlavourSection } from '../components/home/FlavourSection'
import { HeroSection } from '../components/home/HeroSection'
import { BucketsSection, CateringBand, FavouritesSection, Marquee, VisitSection, WhySection } from '../components/home/HomeSections'
import { usePageMeta } from '../components/ui'
import { VideoReel } from '../components/VideoReel'
import { PROMO_VIDEOS } from '../data/videos'

const HOME_VIDEOS = PROMO_VIDEOS.filter((video) => !video.tags.includes('brand'))

export function HomePage() {
  usePageMeta('100% Halal Fried Chicken in Kampala')
  return (
    <>
      <HeroSection />
      <Marquee />
      <FlavourSection />
      <FavouritesSection />
      <BucketsSection />
      <VideoReel videos={HOME_VIDEOS} eyebrow="As seen on TikTok" title={<>Hungry yet? <span className="text-gold">Press play</span></>} />
      <WhySection />
      <VisitSection />
      <CateringBand />
    </>
  )
}
