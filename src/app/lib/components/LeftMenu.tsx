import { Box, IconButton } from '@chakra-ui/react'
import { HamburgerIcon, Icon } from '@chakra-ui/icons'
import React, { useState } from 'react'

const LeftMenu = () => {
  const [isOpen, setOpen] = useState(false)

  const toggleOpen = () => {
    setOpen(!isOpen)
  }

  return (
    <>
      <Box
        backgroundColor={'#ffffff'}
        width={'300px'}
        p={"24px"}
        height={'100vh'}
        opacity={isOpen ? 1 : 0}
        position={'fixed'}
        zIndex={10000}
        visibility={isOpen ? 'visible' : 'hidden'}
        left={isOpen ? 0 : '-300px'}
        top={0}
        transition={'0.4s'}
      ></Box>
      <Box
        top={0}
        left={0}
        backgroundColor={'#000000'}
        opacity={isOpen ? 0.5 : 0}
        width={'100vw'}
        height={'100vh'}
        onClick={() => toggleOpen()}
        position={'fixed'}
        visibility={isOpen ? 'visible' : 'hidden'}
        zIndex={9999}
        transition={'0.4s'}
      ></Box>

      {/*メニューのボタン*/}
      <IconButton
        my={'auto'}
        mx={'10px'}
        backgroundColor={'rgba(0,0,0,0)'}
        aria-label="メニュー"
        icon={<Icon as={HamburgerIcon} boxSize={6} />}
        onClick={toggleOpen}
      />
    </>
  )
}

export { LeftMenu }
