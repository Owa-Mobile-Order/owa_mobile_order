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
import React from 'react'
import { BsCart } from 'react-icons/bs'

const Header = () => {
  return (
    <Box height={'64px'} px={'40px'} display={'flex'}>
      {/* メニューのボタン */}
      <IconButton
        my={'auto'}
        mx={'10px'}
        backgroundColor={'rgba(0,0,0,0)'}
        aria-label="メニュー"
        icon={<Icon as={HamburgerIcon} boxSize={6} />}
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
      />
    </Box>
  )
}

export { Header }
