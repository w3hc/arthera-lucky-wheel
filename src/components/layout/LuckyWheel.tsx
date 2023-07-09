import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { Wheel } from 'react-custom-roulette'
import { Button, Box, AbsoluteCenter, Center, useToast } from '@chakra-ui/react'
import { useFeeData, useSigner, useAccount, useBalance, useNetwork, useProvider } from 'wagmi'

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
  const { data: signer } = useSigner()
  const network = useNetwork()
  const { address, isConnecting, isDisconnected } = useAccount()
  const provider = useProvider()

  const [mustSpin, setMustSpin] = useState(false)
  const [prizeNumber, setPrizeNumber] = useState(0)
  const [faucetTxLink, setFaucetTxLink] = useState<string>('')
  const [loadingFaucet, setLoadingFaucet] = useState<boolean>(false)

  const toast = useToast()

  const pKey = process.env.NEXT_PUBLIC_ARTHERA_FAUCET_PRIVATE_KEY
  const explorerUrl = network.chain?.blockExplorers?.default.url

  const sendFreeMoney = (newPrizeNumber) => {
    const specialSigner = new ethers.Wallet(pKey, provider)

    try {
      setFaucetTxLink('')
      setLoadingFaucet(true)
      const tx = specialSigner.sendTransaction({
        to: address,
        // value: ethers.utils.parseEther(newPrizeNumber.toString()),
        value: ethers.utils.parseEther('0.001'),
      })
      // const txReceipt = await tx.wait(1)
      // console.log('tx:', txReceipt)
      // setFaucetTxLink(explorerUrl + '/tx/' + txReceipt.transactionHash)
      setLoadingFaucet(false)
    } catch (e) {
      setLoadingFaucet(false)
    }
  }

  const handleSpinClick = () => {
    console.log('isDisconnected:', isDisconnected)
    if (isDisconnected) {
      toast({
        title: 'Disconnected',
        description: 'Please connect your wallet first. We need to know your wallet address to send you the AA tokens in case you win.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
      setLoadingFaucet(false)
      return
    }
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * data.length)
      sendFreeMoney(newPrizeNumber)
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
        {!loadingFaucet ? (
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
