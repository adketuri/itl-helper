import { Box, Slider, SliderMark, SliderTrack, SliderFilledTrack, SliderThumb, Text } from "@chakra-ui/react"
import { FC } from "react"


const sliderValues = Array(8).fill(undefined).map((_, i) => i + 7);

export interface MeterSliderProps {
  minMeter: number,
  setMinMeter: (arg: number) => void
}

console.log("!AK slider vals", sliderValues)

export const MeterSlider: FC<MeterSliderProps> = ({ minMeter, setMinMeter }) => {

  return (<Box pt={6} pb={2}>
    <Text>Minimum Difficulty</Text>
    <Slider aria-label='Minimum Difficulty' value={minMeter} onChange={setMinMeter} min={sliderValues[0]} max={sliderValues[sliderValues.length - 1]}>
      {sliderValues.map(val => <SliderMark key={val} value={val} mt={2} >{val}</SliderMark>)}
      <SliderTrack >
        <SliderFilledTrack />
      </SliderTrack>
      <SliderThumb />
    </Slider>
  </Box>)
}