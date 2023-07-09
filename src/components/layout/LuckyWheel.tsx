import { useEffect, useState } from 'react'
import { Wheel } from 'react-custom-roulette'
import { Button, Box, AbsoluteCenter, Center } from '@chakra-ui/react'

const data = [
  { option: '1 AA' },
  { option: '10 AA' },
  { option: '200 AA', style: { textColor: '#e20000' } },
  { option: '2 AA' },
  { option: '50 AA' },
  { option: '1 AA' },
  { option: '500 AA', style: { textColor: '#e20000' } },
  { option: '0 AA' },
]

const backgroundColors = ['#1dc0cc', '#8e15f8', '#1dc0cc', '#8e15f8']
const textColors = ['#0b3351']
const outerBorderColor = 'black'
const outerBorderWidth = 1
const innerBorderColor = 'black'
const innerBorderWidth = 2
const innerRadius = 2
const radiusLineColor = 'black'
const radiusLineWidth = 2
const fontFamily = 'Nunito'
const fontWeight = 'bold'
const fontSize = 20
const fontStyle = 'normal'
const textDistance = 60
const spinDuration = 1.0

export default function LuckyWheel() {
  const [mustSpin, setMustSpin] = useState(false)
  const [prizeNumber, setPrizeNumber] = useState(0)
  const [loading, setLoading] = useState(false)

  const handleSpinClick = () => {
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * data.length)
      setPrizeNumber(newPrizeNumber)
      setMustSpin(true)
    }
  }

  return (
    <Box mt="30">
      <Center>
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={data}
          backgroundColors={backgroundColors}
          textColors={textColors}
          fontFamily={fontFamily}
          fontSize={fontSize}
          fontWeight={fontWeight}
          fontStyle={fontStyle}
          outerBorderColor={outerBorderColor}
          outerBorderWidth={outerBorderWidth}
          innerRadius={innerRadius}
          innerBorderColor={innerBorderColor}
          innerBorderWidth={innerBorderWidth}
          radiusLineColor={radiusLineColor}
          radiusLineWidth={radiusLineWidth}
          spinDuration={spinDuration}
          startingOptionIndex={2}
          textDistance={textDistance}
          onStopSpinning={() => {
            setMustSpin(false)
          }}
        />
        <br />
      </Center>
      <Center>
        {!loading ? (
          <Button mt={30} colorScheme="blue" variant="outline" type="submit" onClick={handleSpinClick}>
            Spin
          </Button>
        ) : (
          <Button isLoading loadingText="Spinning..." mt={4} colorScheme="blue" variant="outline" type="submit" onClick={handleSpinClick}>
            Spin
          </Button>
        )}
      </Center>
    </Box>
  )
}
