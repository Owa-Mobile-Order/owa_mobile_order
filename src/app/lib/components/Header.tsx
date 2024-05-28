'use client'
import { HamburgerIcon, Icon, SearchIcon } from '@chakra-ui/icons'
import {
  Box,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { BsCart } from 'react-icons/bs'

const Header = () => {
  const [menuState, setMenuState] = useState(false)
  const [cartMenuState, setCartMenuState] = useState(false)

  const toggleMenu = () => {
    setMenuState(!menuState)
  }

  const toggleCartMenu = () => {
    setCartMenuState(!cartMenuState)
  }

  return (
    <Box height={'64px'} px={'40px'} display={'flex'}>
      <Box>
        <Box
          backgroundColor={'#ffffff'}
          width={'252px'}
          height={'100vh'}
          position={'fixed'}
          display={menuState ? 'flex' : 'none'}
          zIndex={10000}
          left={0}
          top={0}
        ></Box>
        <Box
          top={0}
          left={0}
          backgroundColor={'rgba(0,0,0,0.4)'}
          width={'100vw'}
          height={'100vh'}
          onClick={() => toggleMenu()}
          position={'fixed'}
          zIndex={9999}
          display={menuState ? 'flex' : 'none'}
        ></Box>
      </Box>
      {/*メニューのボタン*/}
      <IconButton
        my={'auto'}
        mx={'10px'}
        backgroundColor={'rgba(0,0,0,0)'}
        aria-label="メニュー"
        icon={<Icon as={HamburgerIcon} boxSize={6} />}
        onClick={toggleMenu}
      />

      {/*ヘッダーの文字*/}
      <Heading my={'auto'} fontSize={'2xl'}>
        Owa Mobile Order
      </Heading>

      {/*検索ボックス*/}
      <InputGroup width={'500px'} ml={'60px'} mr={'auto'} my={'auto'}>
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.300" />
        </InputLeftElement>
        <Input placeholder="ラーメン" />
      </InputGroup>

      {/*カートボタン*/}
      <IconButton
        aria-label={'カート'}
        my={'auto'}
        backgroundColor={'rgba(0,0,0,0)'}
        icon={<Icon as={BsCart} boxSize={6} />}
        onClick={toggleCartMenu}
      />
    </Box>
  )
}

export { Header }
