'use client'
import { Box, Heading, Spacer } from '@chakra-ui/react'
import { LeftMenu } from '@/app/lib/components/LeftMenu'
import { RightMenu } from './RightMenu'
import { useSession } from 'next-auth/react'
import { Login } from './auth/Login'
import { Logout } from './auth/Logout'

const Header = () => {
  const { data: session, status } = useSession();
  return (
    <Box height={'64px'} px={'20px'} display={'flex'}>
      <LeftMenu />
      {/*ヘッダーの文字*/}
      <Heading my={'auto'} fontSize={'2xl'}>
        Owa Mobile Order
      </Heading>
      <Spacer />
      <RightMenu />
      <Box my={'auto'} mx={'10px'}>
      {status !== 'authenticated' ? <Login /> : <Logout />}
      </Box>
    </Box>
  )
}

export { Header }
