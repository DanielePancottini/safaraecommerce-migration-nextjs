import { Layout } from '@components/common'
import AboutSlider from '@components/common/About/AboutSlider'

export default function About() {
  return (
    <>
      <div style={{backgroundColor: "rgba(240, 226, 123, 0.9)"}} className={"mx-8 sm:mx-auto py-20 flex flex-col items-center justify-center fit"}>
        <AboutSlider></AboutSlider>
      </div>
    </>
  )
}

About.Layout = Layout
