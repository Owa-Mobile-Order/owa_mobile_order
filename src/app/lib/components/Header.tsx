'use client'
import { Icon } from '@chakra-ui/icons'
import { Box, Heading, IconButton, Spacer } from '@chakra-ui/react'
import { BsCart } from 'react-icons/bs'
import { LeftMenu } from '@/app/lib/components/LeftMenu'

const Header = () => {
  return (
    <Box height={'64px'} px={'20px'} display={'flex'}>
      <LeftMenu />
      {/*ヘッダーの文字*/}
      <Heading my={'auto'} fontSize={'2xl'}>
        Owa Mobile Order
      </Heading>
      <Spacer />
      {/*カートボタン*/}
      <IconButton
        aria-label={'カート'}
        my={'auto'}
        backgroundColor={'rgba(0,0,0,0)'}
        icon={<Icon as={BsCart} boxSize={6} />}
      />
    </Box>
  )
}

export { Header }
