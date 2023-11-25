import Background from "@/components/Background/Background";
import BackgroundCanvas from "@/components/BackgroundCanvas/BackgroundCanvas";
import s from './page.module.scss';
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">

      <div className="relative flex min-h-screen flex-col justify-center overflow-hidden py-6 pl-14 pr-14">
        <article className="prose text-left text-white">
          <h1 className={`
            ${s.title}
            text-7xl 
            md:text-9xl 
            lg:text-9xl 
            mb-10 
            text-gray-100 
            text-outline--white 
            font-playfairDisplay 
            text-shadow-sm
          `}>
            Corey Dunkin
          </h1>
          <h2 className="text-gray-100 font-thin mt-0 text-1xl text-shadow-md">Senior Software Engineer in Sydney, Australia</h2>
        </article>
      </div>



      {/*<Background />*/}
      <BackgroundCanvas />
    </main>
  )
}
