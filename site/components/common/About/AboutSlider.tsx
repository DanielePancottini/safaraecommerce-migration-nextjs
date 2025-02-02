import React from 'react'
import {
  Box,
  IconButton,
  useBreakpointValue,
  Stack,
  Heading,
  Text,
  Container,
} from '@chakra-ui/react'
import style from "./AboutSlider.module.css"
// Here we have used react-icons package for the icons
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi'
// And react-slick as our Carousel Lib
import Slider from 'react-slick'

import aboutJson from '../../../static_data/about.json'
import { useRouter } from 'next/router'

// Settings for the slider
const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 15000,
  slidesToShow: 1,
  slidesToScroll: 1,
}

export default function AboutSlider() {
  // As we have used custom buttons, we need a reference variable to
  // change the state
  const [slider, setSlider] = React.useState<Slider | null>(null)

  // These are the breakpoints which changes the position of the
  // buttons as the screen size changes
  const top = useBreakpointValue({ base: '90%', md: '50%' })
  const side = useBreakpointValue({ base: '30%', md: '40px' })

  const { locale } = useRouter()

  const cards = aboutJson[locale as keyof typeof aboutJson]

  return (
      <Box
        position={'relative'}
        height={'600px'}
        width={'full'}
        overflow={'auto'}
      >
        {/* CSS files for react-slick */}
        <link
          rel="stylesheet"
          type="text/css"
          charSet="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
        {/* Left Icon */}
        <IconButton
          aria-label="left-arrow"
          variant="ghost"
          position="absolute"
          left={side}
          top={top}
          transform={'translate(0%, -50%)'}
          zIndex={2}
          onClick={() => slider?.slickPrev()}
        >
          <BiLeftArrowAlt size="40px" />
        </IconButton>
        {/* Right Icon */}
        <IconButton
          aria-label="right-arrow"
          variant="ghost"
          position="absolute"
          right={side}
          top={top}
          transform={'translate(0%, -50%)'}
          zIndex={2}
          onClick={() => slider?.slickNext()}
        >
          <BiRightArrowAlt size="40px" />
        </IconButton>
        {/* Slider */}
        <Slider {...settings} ref={(slider: any) => setSlider(slider)}>
          {cards.map((card, index) => (
            <Box
              key={index}
              height={'-webkit-fit-content'}
              position="relative"
              backgroundPosition="center"
              backgroundRepeat="no-repeat"
              backgroundSize="cover"
            >
              {/* This is the block you need to change, to customize the caption */}
              <Container
                maxWidth={'100em'}
                height="-webkit-fit-content"
                position="relative"
              >
                <Stack spacing={6} w={'full'} maxW={'-webkit-max-content'}>
                  <Heading color={card.titleColor} className={style.aboutSliderHeading} fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
                    {card.title}
                  </Heading>
                  <Text
                    as={"span"}
                    fontSize={{ base: 'xl', lg: '2xl' }}
                    color="gray.800"
                    className={style.aboutSliderText}
                  >
                    {card.text.split('<br/>').map((str, index) => (
                      <p key={index}>{str}</p>
                    ))}
                  </Text>
                </Stack>
              </Container>
            </Box>
          ))}
        </Slider>
      </Box>
  )
}
